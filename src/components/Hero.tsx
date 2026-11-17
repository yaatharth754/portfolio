import { motion, useReducedMotion } from 'framer-motion';
import { animate } from 'animejs';
import { useEffect, useRef } from 'react';
import { Sparkle } from 'lucide-react';
import AngelLogo from './AngelLogo';
import { profile } from '../data/profile';
import { popElement } from '../lib/motion';
import { showQuote } from '../lib/quote';

const headlineLines = [
  { text: 'Building', emphasis: false },
  { text: 'Intelligent', emphasis: true },
  { text: 'Experiences', emphasis: false },
  { text: 'Through Code.', emphasis: false },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  /* Keep the emblem the same height as the headline block ("Building" top →
     "Through Code." bottom) on the two-column desktop layout. */
  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    const headline = root.querySelector<HTMLElement>('.hero__headline');
    const grid = root.querySelector<HTMLElement>('.hero__grid');
    if (!headline || !grid) return;

    const desktop = window.matchMedia('(min-width: 981px)');
    const apply = () => {
      if (!desktop.matches) {
        root.style.removeProperty('--emblem-size');
        root.style.removeProperty('--emblem-offset');
        return;
      }
      const box = headline.getBoundingClientRect();
      const row = grid.getBoundingClientRect();
      root.style.setProperty('--emblem-size', `${Math.round(box.height)}px`);
      root.style.setProperty('--emblem-offset', `${Math.round(box.top - row.top)}px`);
    };

    apply();
    const frame = window.requestAnimationFrame(apply);
    const settle = window.setTimeout(apply, 350);
    const observer = new ResizeObserver(apply);
    observer.observe(headline);
    observer.observe(grid);
    window.addEventListener('resize', apply);
    desktop.addEventListener('change', apply);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      observer.disconnect();
      window.removeEventListener('resize', apply);
      desktop.removeEventListener('change', apply);
    };
  }, []);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.075, delayChildren: 0.04 },
    },
  };

  const line = {
    hidden: { y: reduce ? '0%' : '112%' },
    visible: {
      y: '0%',
      transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const fade = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-heading" ref={heroRef} data-depth-root>
      <div className="hero__ambient" aria-hidden="true">
        <span className="hero__meridian hero__meridian--one" data-depth="0.35" />
        <span className="hero__meridian hero__meridian--two" data-depth="0.55" />
        <span className="hero__glow" data-depth="0.18" />
        <span className="hero__star hero__star--one" data-depth="1.1" />
        <span className="hero__star hero__star--two" data-depth="0.8" />
        <span className="hero__star hero__star--three" data-depth="1.4" />
      </div>

      <div className="container hero__container">
        <motion.div
          className="hero__topline"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="hero__identity">
            <span className="status-dot" aria-hidden="true" />
            <span>Yaatharth Bawankar</span>
            <span className="hero__slash" aria-hidden="true">/</span>
            <span className="hero__muted">Computer Science Engineering</span>
          </div>
          <p className="hero__availability">
            <span className="status-dot status-dot--pink" aria-hidden="true" />
            {profile.availability}
          </p>
        </motion.div>

        <div className="hero__grid">
          <div className="hero__headline-wrap">
            <motion.h1
              className="hero__headline"
              id="hero-heading"
              variants={container}
              initial={reduce ? false : 'hidden'}
              animate="visible"
            >
              {headlineLines.map((item, index) => (
                <span className="hero__line" key={item.text}>
                  <span className="hero__line-inner">
                    <motion.span
                      variants={line}
                      className={item.emphasis ? 'hero__word hero__word--emphasis' : 'hero__word'}
                    >
                      {item.text}
                    </motion.span>
                    {index === 1 ? (
                      <motion.span
                        className="hero__star-glyph"
                        aria-hidden="true"
                        initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Sparkle size={30} strokeWidth={1} />
                      </motion.span>
                    ) : null}
                  </span>
                </span>
              ))}
            </motion.h1>

            <motion.div
              className="hero__subrow"
              initial={reduce ? false : 'hidden'}
              animate="visible"
              variants={container}
            >
              <motion.p className="hero__support" variants={fade}>
                {profile.support}
              </motion.p>
              <motion.span className="hero__support-mark" variants={fade} aria-hidden="true">
                ✳
              </motion.span>
            </motion.div>
          </div>

          <motion.aside
            className="hero__aside"
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="hero__emblem"
              role="button"
              tabIndex={0}
              aria-label="Show the field note"
              onClick={(event) => {
                popElement(event.currentTarget);
                const halo = event.currentTarget.querySelector('.glass-logo__halo');
                if (halo) {
                  animate(halo, {
                    scale: [1, 1.09, 1],
                    opacity: [1, 0.55, 1],
                    duration: 720,
                    ease: 'outQuad',
                  });
                }
                showQuote(event.clientX, event.clientY);
              }}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                const rect = event.currentTarget.getBoundingClientRect();
                popElement(event.currentTarget);
                showQuote(rect.left + rect.width / 2, rect.top + rect.height / 2);
              }}
            >
              <AngelLogo variant="full" title="Static metallic silver Y with a glowing red halo" />
            </div>
          </motion.aside>
        </div>

        <motion.div
          className="hero__footer"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <a className="scroll-cue" href="#about" aria-label="Scroll to explore the about section">
            <span className="scroll-cue__track" aria-hidden="true">
              <span className="scroll-cue__dot" />
            </span>
            <span>Scroll to explore</span>
          </a>
          <div className="hero__coordinates" aria-hidden="true">
            <span>23.0225° N</span>
            <span className="hero__coordinates-rule" />
            <span>72.5714° E</span>
          </div>
          <span className="hero__folio" aria-hidden="true">PORTFOLIO / 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
