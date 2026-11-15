import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Sparkle } from 'lucide-react';
import AngelLogo from './AngelLogo';
import { profile } from '../data/profile';

const headlineLines = [
  { text: 'Building', emphasis: false },
  { text: 'Intelligent', emphasis: true },
  { text: 'Experiences', emphasis: false },
  { text: 'Through Code.', emphasis: false },
];

export default function Hero() {
  const reduce = useReducedMotion();

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
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero__ambient" aria-hidden="true">
        <span className="hero__meridian hero__meridian--one" />
        <span className="hero__meridian hero__meridian--two" />
        <span className="hero__glow" />
        <span className="hero__star hero__star--one" />
        <span className="hero__star hero__star--two" />
        <span className="hero__star hero__star--three" />
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
            <div className="hero__emblem"><AngelLogo variant="full" title="Glass winged Y logo with dark blue halo" /></div>

            <div className="hero__actions">
              <a className="btn btn--solid" href="#projects">
                <span>Explore My Work</span>
                <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
              </a>
              <a className="btn btn--outline" href="#about">
                <span>About Me</span>
                <ArrowDown size={16} strokeWidth={1.7} aria-hidden="true" />
              </a>
              <a
                className="hero__resume-link"
                href={profile.resume}
                download={profile.resumeName}
              >
                <Download size={15} strokeWidth={1.6} aria-hidden="true" />
                <span>Download Resume</span>
                <span className="hero__resume-meta">PDF</span>
              </a>
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
