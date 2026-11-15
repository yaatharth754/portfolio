import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import AngelLogo from './AngelLogo';
import { navItems, profile } from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <AngelLogo variant="footer" className="site-footer__mark" decorative />
            <div>
              <span className="site-footer__eyebrow">A SMALL, CAREFUL CORNER OF THE INTERNET</span>
              <p className="site-footer__name">Yaatharth Bawankar</p>
            </div>
          </div>

          <a className="site-footer__top-link" href="#home">
            <span>Back to top</span>
            <ArrowUp size={15} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>

        <div className="site-footer__rule" aria-hidden="true" />

        <div className="site-footer__grid">
          <div className="site-footer__statement">
            <p>
              Building intelligent experiences through code — one considered
              detail at a time.
            </p>
            <span className="site-footer__status">
              <span className="status-dot status-dot--pink" aria-hidden="true" />
              {profile.availability}
            </span>
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <span className="micro-label">Index</span>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <span className="micro-label">Elsewhere</span>
            <a href={`mailto:${profile.email}`}>
              <Mail size={15} strokeWidth={1.4} aria-hidden="true" />
              <span>{profile.email}</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={15} strokeWidth={1.4} aria-hidden="true" />
              <span>LinkedIn</span>
              <ArrowUpRight size={13} strokeWidth={1.4} aria-hidden="true" />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={15} strokeWidth={1.4} aria-hidden="true" />
              <span>GitHub</span>
              <ArrowUpRight size={13} strokeWidth={1.4} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {year} Yaatharth Bawankar. All rights reserved.</span>
          <span className="site-footer__signature" aria-hidden="true">
            DESIGNED &amp; ENGINEERED WITH INTENTION
          </span>
          <a href={profile.resume} download={profile.resumeName}>
            Resume / PDF
          </a>
        </div>
      </div>
    </footer>
  );
}
