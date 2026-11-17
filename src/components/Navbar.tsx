import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownToLine, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import AngelLogo from './AngelLogo';
import { navItems, profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { popElement } from '../lib/motion';
import { showQuote } from '../lib/quote';

/* Clicking the brand mark opens the field-note quote card. */

const NAV_IDS = navItems.map((item) => item.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);
  const reduce = useReducedMotion();
  const menuRef = useFocusTrap<HTMLDivElement>(menuOpen, () => setMenuOpen(false));

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="site-header__inner container">
          <a
            className="brand"
            href="#home"
            onClick={(event) => {
              popElement(event.currentTarget.querySelector('.brand__mark'));
              showQuote(event.clientX, event.clientY);
            }}
          >
            <AngelLogo variant="compact" className="brand__mark" decorative />
            <span className="brand__type">
              <span className="brand__name">{'YAATHARTH '}</span>
              <span className="brand__rule" aria-hidden="true" />
              <span className="brand__sub">BAWANKAR</span>
            </span>
            <span className="sr-only">— home</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary">
            <ul className="desktop-nav__list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`nav-link${active === item.id ? ' is-active' : ''}`}
                    aria-current={active === item.id ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <a
              className="resume-pill"
              href={profile.resume}
              download={profile.resumeName}
              aria-label="Download Resume — Yaatharth Bawankar PDF"
            >
              <span className="resume-pill__label">
                <span className="resume-pill__verb">Download </span>Resume
              </span>
              <ArrowDownToLine size={14} strokeWidth={1.7} aria-hidden="true" />
            </a>
            <button
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X size={21} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu size={21} strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="mobile-menu__inner container" ref={menuRef}>
              <div className="mobile-menu__top">
                <span className="micro-label">Navigation</span>
                <span className="micro-label">Ahmedabad, IN</span>
              </div>

              <nav aria-label="Mobile primary">
                <ul className="mobile-menu__links">
                  {navItems.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className={active === item.id ? 'is-active' : undefined}
                        aria-current={active === item.id ? 'location' : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="mobile-menu__index">0{index + 1}</span>
                        <span>{item.label}</span>
                        <ArrowUpRight size={22} strokeWidth={1.2} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mobile-menu__bottom">
                <a
                  className="btn btn--solid"
                  href={profile.resume}
                  download={profile.resumeName}
                >
                  <span>Download Resume</span>
                  <ArrowDownToLine size={16} strokeWidth={1.7} aria-hidden="true" />
                </a>
                <div className="mobile-menu__socials">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github size={18} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin size={18} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                  <a href={`mailto:${profile.email}`} aria-label="Email Yaatharth">
                    <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
