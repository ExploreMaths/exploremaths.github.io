/**
 * ============================================================
 * EXPLORE MATHS — PREMIUM DEVELOPER PORTFOLIO
 * Single-page application with extensive animations
 * ============================================================
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import './index.css';

/* ============================================================
   TYPE DEFINITIONS
   ============================================================ */
interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  icon: string;
  color: string;
}

interface BlogPost {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

/* ============================================================
   CONSTANTS / DATA
   ============================================================ */
const PROJECTS: Project[] = [
  {
    name: 'CodeVideoRenderer',
    description:
      'A Python library for generating stunning code demonstration videos programmatically. Render syntax-highlighted code with smooth animations, perfect for tutorials and tech presentations.',
    tech: ['Python', 'FFmpeg', 'PIL', 'Cairo'],
    github: 'https://github.com/ExploreMaths/CodeVideoRenderer',
    icon: '🎬',
    color: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    name: 'WordlePro',
    description:
      "The best Wordle game with hints — a polished, feature-rich Wordle clone with intelligent hint systems, statistics tracking, and a sleek UI. Sharpen your vocabulary every day!",
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/WordlePro/wordlepro.github.io',
    demo: 'https://wordlepro.github.io',
    icon: '🔤',
    color: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  },
];

const BLOG_POSTS: BlogPost[] = [
  {
    tag: 'Python',
    title: 'Building CLI Tools with Python: argparse Deep Dive',
    excerpt:
      'Exploring the power of argparse to create robust, user-friendly command-line interfaces that handle complex argument parsing gracefully.',
    date: 'Dec 2024',
    readTime: '8 min read',
  },
  {
    tag: 'Frontend',
    title: 'CSS Animations vs JavaScript Animations: When to Use Which',
    excerpt:
      'A thorough comparison of CSS transitions/animations and JS-driven animation techniques, with performance benchmarks and practical use cases.',
    date: 'Nov 2024',
    readTime: '11 min read',
  },
  {
    tag: 'Dev Diary',
    title: 'The Joy of Debugging: How I Fixed a 6-Hour Bug in 10 Minutes',
    excerpt:
      'A relatable story about a maddening bug, the debugging process, and the euphoric "aha!" moment that made it all worth it.',
    date: 'Oct 2024',
    readTime: '6 min read',
  },
  {
    tag: 'Learning',
    title: 'From Scratch to Python: My 8-Year Programming Journey',
    excerpt:
      'Reflecting on years of self-taught programming — from dragging blocks in Scratch, fighting with pointers in C++, to falling in love with Python.',
    date: 'Sep 2024',
    readTime: '14 min read',
  },
  {
    tag: 'Game Dev',
    title: 'Building a Wordle Clone: Lessons Learned',
    excerpt:
      'How I designed and shipped WordlePro — a full-featured Wordle clone with hints, statistics, and a polished UI built with vanilla JavaScript.',
    date: 'Aug 2024',
    readTime: '10 min read',
  },
  {
    tag: 'Tools',
    title: 'Git Workflows for Solo Developers: Keeping History Clean',
    excerpt:
      'Practical git strategies for independent developers — branching models, meaningful commits, and when to squash vs rebase.',
    date: 'Jul 2024',
    readTime: '7 min read',
  },
];

const SKILLS = [
  { name: 'Python', icon: '🐍', level: 92 },
  { name: 'HTML & CSS', icon: '🌐', level: 88 },
  { name: 'JavaScript', icon: '⚡', level: 80 },
  { name: 'C++', icon: '⚙️', level: 60 },
];

const TECH_CARDS = [
  { icon: '🐍', name: 'Python', badge: 'Main' },
  { icon: '⚡', name: 'JavaScript', badge: 'Daily' },
  { icon: '🌐', name: 'HTML5', badge: '' },
  { icon: '🎨', name: 'CSS3', badge: '' },
  { icon: '⚙️', name: 'C++', badge: '' },
  { icon: '🔧', name: 'Git', badge: '' },
  { icon: '💻', name: 'VS Code', badge: 'Fav' },
  { icon: '🐙', name: 'GitHub', badge: '' },
  { icon: '🖼️', name: 'Vite', badge: '' },
];

const TIMELINE_ITEMS = [
  {
    year: '~2016',
    title: 'First Lines of Code — Scratch',
    desc: 'Started the coding journey in kindergarten with MIT Scratch. Dragging blocks, building mini-stories, discovering the magic of making something from nothing.',
    icon: '🐱',
  },
  {
    year: '~2019',
    title: 'Leveling Up — C++',
    desc: 'Progressed to C++ through school curriculum. Fought pointers, wrestled with segfaults, and learned to appreciate the beauty of manual memory management.',
    icon: '⚙️',
  },
  {
    year: '~2020',
    title: 'Fell in Love with Python',
    desc: 'Discovered Python\'s elegance and simplicity. Wrote first practical scripts to automate daily tasks. Never looked back.',
    icon: '🐍',
  },
  {
    year: '~2022',
    title: 'Frontend Development Journey',
    desc: 'Dove deep into HTML, CSS, and JavaScript. Built interactive projects. Started regularly reviewing frontend knowledge and best practices.',
    icon: '🌐',
  },
  {
    year: 'Present',
    title: 'Independent Developer',
    desc: 'Building libraries, games, and tools. Seeking ambitious project ideas to architect large-scale systems. Continuously pushing technical boundaries.',
    icon: '🚀',
  },
];

const LANG_DATA = [
  { name: 'Python', pct: 55, color: '#3b82f6' },
  { name: 'JavaScript', pct: 22, color: '#f59e0b' },
  { name: 'HTML/CSS', pct: 15, color: '#10b981' },
  { name: 'C++', pct: 8, color: '#7c3aed' },
];

/* ============================================================
   HOOK: SCROLL REVEAL
   ============================================================ */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = document.querySelectorAll(
      '.reveal-fade-up, .reveal-clip-left, .reveal-clip-bottom, .reveal-blur, .reveal-slide-right, .reveal-slide-left, .reveal-scale, .reveal-rotate, .text-reveal-line'
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ============================================================
   HOOK: CUSTOM CURSOR
   ============================================================ */
function useCustomCursor() {
  useEffect(() => {
    const dot = document.querySelector('.cursor-dot') as HTMLElement;
    const ring = document.querySelector('.cursor-ring') as HTMLElement;
    if (!dot || !ring) return;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const moveCursor = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      // Ring lags behind dot for smooth trailing effect
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';

      raf = requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        ring.classList.add('hovering');
        dot.style.opacity = '0';
      }
    };

    const onMouseOut = () => {
      ring.classList.remove('hovering');
      dot.style.opacity = '1';
    };

    const onMouseDown = () => dot.classList.add('clicking');
    const onMouseUp = () => dot.classList.remove('clicking');

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/* ============================================================
   HOOK: TYPING EFFECT
   ============================================================ */
function useTypingEffect(words: string[], speed = 80, deleteSpeed = 45, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: number;

    if (!isDeleting && text === currentWord) {
      timeout = window.setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = window.setTimeout(
        () => {
          setText((t) =>
            isDeleting ? t.slice(0, -1) : currentWord.slice(0, t.length + 1)
          );
        },
        isDeleting ? deleteSpeed : speed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, deleteSpeed, pause]);

  return text;
}

/* ============================================================
   HOOK: NAV SCROLL EFFECT
   ============================================================ */
function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const el = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrolled, progress };
}

/* ============================================================
   HOOK: PARALLAX
   ============================================================ */
function useParallax() {
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      // Hero parallax
      const heroContent = document.querySelector('.hero-content') as HTMLElement;
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.35}px)`;
        heroContent.style.opacity = `${1 - scrollY / 700}`;
      }

      // Glow parallax
      const glow1 = document.querySelector('.hero-glow-1') as HTMLElement;
      const glow2 = document.querySelector('.hero-glow-2') as HTMLElement;
      if (glow1) glow1.style.transform = `translateY(${scrollY * 0.2}px)`;
      if (glow2) glow2.style.transform = `translateY(${-scrollY * 0.15}px)`;

      // Timeline line fill based on section progress
      const timeline = document.querySelector('.timeline') as HTMLElement;
      const timelineLine = document.querySelector('.timeline-line-fill') as HTMLElement;
      if (timeline && timelineLine) {
        const rect = timeline.getBoundingClientRect();
        const totalHeight = timeline.offsetHeight;
        const scrolledIn = Math.max(0, -rect.top + window.innerHeight * 0.5);
        const pct = Math.min(100, (scrolledIn / totalHeight) * 130);
        timelineLine.style.height = pct + '%';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

/* ============================================================
   HOOK: 3D TILT
   ============================================================ */
function useTiltEffect() {
  useEffect(() => {
    const cards = document.querySelectorAll('.tilt-card');

    const handleMouseMove = (e: Event) => {
      const card = (e.currentTarget as HTMLElement);
      const rect = card.getBoundingClientRect();
      const me = e as MouseEvent;
      const x = me.clientX - rect.left;
      const y = me.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -10;
      const rotateY = ((x - cx) / cx) * 10;

      const inner = card.querySelector('.tilt-card-inner') as HTMLElement;
      if (inner) {
        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
      }

      // Update radial gradient position for interest cards
      card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
    };

    const handleMouseLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      const inner = card.querySelector('.tilt-card-inner') as HTMLElement;
      if (inner) {
        inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      }
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
}

/* ============================================================
   HOOK: SKILL BARS
   ============================================================ */
function useSkillBars() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-bar-fill');
            fills.forEach((fill) => {
              const el = fill as HTMLElement;
              const target = el.getAttribute('data-level') || '0';
              setTimeout(() => {
                el.style.width = target + '%';
              }, 300);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector('.skills');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);
}

/* ============================================================
   HOOK: MAGNETIC EFFECT
   ============================================================ */
function useMagneticEffect() {
  useEffect(() => {
    const magnetics = document.querySelectorAll('.magnetic');

    const handleMouseMove = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const me = e as MouseEvent;
      const x = me.clientX - rect.left - rect.width / 2;
      const y = me.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.transform = 'translate(0,0)';
    };

    magnetics.forEach((el) => {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      magnetics.forEach((el) => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
}

/* ============================================================
   HOOK: COUNTER ANIMATION
   ============================================================ */
function useCounterAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach((counter) => {
              const el = counter as HTMLElement;
              const target = parseInt(el.getAttribute('data-count') || '0');
              const duration = 2000;
              const step = target / (duration / 16);
              let current = 0;

              const update = () => {
                current += step;
                if (current < target) {
                  el.textContent = Math.floor(current).toString();
                  requestAnimationFrame(update);
                } else {
                  el.textContent = target.toString();
                }
              };
              requestAnimationFrame(update);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('.about-stats, .stats-numbers');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);
}

/* ============================================================
   HOOK: CONTRIB GRAPH GENERATION
   ============================================================ */
function useContribGraph() {
  useEffect(() => {
    const container = document.querySelector('.contrib-grid');
    if (!container) return;

    const weeks = 52;
    const days = 7;

    for (let w = 0; w < weeks; w++) {
      const week = document.createElement('div');
      week.className = 'contrib-week';

      for (let d = 0; d < days; d++) {
        const day = document.createElement('div');
        const rand = Math.random();
        let cls = '';
        if (rand > 0.7) cls = 'l4';
        else if (rand > 0.55) cls = 'l3';
        else if (rand > 0.4) cls = 'l2';
        else if (rand > 0.25) cls = 'l1';

        day.className = `contrib-day ${cls}`;
        day.title = `${Math.floor(rand * 10)} contributions`;
        week.appendChild(day);
      }

      container.appendChild(week);
    }
  }, []);
}

/* ============================================================
   HOOK: FLOATING PARTICLES (CSS)
   ============================================================ */
function useFloatingParticles() {
  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const count = 18;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'floating-particle';

      const size = Math.random() * 4 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dur = Math.random() * 6 + 6;
      const delay = Math.random() * 6;
      const opacity = Math.random() * 0.4 + 0.1;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: ${Math.random() > 0.5 ? 'rgba(124,58,237,' : 'rgba(6,182,212,'}${opacity});
        animation-duration: ${dur}s;
        animation-delay: -${delay}s;
        box-shadow: 0 0 ${size * 3}px currentColor;
      `;

      hero.appendChild(p);
    }
  }, []);
}

/* ============================================================
   HOOK: SVG PATH ANIMATION
   ============================================================ */
function useSVGPaths() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const paths = entry.target.querySelectorAll('.svg-animated-path');
            paths.forEach((p) => p.classList.add('visible'));
          }
        });
      },
      { threshold: 0.2 }
    );

    const containers = document.querySelectorAll('.svg-line-container');
    containers.forEach((c) => observer.observe(c.parentElement || c));

    return () => observer.disconnect();
  }, []);
}

/* ============================================================
   HOOK: INTEREST CARDS MOUSE TRACKING
   ============================================================ */
function useInterestCards() {
  useEffect(() => {
    const cards = document.querySelectorAll('.interest-card');

    const onMove = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const me = e as MouseEvent;
      card.style.setProperty('--mx', `${((me.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty('--my', `${((me.clientY - rect.top) / rect.height) * 100}%`);
    };

    cards.forEach((c) => c.addEventListener('mousemove', onMove));
    return () => cards.forEach((c) => c.removeEventListener('mousemove', onMove));
  }, []);
}

/* ============================================================
   LOADER COMPONENT
   ============================================================ */
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="loader" id="loader">
      <div className="loader-logo">Explore Maths</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
      <div className="loader-text">Initializing portfolio...</div>
    </div>
  );
}

/* ============================================================
   NAVIGATION COMPONENT
   ============================================================ */
function Navigation({ scrolled, progress }: { scrolled: boolean; progress: number }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const navLinks = ['home', 'about', 'skills', 'projects', 'blog', 'contact'];

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a className="nav-logo magnetic" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
          Explore Maths
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                data-text={link.charAt(0).toUpperCase() + link.slice(1)}
                onClick={(e) => { e.preventDefault(); scrollTo(link); }}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className="nav-progress" style={{ width: `${progress}%` }} />

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            onClick={(e) => { e.preventDefault(); scrollTo(link); }}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        ))}
      </div>
    </>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function HeroSection() {
  const typingText = useTypingEffect([
    'Python over C++, always.',
    'Frontend craftsman.',
    'Bug hunter extraordinaire.',
    'Script wizard.',
    'Independent developer.',
  ]);

  return (
    <section id="home" className="hero">
      {/* Background elements */}
      <canvas className="hero-canvas" id="heroCanvas" />
      <div className="hero-bg-grid" />
      <div className="mesh-bg" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      {/* Corner decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />

      {/* Decorative SVG lines */}
      <svg
        className="svg-line-container"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          className="svg-animated-path visible"
          d="M0,400 Q300,200 600,400 T1200,400"
          fill="none"
          stroke="rgba(124,58,237,0.3)"
          strokeWidth="1"
        />
        <path
          className="svg-animated-path visible"
          d="M0,300 Q400,500 800,300 T1200,500"
          fill="none"
          stroke="rgba(6,182,212,0.2)"
          strokeWidth="1"
        />
      </svg>

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span>✦ Welcome to my portfolio ✦</span>
        </div>

        <h1 className="hero-name glitch" data-text="Explore Maths">
          Explore Maths
        </h1>
        <div className="hero-name-underline" />

        <p className="hero-title">
          <span className="accent">Student</span>
          {' '}&nbsp;·&nbsp;{' '}
          <span className="accent">Independent Developer</span>
        </p>

        <p className="hero-tagline">
          A developer who prefers{' '}
          <span className="hero-typing">{typingText}</span>
          <span className="hero-cursor" />
        </p>

        <div className="hero-cta">
          <a
            href="#projects"
            className="btn-primary magnetic"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>⚡</span> View Projects
          </a>
          <a
            href="#contact"
            className="btn-outline magnetic"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>✉</span> Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-mouse" />
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT SECTION
   ============================================================ */
function AboutSection() {
  return (
    <section id="about" className="about">
      {/* Background SVG decoration */}
      <svg className="svg-line-container" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <circle cx="900" cy="300" r="200" fill="none" stroke="rgba(124,58,237,0.08)" strokeWidth="80" />
        <circle cx="100" cy="100" r="120" fill="none" stroke="rgba(6,182,212,0.06)" strokeWidth="60" />
      </svg>

      <div className="container">
        <div className="about-grid">
          {/* Visual side */}
          <div className="about-visual reveal-fade-up">
            <div className="about-avatar-frame">
              <div className="about-avatar-bg" />
              <div className="about-orbit">
                <div className="about-orbit-dot" />
              </div>
              <div className="about-orbit-2">
                <div className="about-orbit-2-dot" />
              </div>
              <div className="about-avatar-inner">
                <span style={{ fontSize: '6rem', filter: 'drop-shadow(0 0 20px rgba(124,58,237,0.5))' }}>
                  🧮
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="about-stats">
              {[
                { num: 8, label: 'Years Coding', suffix: '+' },
                { num: 2, label: 'Open Source Projects', suffix: '' },
                { num: 5, label: 'Languages Known', suffix: '' },
                { num: 100, label: 'Bugs Squashed', suffix: '+' },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`stat-card reveal-scale delay-${(i + 1) * 100}`}
                >
                  <span className="stat-number" data-count={s.num}>
                    0{s.suffix}
                  </span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Text side */}
          <div className="about-text">
            <div className="section-label reveal-fade-up">About Me</div>
            <div className="text-reveal-wrapper">
              <h2 className="section-title text-reveal-line reveal-fade-up">
                Building Things<br />
                <span className="text-gradient">I Love Using</span>
              </h2>
            </div>

            <p className="reveal-fade-up delay-200">
              I am an <span className="highlight">independent developer</span> with{' '}
              <span className="highlight">8 years of programming experience</span>. I love using Python to
              write practical scripts that solve small daily problems. I also specialize in{' '}
              <span className="highlight">frontend development</span> and often build fun mini-games to
              enjoy the joy of coding.
            </p>

            <p className="reveal-fade-up delay-300">
              I have long-term experience in <span className="highlight">self-learning and independent
              development</span>. I aim to architect complete large-scale projects and am currently seeking
              creative inspiration to continuously break technical boundaries, explore, and grow steadily.
            </p>

            <div className="about-tags reveal-fade-up delay-400">
              {['Python Lover 🐍', 'Script Wizard ✨', 'Frontend Dev 🌐', 'Game Builder 🎮', 'Bug Hunter 🐛', 'Self-taught 📚'].map(
                (tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TIMELINE / LEARNING SECTION
   ============================================================ */
function TimelineSection() {
  return (
    <section id="learning" className="timeline">
      <div className="timeline-line">
        <div className="timeline-line-fill" />
      </div>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div className="section-label reveal-fade-up" style={{ justifyContent: 'center' }}>
            Learning Journey
          </div>
          <h2 className="section-title reveal-fade-up" style={{ textAlign: 'center' }}>
            From Scratch to <span className="text-gradient">Mastery</span>
          </h2>
          <p className="section-subtitle reveal-fade-up" style={{ margin: '0 auto', textAlign: 'center' }}>
            Eight years of exploration, failures, and breakthroughs — one commit at a time.
          </p>
        </div>

        <div className="timeline-items">
          {TIMELINE_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`timeline-item ${
                i % 2 === 0 ? 'reveal-slide-left' : 'reveal-slide-right'
              } delay-${(i % 4) * 100}`}
            >
              <div className={i % 2 === 0 ? 'timeline-content tilt-card' : 'timeline-empty'}>
                {i % 2 === 0 && (
                  <div className="tilt-card-inner">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-title">
                      <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                      {item.title}
                    </div>
                    <div className="timeline-desc">{item.desc}</div>
                  </div>
                )}
              </div>

              <div className="timeline-dot">
                <div className="timeline-dot-inner" />
              </div>

              <div className={i % 2 !== 0 ? 'timeline-content tilt-card' : 'timeline-empty'}>
                {i % 2 !== 0 && (
                  <div className="tilt-card-inner">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-title">
                      <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                      {item.title}
                    </div>
                    <div className="timeline-desc">{item.desc}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INTERESTS & PERSONALITY SECTIONS
   ============================================================ */
function InterestsSection() {
  const interests = [
    {
      icon: '🐍',
      title: 'Python Advocacy',
      desc: 'I prefer Python for its unmatched simplicity and elegance. It lets me focus on solving problems, not fighting syntax.',
      num: '01',
    },
    {
      icon: '🏗️',
      title: 'Large-Scale Architecture',
      desc: 'I want to build ambitious large-scale projects — complete systems with real-world impact. Still searching for the perfect idea.',
      num: '02',
    },
    {
      icon: '🎮',
      title: 'Game Development',
      desc: 'Building mini-games for the pure joy of coding. Every mechanic is a puzzle; every bug is a riddle to solve.',
      num: '03',
    },
    {
      icon: '⚡',
      title: 'Script Automation',
      desc: 'Writing small, elegant Python scripts to solve daily annoyances. Automation is my superpower.',
      num: '04',
    },
    {
      icon: '🌐',
      title: 'Frontend Craftsmanship',
      desc: 'Regularly reviewing modern frontend techniques. I believe great UI is invisible — it just feels right.',
      num: '05',
    },
    {
      icon: '🔬',
      title: 'Technical Exploration',
      desc: 'Continuously pushing my boundaries, exploring new technologies, and growing steadily without losing depth.',
      num: '06',
    },
  ];

  return (
    <section id="interests" className="interests">
      {/* Decorative background */}
      <svg className="svg-line-container" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <path
          d="M-100,400 C200,100 400,700 800,300 S1100,100 1400,400"
          fill="none"
          stroke="rgba(124,58,237,0.15)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="container">
        <div className="section-label reveal-fade-up">Technical Interests & Goals</div>
        <h2 className="section-title reveal-fade-up">
          What Drives <span className="text-gradient">My Code</span>
        </h2>
        <p className="section-subtitle reveal-fade-up">
          Passion-fueled exploration across languages, systems, and ideas.
        </p>

        <div className="interests-grid">
          {interests.map((item, i) => (
            <div
              key={i}
              className={`interest-card tilt-card reveal-scale delay-${(i % 3) * 100}`}
            >
              <div className="tilt-card-inner">
                <span className="card-number">{item.num}</span>
                <span className="interest-icon">{item.icon}</span>
                <div className="interest-title">{item.title}</div>
                <div className="interest-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonalitySection() {
  const traits = [
    {
      emoji: '🐛',
      title: 'Bug Hunter',
      text: 'I genuinely enjoy debugging. The thrill of tracking down an elusive bug for hours and finally catching it is completely irreplaceable.',
    },
    {
      emoji: '☕',
      title: 'Deep Focus Mode',
      text: 'Once I start coding, time disappears. Late nights, long sessions — the zone is my natural habitat.',
    },
    {
      emoji: '📖',
      title: 'Self-taught Learner',
      text: 'Everything I know was self-learned. Documentation, tutorials, experimentation — that\'s my curriculum.',
    },
    {
      emoji: '🎯',
      title: 'Problem-First Mindset',
      text: 'I reach for the tool that solves the problem best. Python usually wins, but the problem always decides.',
    },
  ];

  return (
    <section id="personality" className="personality">
      <div className="container">
        <div className="section-label reveal-fade-up">Personality & Habits</div>
        <h2 className="section-title reveal-fade-up">
          Who I Am <span className="text-gradient">Behind the Screen</span>
        </h2>

        <div className="personality-content" style={{ marginTop: '4rem' }}>
          <div className="personality-quote reveal-slide-left">
            <p>
              "The sense of accomplishment after hours of debugging is{' '}
              <strong style={{ color: 'var(--accent-soft)' }}>irreplaceable</strong>. It's not just
              fixing code — it's solving a mystery, proving your own persistence, and growing with
              every single squashed bug."
            </p>
            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderTop: '1px solid var(--border)',
                paddingTop: '1.5rem',
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>🧮</span>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Explore Maths
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Independent Developer
                </div>
              </div>
            </div>
          </div>

          <div className="personality-traits reveal-slide-right">
            {traits.map((trait, i) => (
              <div key={i} className={`trait-item delay-${i * 100}`}>
                <span className="trait-emoji">{trait.emoji}</span>
                <div className="trait-text">
                  <strong>{trait.title}</strong>
                  {trait.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS SECTION
   ============================================================ */
function SkillsSection() {
  return (
    <section id="skills" className="skills">
      <div className="mesh-bg" />
      {/* Decorative */}
      <svg className="svg-line-container" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <polygon
          points="1100,50 1200,200 1000,200"
          fill="none"
          stroke="rgba(6,182,212,0.12)"
          strokeWidth="1"
        />
        <polygon
          points="100,500 200,700 0,700"
          fill="none"
          stroke="rgba(124,58,237,0.1)"
          strokeWidth="1"
        />
      </svg>

      <div className="container">
        <div className="section-label reveal-fade-up">Skills & Tech Stack</div>
        <h2 className="section-title reveal-fade-up">
          My <span className="text-gradient">Toolbox</span>
        </h2>
        <p className="section-subtitle reveal-fade-up">
          Languages, frameworks, and tools I use to bring ideas to life.
        </p>

        <div className="skills-grid">
          {/* Skill bars */}
          <div>
            <h3
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '2rem',
              }}
              className="reveal-fade-up"
            >
              Proficiency Levels
            </h3>
            <div className="skills-bars">
              {SKILLS.map((skill, i) => (
                <div key={skill.name} className={`skill-item reveal-fade-up delay-${i * 100}`}>
                  <div className="skill-header">
                    <div className="skill-name">
                      <span className="skill-icon">{skill.icon}</span>
                      {skill.name}
                    </div>
                    <span className="skill-pct">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      data-level={skill.level}
                      style={{ width: '0%' }}
                    >
                      <div className="skill-bar-glow" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional skills tags */}
            <div style={{ marginTop: '3rem' }}>
              <h3
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '1rem',
                }}
                className="reveal-fade-up"
              >
                Also Familiar With
              </h3>
              <div className="about-tags reveal-fade-up delay-200">
                {[
                  'Debugging 🔍',
                  'Scripting 📝',
                  'CLI Tools 💻',
                  'Pixel Games 🎮',
                  'Algorithms 🔢',
                  'Open Source 🌟',
                ].map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tech cards */}
          <div>
            <h3
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '2rem',
              }}
              className="reveal-fade-up"
            >
              Technology Cards
            </h3>
            <div className="tech-cards">
              {TECH_CARDS.map((card, i) => (
                <div
                  key={card.name}
                  className={`tech-card reveal-scale delay-${(i % 5) * 100}`}
                >
                  {card.badge && <span className="floating-badge">{card.badge}</span>}
                  <span className="tech-card-icon">{card.icon}</span>
                  <div className="tech-card-name">{card.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROJECTS SECTION
   ============================================================ */
function ProjectsSection() {
  return (
    <section id="projects" className="projects">
      <div className="scrolling-grid" style={{ opacity: 0.4 }} />
      <div className="container">
        <div className="section-label reveal-fade-up">Projects Showcase</div>
        <h2 className="section-title reveal-fade-up">
          Things I've <span className="text-gradient">Built</span>
        </h2>
        <p className="section-subtitle reveal-fade-up">
          Open-source tools and experiments crafted with curiosity and care.
        </p>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <div
              key={project.name}
              className={`project-card tilt-card reveal-${i % 2 === 0 ? 'slide-left' : 'slide-right'} delay-${i * 200}`}
            >
              <div className="tilt-card-inner">
                {/* Thumbnail */}
                <div
                  className="project-thumbnail"
                  style={{ background: project.color }}
                >
                  <div className="project-thumbnail-lines" />
                  <div className="project-thumbnail-bg">{project.icon}</div>
                  <div className="project-overlay" />
                  <div className="project-thumbnail-content">
                    <div className="project-badge">
                      <span>⭐</span> Featured
                    </div>
                    <div className="project-name-thumb">{project.name}</div>
                  </div>
                </div>

                {/* Body */}
                <div className="project-body">
                  <div className="project-tech-stack">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="project-desc">{project.description}</p>

                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <span>🐙</span> GitHub →
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <span>🌐</span> Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon card */}
        <div
          className="reveal-fade-up"
          style={{
            marginTop: '2.5rem',
            padding: '3rem',
            background: 'var(--bg-card)',
            border: '1px dashed var(--border-accent)',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚧</div>
          <div
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.5rem',
            }}
          >
            More projects coming soon...
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Currently seeking strong project ideas to build something truly ambitious.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BLOG SECTION
   ============================================================ */
function BlogSection() {
  return (
    <section id="blog" className="blog">
      <div className="container">
        <div className="section-label reveal-fade-up">Blog & Articles</div>
        <h2 className="section-title reveal-fade-up">
          Technical <span className="text-gradient">Thoughts</span>
        </h2>
        <p className="section-subtitle reveal-fade-up">
          Learning logs, dev diaries, and technical notes from the trenches.
        </p>

        <div className="blog-grid">
          {BLOG_POSTS.map((post, i) => (
            <div
              key={i}
              className={`blog-card reveal-scale delay-${(i % 3) * 100}`}
            >
              <span className="blog-card-tag">{post.tag}</span>
              <div className="blog-card-title">{post.title}</div>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-footer">
                <span className="blog-card-date">{post.date} · {post.readTime}</span>
                <a href="#blog" className="blog-card-read" onClick={(e) => e.preventDefault()}>
                  Read →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GITHUB STATS SECTION
   ============================================================ */
function GitHubStatsSection() {
  return (
    <section id="github" className="github-stats">
      <div className="container">
        <div className="section-label reveal-fade-up">GitHub Statistics</div>
        <h2 className="section-title reveal-fade-up">
          By the <span className="text-gradient">Numbers</span>
        </h2>
        <p className="section-subtitle reveal-fade-up">
          A snapshot of my coding activity and open-source contributions.
        </p>

        <div className="stats-grid">
          {/* Stat boxes */}
          <div className="stats-numbers">
            {[
              { num: 8, label: 'Years of Coding', suffix: '+', icon: '⏱️' },
              { num: 2, label: 'Public Repos', suffix: '', icon: '📦' },
              { num: 5, label: 'Languages Used', suffix: '', icon: '🔤' },
              { num: 500, label: 'Commits (est.)', suffix: '+', icon: '✅' },
            ].map((s, i) => (
              <div
                key={i}
                className={`stat-box reveal-scale delay-${i * 100}`}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }}>
                  {s.icon}
                </span>
                <span className="stat-box-number" data-count={s.num}>
                  0{s.suffix}
                </span>
                <span className="stat-box-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Language chart */}
          <div className="lang-chart reveal-slide-right">
            <div className="lang-chart-title">Most Used Languages</div>

            <div className="lang-bar-container">
              {LANG_DATA.map((lang) => (
                <div
                  key={lang.name}
                  className="lang-bar-segment"
                  style={{ flexGrow: lang.pct, background: lang.color }}
                  title={`${lang.name}: ${lang.pct}%`}
                />
              ))}
            </div>

            <div className="lang-list">
              {LANG_DATA.map((lang) => (
                <div key={lang.name} className="lang-item">
                  <span className="lang-dot" style={{ background: lang.color }} />
                  <span className="lang-name">{lang.name}</span>
                  <span className="lang-pct">{lang.pct}%</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <a
                href="https://github.com/ExploreMaths"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ display: 'inline-flex', fontSize: '0.72rem' }}
              >
                <span>🐙</span> View GitHub Profile
              </a>
            </div>
          </div>

          {/* Contribution graph */}
          <div className="contrib-graph reveal-fade-up">
            <div className="contrib-title">
              Contribution Activity (Simulated)
            </div>
            <div className="contrib-grid" id="contribGrid" />
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                marginTop: '1rem',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
              }}
            >
              <span>Less</span>
              {['', 'l1', 'l2', 'l3', 'l4'].map((cls) => (
                <div
                  key={cls}
                  className={`contrib-day ${cls}`}
                  style={{ flexShrink: 0 }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MINI GAME SECTION
   ============================================================ */
function MiniGameSection() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="minigame" className="minigame">
      <div className="container">
        <div className="section-label reveal-fade-up">Online Mini-Game</div>
        <h2 className="section-title reveal-fade-up">
          Play <span className="text-gradient">WordlePro</span>
        </h2>
        <p className="section-subtitle reveal-fade-up">
          My finest game project — the best Wordle experience with intelligent hints.
        </p>

        <div className="minigame-wrapper">
          {/* iframe preview */}
          <div className="minigame-preview reveal-slide-left">
            {!loaded && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '1rem',
                  background: 'var(--bg-card)',
                  zIndex: 1,
                }}
              >
                <div style={{ fontSize: '3rem' }}>🔤</div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                  }}
                >
                  Loading WordlePro...
                </div>
              </div>
            )}
            <iframe
              src="https://wordlepro.github.io"
              title="WordlePro Game"
              onLoad={() => setLoaded(true)}
              style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
            />
            <div className="minigame-preview-overlay" />
          </div>

          {/* Info */}
          <div className="minigame-info reveal-slide-right">
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                }}
              >
                WordlePro
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                The most polished Wordle experience on the web. With intelligent hints,
                statistics tracking, and a beautiful UI — word puzzles have never been
                this satisfying.
              </p>
            </div>

            <div className="minigame-features">
              {[
                { icon: '💡', title: 'Smart Hints', desc: 'Stuck? Get contextual hints that guide without spoiling.' },
                { icon: '📊', title: 'Statistics', desc: 'Track your win streaks and guess distribution.' },
                { icon: '🎨', title: 'Beautiful UI', desc: 'Clean, dark-mode-first design with smooth animations.' },
                { icon: '⚡', title: 'Zero Dependencies', desc: 'Pure vanilla JavaScript — blazing fast, no bloat.' },
              ].map((f, i) => (
                <div key={i} className="minigame-feature">
                  <span className="minigame-feature-icon">{f.icon}</span>
                  <div className="minigame-feature-text">
                    <strong>{f.title}</strong>
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <a
                href="https://wordlepro.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary magnetic"
              >
                <span>🎮</span> Play Now
              </a>
              <a
                href="https://github.com/WordlePro/wordlepro.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline magnetic"
              >
                <span>🐙</span> Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT SECTION
   ============================================================ */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '44px',
        height: '44px',
        background: 'var(--accent)',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '1.1rem',
        cursor: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.4s, transform 0.4s var(--ease-spring), box-shadow 0.3s',
        zIndex: 900,
        boxShadow: '0 4px 20px var(--accent-glow)',
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

function ContactSection() {
  const contacts = [
    { icon: '📧', label: 'GitHub Email', value: 'github.exploremaths@gmail.com', href: 'mailto:github.exploremaths@gmail.com' },
    { icon: '📮', label: 'Secondary Email', value: 'zhuchongjing_pypi@163.com', href: 'mailto:zhuchongjing_pypi@163.com' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/ExploreMaths', href: 'https://github.com/ExploreMaths' },
    { icon: '💬', label: 'Discord', value: 'discord.com/users/1478711201281347730', href: 'https://discord.com/users/1478711201281347730' },
    { icon: '🍑', label: 'Hetao ID', value: '44367046', href: '#' },
    { icon: '💚', label: 'WeChat', value: 'explore_maths', href: '#' },
  ];

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      {/* Decorative */}
      <svg className="svg-line-container" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <path
          d="M0,600 Q600,400 1200,600"
          fill="none"
          stroke="rgba(124,58,237,0.12)"
          strokeWidth="1.5"
        />
        <circle cx="600" cy="400" r="300" fill="none" stroke="rgba(6,182,212,0.06)" strokeWidth="1" />
      </svg>

      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-label reveal-fade-up" style={{ justifyContent: 'center' }}>
            Get In Touch
          </div>
          <h2 className="section-title reveal-fade-up" style={{ textAlign: 'center' }}>
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="section-subtitle reveal-fade-up" style={{ margin: '0 auto 1rem', textAlign: 'center' }}>
            Open to collaboration, feedback, or just a good tech conversation.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact items */}
          <div className="contact-info">
            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.href}
                className={`contact-item reveal-slide-left delay-${i * 80}`}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={c.href === '#' ? (e) => e.preventDefault() : undefined}
              >
                <div className="contact-icon">{c.icon}</div>
                <div className="contact-details">
                  <span className="contact-label">{c.label}</span>
                  <span className="contact-value">{c.value}</span>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.8rem' }}>→</span>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <form className="contact-form reveal-slide-right" onSubmit={handleSubmit}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}
            >
              Send a Message
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Fill out the form below and I'll get back to you.
            </p>

            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="Ada Lovelace"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />
              <div className="form-underline" />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="ada@example.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
              />
              <div className="form-underline" />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-input"
                rows={5}
                placeholder="Hey! I'd love to collaborate on..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
              />
              <div className="form-underline" />
            </div>

            <button type="submit" className="form-submit">
              {submitted ? '✓ Message Sent!' : '⚡ Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER COMPONENT
   ============================================================ */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div>
          <div className="footer-brand">Explore Maths</div>
          <p className="footer-tagline">
            Student & Independent Developer. Python specialist, frontend craftsman,
            bug hunter, and creative coder.
          </p>
          <ul className="footer-links">
            {['home', 'about', 'skills', 'projects', 'blog', 'contact'].map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(link)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-right">
          <div className="footer-social">
            {[
              { icon: '🐙', href: 'https://github.com/ExploreMaths', label: 'GitHub' },
              { icon: '💬', href: 'https://discord.com/users/1478711201281347730', label: 'Discord' },
              { icon: '📧', href: 'mailto:github.exploremaths@gmail.com', label: 'Email' },
              { icon: '🔤', href: 'https://wordlepro.github.io', label: 'WordlePro' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer-social-btn magnetic"
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="footer-copy">
            Built with <span className="accent">React</span> &{' '}
            <span className="accent">💜</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {year} <span style={{ color: 'var(--accent-soft)' }}>Explore Maths</span>. All rights reserved.
        </span>
        <span>Handcrafted with obsessive attention to detail.</span>
      </div>
    </footer>
  );
}

/* ============================================================
   HERO CANVAS ANIMATION (Particles + Lines)
   ============================================================ */
function useHeroCanvas() {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = document.getElementById('heroCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const count = 60;
    const connectionDist = 130;
    const colors = ['rgba(124,58,237,', 'rgba(6,182,212,', 'rgba(139,92,246,'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p, i) => {
        // Mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) { p.vx *= 0.95; p.vy *= 0.95; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ddx = p.x - p2.x;
          const ddy = p.y - p2.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);

          if (d < connectionDist) {
            const alpha = (1 - d / connectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}

/* ============================================================
   HOOK: SECTION INDICATOR
   ============================================================ */
function useSectionIndicator() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'learning', 'interests', 'personality', 'skills', 'projects', 'blog', 'github', 'minigame', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

/* ============================================================
   MARQUEE STRIP COMPONENT
   ============================================================ */
function MarqueeStrip() {
  const items = [
    'Python', 'JavaScript', 'HTML', 'CSS', 'C++', 'Git',
    'Open Source', 'Frontend Dev', 'Script Automation',
    'Game Dev', 'Self-Taught', 'Independent',
    'Python', 'JavaScript', 'HTML', 'CSS', 'C++', 'Git',
    'Open Source', 'Frontend Dev', 'Script Automation',
    'Game Dev', 'Self-Taught', 'Independent',
  ];

  return (
    <div className="marquee-wrapper" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.2rem 0' }}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="dot">◆</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SECTION INDICATOR COMPONENT
   ============================================================ */
function SectionIndicator({ active }: { active: number }) {
  const sections = ['home', 'about', 'learning', 'interests', 'personality', 'skills', 'projects', 'blog', 'github', 'minigame', 'contact'];
  const labels = ['Home', 'About', 'Learning', 'Interests', 'Personality', 'Skills', 'Projects', 'Blog', 'GitHub', 'Game', 'Contact'];

  return (
    <div className="section-indicator">
      {sections.map((id, i) => (
        <div
          key={id}
          className={`section-dot tooltip ${active === i ? 'active' : ''}`}
          data-tooltip={labels[i]}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
        />
      ))}
    </div>
  );
}

/* ============================================================
   HOOK: RIPPLE EFFECT
   ============================================================ */
function useRippleEffect() {
  useEffect(() => {
    const addRipple = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
      `;
      target.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    };

    const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .form-submit');
    buttons.forEach((btn) => {
      (btn as HTMLElement).classList.add('ripple-container');
      btn.addEventListener('click', addRipple as EventListener);
    });

    return () => {
      buttons.forEach((btn) => btn.removeEventListener('click', addRipple as EventListener));
    };
  }, []);
}

/* ============================================================
   HOOK: TEXT SCRAMBLE
   ============================================================ */
function useTextScramble() {
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

    const scrambleEl = (el: HTMLElement) => {
      const original = el.getAttribute('data-original') || el.textContent || '';
      if (!el.getAttribute('data-original')) el.setAttribute('data-original', original);

      let iteration = 0;
      const interval = setInterval(() => {
        el.textContent = original
          .split('')
          .map((char, index) => {
            if (index < iteration) return original[index];
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= original.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            scrambleEl(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    const scrambles = document.querySelectorAll('.scramble-on-reveal');
    scrambles.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ============================================================
   MAIN APP COMPONENT
   ============================================================ */
export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const { scrolled, progress } = useNavScroll();
  const activeSection = useSectionIndicator();

  // Initialize all hooks
  useCustomCursor();
  useScrollReveal();
  useParallax();
  useTiltEffect();
  useSkillBars();
  useMagneticEffect();
  useCounterAnimation();
  useContribGraph();
  useFloatingParticles();
  useSVGPaths();
  useInterestCards();
  useHeroCanvas();
  useRippleEffect();
  useTextScramble();

  // Hide loader
  const handleLoaderDone = useCallback(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    setTimeout(() => setLoaderDone(true), 600);
  }, []);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <div className="cursor-dot" />
      <div className="cursor-ring" />

      {/* Loader */}
      {!loaderDone && <Loader onDone={handleLoaderDone} />}

      {/* Section indicator */}
      <SectionIndicator active={activeSection} />

      {/* Main content */}
      <Navigation scrolled={scrolled} progress={progress} />

      <main>
        <HeroSection />

        {/* Marquee strip between sections */}
        <MarqueeStrip />

        <AboutSection />

        <div className="section-divider" />

        <TimelineSection />

        <div className="section-divider" />

        <InterestsSection />

        <div className="section-divider" />

        <PersonalitySection />

        <MarqueeStrip />

        <SkillsSection />

        <div className="section-divider" />

        <ProjectsSection />

        <div className="section-divider" />

        <BlogSection />

        <div className="section-divider" />

        <GitHubStatsSection />

        <div className="section-divider" />

        <MiniGameSection />

        <div className="section-divider" />

        <ContactSection />
      </main>

      <Footer />

      <BackToTop />
    </>
  );
}
