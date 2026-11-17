import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { useTimelineLight } from '../hooks/useTimelineLight';
import { education } from '../data/profile';

export default function Education() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  useTimelineLight(timelineRef, scaleY, Boolean(reduce));

  return (
    <section className="section education" id="education" aria-labelledby="education-heading">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Education"
          id="education"
          title={
            <>
              Foundations, still <em>compounding.</em>
            </>
          }
          intro="A Computer Science degree in progress, built alongside the projects that make the theory real."
        />

        <div className="education__grid">
          <div className="education__timeline" ref={timelineRef}>
            <span className="timeline-rail" aria-hidden="true" />
            <motion.span
              className="timeline-rail timeline-rail--progress"
              aria-hidden="true"
              style={{ scaleY: reduce ? 1 : scaleY, transformOrigin: 'top' }}
            />

            {education.map((item, index) => (
              <Reveal
                className={`education-entry${item.current ? ' is-current' : ''}`}
                delay={index * 0.05}
                key={item.institution}
              >
                <span className="education-entry__marker" aria-hidden="true">
                  {item.current ? <span /> : null}
                </span>
                <div className="education-entry__top">
                  <span className="education-entry__date">{item.date}</span>
                  <span className="education-entry__index">0{index + 1}</span>
                </div>
                <p className="education-entry__credential">{item.credential}</p>
                <h3 className="education-entry__institution">{item.institution}</h3>
                <p className="education-entry__detail">{item.detail}</p>
              </Reveal>
            ))}
          </div>

          <aside className="education__aside">
            <Reveal className="education__grade" delay={0.06}>
              <span className="micro-label">Current standing</span>
              <div className="education__grade-value">
                <span>8.85</span>
                <small>/ 10</small>
              </div>
              <div className="education__grade-rule" aria-hidden="true" />
              <p>CGPA · B.Tech Computer Science</p>
              <div className="education__grade-meta">
                <GraduationCap size={15} strokeWidth={1.4} aria-hidden="true" />
                <span>Expected graduation · June 2027</span>
              </div>
            </Reveal>

            <Reveal className="education__aside-note" delay={0.1}>
              <p>
                The classroom gives me the fundamentals. The projects give me the
                questions worth bringing back to it.
              </p>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
