import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
} from 'lucide-react';
import ProjectArtwork from './ProjectArtwork';
import { projects, type Project } from '../data/projects';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useMediaQuery } from '../hooks/useMediaQuery';

type ProjectCarouselProps = {
  onSelectProject: (project: Project) => void;
};

const AUTO_MS = 3000;

export default function ProjectCarousel({ onSelectProject }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.3 });
  const reducePreference = usePrefersReducedMotion();
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const reduce = reducePreference || Boolean(reduceMotion);
  const isAutoRunning = !reduce;

  const go = (direction: 1 | -1) => {
    setActiveIndex((index) => (index + direction + projects.length) % projects.length);
  };

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!isAutoRunning || hoverPaused || !inView) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % projects.length);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [hoverPaused, inView, isAutoRunning]);

  const dragStart = useRef<{ x: number; y: number; id: number } | null>(null);
  const suppressClick = useRef(false);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') return;
    dragStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    suppressClick.current = false;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = dragStart.current;
    if (!start) return;
    dragStart.current = null;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  const onCardClick = (project: Project) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    onSelectProject(project);
  };

  const activeProject = projects[activeIndex];

  return (
    <div
      className="project-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected project gallery"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={() => setHoverPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          go(-1);
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          go(1);
        }
      }}
    >
      <div
        className="project-carousel__stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragStart.current = null;
        }}
      >
        <div className="project-carousel__floor" aria-hidden="true" data-depth="0.12" />
        <div className="project-carousel__orbit" aria-hidden="true" data-depth="0.24" />

        {projects.map((project, index) => {
          const offset = (index - activeIndex + projects.length) % projects.length;
          const signed = offset === 0 ? 0 : offset === 1 ? 1 : -1;
          const isActive = signed === 0;
          const sideX = isMobile ? 72 : 56;
          const target = {
            x: signed === 0 ? '0%' : signed > 0 ? `${sideX}%` : `-${sideX}%`,
            scale: signed === 0 ? 1 : isMobile ? 0.76 : 0.8,
            rotateY: signed === 0 ? 0 : signed > 0 ? -19 : 19,
            rotateZ: signed === 0 ? 0 : signed > 0 ? 5 : -5,
            opacity: signed === 0 ? 1 : isMobile ? 0.38 : 0.48,
            zIndex: signed === 0 ? 30 : signed > 0 ? 20 : 10,
          };

          return (
            <div
              className="project-card-slot"
              key={project.id}
              style={{ zIndex: target.zIndex }}
            >
              <motion.article
                className={`project-card${isActive ? ' is-active' : ''}`}
                initial={false}
                animate={target}
                transition={
                  reduce
                    ? { duration: 0.01 }
                    : { duration: 0.95, ease: [0.22, 1, 0.36, 1] }
                }
                aria-label={`${project.title} — ${project.category}`}
                aria-roledescription="slide"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ProjectArtwork art={project.art} id={project.id} />
                <div className="project-card__wash" aria-hidden="true" />
                <div className="project-card__top">
                  <span className="project-card__number">{project.index}</span>
                  <span className="project-card__category">{project.category}</span>
                </div>
                <div className="project-card__content">
                  <p className="project-card__kicker">{project.year}</p>
                  <span className="project-card__title">{project.title}</span>
                  <p className="project-card__summary">{project.summary}</p>
                  <ul className="project-card__stack" aria-label={`${project.title} technology stack`}>
                    {project.stack.slice(0, 4).map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                    {project.stack.length > 4 ? (
                      <li className="project-card__stack-more">+{project.stack.length - 4}</li>
                    ) : null}
                  </ul>
                  <span className="project-card__footer">
                    <span>Open case study</span>
                    <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </div>
                <button
                  className="project-card__button"
                  type="button"
                  aria-label={`Open ${project.title} case study`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onCardClick(project)}
                />
                <span className="project-card__edge" aria-hidden="true" />
              </motion.article>
            </div>
          );
        })}

        <p className="sr-only" aria-live="polite">
          Project {activeIndex + 1} of {projects.length}: {activeProject.title}
        </p>
      </div>

      <div className="project-carousel__controls">
        <div className="carousel-index" aria-hidden="true">
          <span>{projects[activeIndex].index}</span>
          <span className="carousel-index__rule" />
          <span>0{projects.length}</span>
        </div>

        <div className="carousel-dots" role="group" aria-label="Choose a project">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-pressed={index === activeIndex}
              aria-label={`Show ${project.title}`}
              className={`carousel-dot${index === activeIndex ? ' is-active' : ''}`}
              onClick={() => goTo(index)}
            >
              <span className="sr-only">{project.title}</span>
            </button>
          ))}
        </div>

      </div>

      <div className="project-carousel__hint" aria-hidden="true">
        <span>Use ← → to navigate</span>
        <span className="project-carousel__hint-rule" />
        <span>Drag on touch</span>
      </div>

      {isAutoRunning ? (
        <div
          className="carousel-timer"
          aria-hidden="true"
          style={
            {
              '--timer-state': hoverPaused || !inView ? 'paused' : 'running',
            } as CSSProperties
          }
          key={activeIndex}
        >
          <span className="carousel-timer__fill" />
        </div>
      ) : null}
    </div>
  );
}
