import AppKit
import AVFoundation
import Foundation

let args = CommandLine.arguments
guard args.count >= 5 else {
    fputs("Usage: swift encode_image_sequence.swift <framesDir> <output.mp4> <fps> <globPrefix>\n", stderr)
    exit(2)
}

let framesDir = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])
let fps = Int32(args[3]) ?? 24
let prefix = args[4]

let fileManager = FileManager.default
let frameURLs = (try fileManager.contentsOfDirectory(at: framesDir, includingPropertiesForKeys: nil))
    .filter { $0.lastPathComponent.hasPrefix(prefix) && $0.pathExtension.lowercased() == "png" }
    .sorted { $0.lastPathComponent < $1.lastPathComponent }

guard let firstURL = frameURLs.first,
      let firstImage = NSImage(contentsOf: firstURL),
      let firstCG = firstImage.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    fputs("No readable PNG frames found.\n", stderr)
    exit(3)
}

try? fileManager.removeItem(at: outputURL)

let width = firstCG.width
let height = firstCG.height
let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
let settings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: width,
    AVVideoHeightKey: height,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 8_000_000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel
    ]
]

let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false

let attrs: [String: Any] = [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
    kCVPixelBufferWidthKey as String: width,
    kCVPixelBufferHeightKey as String: height
]
let adaptor = AVAssetWriterInputPixelBufferAdaptor(
    assetWriterInput: input,
    sourcePixelBufferAttributes: attrs
)

guard writer.canAdd(input) else {
    fputs("Cannot add video input.\n", stderr)
    exit(4)
}
writer.add(input)

func makePixelBuffer(from cgImage: CGImage, width: Int, height: Int) -> CVPixelBuffer? {
    var pixelBuffer: CVPixelBuffer?
    let status = CVPixelBufferCreate(kCFAllocatorDefault, width, height, kCVPixelFormatType_32ARGB, nil, &pixelBuffer)
    guard status == kCVReturnSuccess, let buffer = pixelBuffer else { return nil }

    CVPixelBufferLockBaseAddress(buffer, [])
    defer { CVPixelBufferUnlockBaseAddress(buffer, []) }

    guard let context = CGContext(
        data: CVPixelBufferGetBaseAddress(buffer),
        width: width,
        height: height,
        bitsPerComponent: 8,
        bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
        space: CGColorSpaceCreateDeviceRGB(),
        bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue
    ) else {
        return nil
    }

    context.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))
    return buffer
}

writer.startWriting()
writer.startSession(atSourceTime: .zero)

let frameDuration = CMTime(value: 1, timescale: fps)
let queue = DispatchQueue(label: "image-sequence-encoder")
var frameIndex: Int64 = 0
var failed = false

input.requestMediaDataWhenReady(on: queue) {
    while input.isReadyForMoreMediaData && frameIndex < Int64(frameURLs.count) {
        let url = frameURLs[Int(frameIndex)]
        guard let image = NSImage(contentsOf: url),
              let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil),
              let buffer = makePixelBuffer(from: cgImage, width: width, height: height) else {
            fputs("Could not read frame: \(url.path)\n", stderr)
            failed = true
            input.markAsFinished()
            writer.cancelWriting()
            exit(5)
        }

        let time = CMTimeMultiply(frameDuration, multiplier: Int32(frameIndex))
        if !adaptor.append(buffer, withPresentationTime: time) {
            fputs("Could not append frame \(frameIndex).\n", stderr)
            failed = true
            input.markAsFinished()
            writer.cancelWriting()
            exit(6)
        }
        frameIndex += 1
    }

    if frameIndex >= Int64(frameURLs.count) && !failed {
        input.markAsFinished()
        writer.finishWriting {
            if writer.status == .completed {
                print(outputURL.path)
                exit(0)
            } else {
                fputs("Writer failed: \(writer.error?.localizedDescription ?? "unknown error")\n", stderr)
                exit(7)
            }
        }
    }
}

RunLoop.main.run()
