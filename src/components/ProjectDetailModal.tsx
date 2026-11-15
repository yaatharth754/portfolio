import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import type { Project } from '../data/projects';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

type ProjectDetailModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const reduce = useReducedMotion();
  const dialogRef = useFocusTrap<HTMLDivElement>(true, onClose);
  useLockBodyScroll(true);

  return createPortal(
    <motion.div
      className="project-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.01 : 0.3 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="project-modal__panel"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={reduce ? false : { opacity: 0, y: 26, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
        transition={{ duration: reduce ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="project-modal__spine" aria-hidden="true" />

        <header className="project-modal__header">
          <div className="project-modal__rail" aria-hidden="true">
            <span>CASE STUDY / {project.index}</span>
            <span className="project-modal__rail-line" />
            <span>{project.category}</span>
          </div>
          <button
            type="button"
            className="project-modal__close"
            onClick={onClose}
            aria-label="Close project details"
          >
            <X size={20} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </header>

        <div className="project-modal__scroll">
          <div className="project-modal__intro">
            <span className="project-modal__year">{project.year}</span>
            <h2 id="project-modal-title">{project.title}</h2>
            <p className="project-modal__summary">{project.description}</p>
          </div>

          <div className="project-modal__grid">
            <div className="project-modal__narrative">
              <section>
                <h3>
                  <span aria-hidden="true">01</span> The problem
                </h3>
                <p>{project.problem}</p>
              </section>

              <section>
                <h3>
                  <span aria-hidden="true">02</span> Key features
                </h3>
                <ul className="project-modal__features">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <span className="project-modal__bullet" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>
                  <span aria-hidden="true">03</span> My contribution
                </h3>
                <p>{project.contribution}</p>
              </section>
            </div>

            <aside className="project-modal__aside">
              <div className="project-modal__block">
                <span className="micro-label">Technology</span>
                <ul className="project-modal__stack">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>

              <div className="project-modal__block">
                <span className="micro-label">Verified links</span>
                <div className="project-modal__links">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal__link"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <p className="project-modal__source-note">
                  Source repository is not publicly listed.
                </p>
              </div>

              <div className="project-modal__seal" aria-hidden="true">
                <span>YB</span>
                <small>BUILT / 0{project.index}</small>
              </div>
            </aside>
          </div>
        </div>

        <footer className="project-modal__footer">
          <span>SELECTED WORK / {project.index}</span>
          <button type="button" className="project-modal__footer-close" onClick={onClose}>
            Close case study
          </button>
        </footer>
      </motion.div>
    </motion.div>,
    document.body
  );
}
