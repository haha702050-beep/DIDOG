import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import ClickSpark from './components/ClickSpark';
import LaserFlow from './components/LaserFlow';
import Magnet from './components/Magnet';
import SplitText from './components/SplitText';

import heroVideo from '../assets/ai-dog-character/video/ai-dog-poster-motion.mp4';
import posterHero from '../assets/ai-dog-character/posters/ai-dog-poster-01-character-hero.png';
import posterNeon from '../assets/ai-dog-character/posters/ai-dog-poster-02-neon-launch.png';
import posterStory from '../assets/ai-dog-character/posters/ai-dog-poster-03-warm-story.png';
import posterStudio from '../assets/ai-dog-character/posters/ai-dog-poster-04-studio-product.png';
import profileCard from '../assets/ai-dog-character/cards/lan-dou-ai-dog-profile-card.png';

const navItems = [
  { label: '角色介绍', href: '#profile' },
  { label: '作品案例', href: '#works' },
  { label: '互动体验', href: '#experience' },
  { label: '联系方式', href: '#contact' },
];

const works = [
  {
    title: 'AI Mascot Motion Poster',
    type: 'Video',
    meta: '角色动效 / 竖版视频',
    src: heroVideo,
  },
  {
    title: 'Character Launch Key Visual',
    type: 'Poster',
    meta: 'IP 主视觉 / 未来陪伴',
    src: posterNeon,
  },
  {
    title: 'Warm Story Campaign',
    type: 'Poster',
    meta: '情绪叙事 / 温暖梦幻',
    src: posterStory,
  },
  {
    title: 'Studio Product Poster',
    type: 'Poster',
    meta: '商业海报 / 玻璃科技',
    src: posterStudio,
  },
];

const roleCards = [
  {
    title: '蓝豆 AI 机器狗',
    subtitle: 'LanDou AI Dog',
    tag: 'Mascot',
    tone: 'orange',
    src: posterHero,
  },
  {
    title: '未来陪伴角色',
    subtitle: 'Warm Tech Companion',
    tag: 'Character',
    tone: 'gold',
    src: posterStudio,
  },
  {
    title: '角色设定名片',
    subtitle: 'Name · Age · Personality',
    tag: 'Profile',
    tone: 'blue',
    src: profileCard,
  },
];

function App() {
  const [mood, setMood] = useState('dream');
  const [activeRole, setActiveRole] = useState(0);

  const moodCopy = useMemo(
    () => ({
      dream: {
        title: 'Dream Mode',
        text: '柔和光感、慢速节奏、适合角色世界观与情绪海报。',
      },
      sharp: {
        title: 'Sharp Mode',
        text: '更清晰的层级、更强的对比，适合发布会视觉与作品集提案。',
      },
      warm: {
        title: 'Warm Mode',
        text: '橙色与暖黄色增强亲和力，适合个人品牌和社交传播。',
      },
    }),
    []
  );

  return (
    <ClickSpark
      sparkColor="#ffd071"
      sparkSize={16}
      sparkRadius={34}
      sparkCount={8}
      duration={520}
      easing="ease-out"
      extraScale={1.15}
    >
      <main>
      <section className="hero" id="top">
        <video
          className="heroVideo"
          src={heroVideo}
          poster={posterHero}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="heroLaser" aria-hidden="true">
          <LaserFlow
            color="#ffd071"
            horizontalBeamOffset={0.16}
            verticalBeamOffset={-0.14}
            horizontalSizing={0.86}
            verticalSizing={2.6}
            flowSpeed={0.28}
            flowStrength={0.38}
            fogIntensity={0.32}
            fogScale={0.24}
            wispDensity={0.85}
            wispIntensity={3.8}
            mouseTiltStrength={0.016}
            decay={1.45}
            dpr={1.2}
          />
        </div>
        <div className="heroShade" />
        <nav className="nav" aria-label="主导航">
          <a className="brand" href="#top" aria-label="kiki's space 首页">
            kiki's space
          </a>
          <div className="navLinks">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="heroContent pageShell">
          <p className="eyebrow">AI Designer / Creative Portfolio</p>
          <SplitText
            tag="h1"
            text="kiki's space"
            splitType="chars"
            delay={55}
            duration={0.85}
            rootMargin="0px"
            className="heroTitle"
          />
          <SplitText
            tag="p"
            text="一个温暖、梦幻、克制，又带有未来感的 AI 设计师作品空间。"
            splitType="words, chars"
            delay={18}
            duration={0.72}
            from={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            to={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            rootMargin="0px"
            className="heroLead"
          />
          <div className="heroActions">
            <Magnet padding={46} magnetStrength={7} wrapperClassName="magnetWrap">
              <a className="primaryAction" href="#works">
                浏览作品
              </a>
            </Magnet>
            <Magnet padding={46} magnetStrength={7} wrapperClassName="magnetWrap">
              <a className="ghostAction" href="#experience">
                进入互动体验
              </a>
            </Magnet>
          </div>
        </div>
      </section>

      <section className="section profileSection" id="profile">
        <div className="pageShell roleShowcase">
          <div className="roleTopbar">
            <div className="roleBrand">
              <strong>KIKI</strong>
              <span>AI Designer</span>
            </div>
            <div className="roleTitle">
              <p className="eyebrow">Role Introduction</p>
              <SplitText
                tag="h2"
                text="角色介绍"
                splitType="chars"
                delay={70}
                duration={0.8}
                from={{ opacity: 0, y: 34, rotateX: -42 }}
                to={{ opacity: 1, y: 0, rotateX: 0 }}
              />
            </div>
            <div className="roleMenu" aria-hidden="true">
              <span>Menu</span>
              <i />
            </div>
          </div>

          <div className="roleStage" aria-label="角色介绍卡片">
            {roleCards.map((card, index) => (
              <article
                className={`roleCard role-${card.tone} ${activeRole === index ? 'isActive' : ''}`}
                key={card.title}
              >
                <div className="roleImageWrap">
                  <img src={card.src} alt={card.title} />
                </div>
                <div className="roleInfo">
                  <p>{card.tag}</p>
                  <h3>{card.title}</h3>
                  <span>{card.subtitle}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="roleFooter">
            <div className="roleSocials">
              <span>AI Visual</span>
              <span>Poster</span>
              <span>Motion</span>
            </div>
            <div className="roleControls">
              <Magnet padding={34} magnetStrength={6} wrapperClassName="magnetWrap">
                <button
                  type="button"
                  onClick={() =>
                    setActiveRole((current) => (current + roleCards.length - 1) % roleCards.length)
                  }
                >
                  ‹ Prev
                </button>
              </Magnet>
              <Magnet padding={34} magnetStrength={6} wrapperClassName="magnetWrap">
                <button
                  type="button"
                  onClick={() => setActiveRole((current) => (current + 1) % roleCards.length)}
                >
                  Next ›
                </button>
              </Magnet>
            </div>
          </div>

          <div className="roleDescription">
            <p>
              kiki 以 AI 视觉生成、角色 IP、动态海报与数字内容设计为创作方向，
              将商业表达、情绪叙事和轻科技质感融合在同一个视觉系统中。
            </p>
            <p>
              蓝豆 AI 机器狗是当前作品集的角色样本：聪明、乐观、好奇、守护型，
              适合延展为海报、视频、互动体验和品牌社交内容。
            </p>
          </div>
        </div>
      </section>

      <section className="section worksSection" id="works">
        <div className="pageShell">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">Selected Works</p>
              <SplitText tag="h2" text="作品 / 案例" splitType="chars" delay={52} />
            </div>
            <p>
              当前版本先放入已生成的 AI 角色视频与海报，作为作品集基础框架和视觉占位。
            </p>
          </div>
          <div className="workGrid">
            {works.map((work, index) => (
              <article className="workItem" key={work.title}>
                <div className="workMedia">
                  {work.type === 'Video' ? (
                    <video src={work.src} muted loop autoPlay playsInline />
                  ) : (
                    <img src={work.src} alt={work.title} />
                  )}
                </div>
                <div className="workMeta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p>{work.type}</p>
                    <h3>{work.title}</h3>
                    <small>{work.meta}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section experienceSection" id="experience">
        <div className="sectionLaser" aria-hidden="true">
          <LaserFlow
            color="#ff9f3f"
            horizontalBeamOffset={0}
            verticalBeamOffset={-0.08}
            horizontalSizing={0.62}
            verticalSizing={2.2}
            flowSpeed={0.22}
            flowStrength={0.3}
            fogIntensity={0.24}
            fogScale={0.32}
            wispDensity={0.6}
            wispIntensity={2.8}
            mouseTiltStrength={0.01}
            decay={1.25}
            dpr={1}
          />
        </div>
        <div className="pageShell experienceGrid">
          <div className="sectionIntro">
            <p className="eyebrow">Interactive Experience</p>
            <SplitText
              tag="h2"
              text="选择一个作品情绪模式"
              splitType="chars"
              delay={36}
            />
            <p>
              基础版先提供轻量交互，用来展示未来可以扩展成 AI 角色对话、作品筛选、
              风格切换或沉浸式展厅的入口。
            </p>
          </div>
          <div className={`moodPanel glassPanel mood-${mood}`}>
            <div className="moodPreview">
              <img src={posterHero} alt="互动体验预览" />
            </div>
            <div className="moodControls" aria-label="作品情绪模式">
              {['dream', 'sharp', 'warm'].map((item) => (
                <Magnet key={item} padding={28} magnetStrength={6} wrapperClassName="magnetWrap">
                  <button
                    className={mood === item ? 'active' : ''}
                    onClick={() => setMood(item)}
                    type="button"
                  >
                    {item}
                  </button>
                </Magnet>
              ))}
            </div>
            <h3>{moodCopy[mood].title}</h3>
            <p>{moodCopy[mood].text}</p>
          </div>
        </div>
      </section>

      <section className="section contactSection" id="contact">
        <div className="pageShell contactPanel">
          <div>
            <p className="eyebrow">Contact</p>
            <SplitText tag="h2" text="联系方式" splitType="chars" delay={64} />
            <p>欢迎把新素材、项目截图、视频和文案继续发来，我会沿着这个视觉系统迭代。</p>
          </div>
          <div className="contactLinks">
            <Magnet padding={42} magnetStrength={9} wrapperClassName="magnetWrap contactMagnet">
              <a href="tel:+8613800000000">电话：+86 138 0000 0000</a>
            </Magnet>
            <Magnet padding={42} magnetStrength={9} wrapperClassName="magnetWrap contactMagnet">
              <a href="mailto:kiki@example.com">邮箱：kiki@example.com</a>
            </Magnet>
          </div>
        </div>
      </section>
      </main>
    </ClickSpark>
  );
}

createRoot(document.getElementById('root')).render(<App />);
