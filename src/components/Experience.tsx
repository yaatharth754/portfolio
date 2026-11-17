import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { CircleDot, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { useTimelineLight } from '../hooks/useTimelineLight';
import { certifications, languages, practicalExperience, profile } from '../data/profile';

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 72%', 'end 58%'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  useTimelineLight(timelineRef, scaleY, Boolean(reduce));

  return (
    <section className="section experience" id="experience" aria-labelledby="experience-heading">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          id="experience"
          title={
            <>
              Where the work <em>happened.</em>
            </>
          }
          intro="No borrowed titles, no invented job history. Experience, for now, means projects taken from problem to live product — plus the discipline of learning in public."
        />

        <div className="experience__grid">
          <div className="experience__timeline" ref={timelineRef}>
            <span className="timeline-rail" aria-hidden="true" />
            <motion.span
              className="timeline-rail timeline-rail--progress"
              aria-hidden="true"
              style={{ scaleY: reduce ? 1 : scaleY, transformOrigin: 'top' }}
            />

            {practicalExperience.map((item, index) => (
              <Reveal className="timeline-entry" delay={index * 0.05} key={item.project}>
                <span className="timeline-entry__marker" aria-hidden="true" />
                <div className="timeline-entry__meta">
                  <span className="timeline-entry__period">{item.period}</span>
                  <span className="timeline-entry__index">0{index + 1}</span>
                </div>
                <h3 className="timeline-entry__role">{item.role}</h3>
                <p className="timeline-entry__project">{item.project}</p>
                <p className="timeline-entry__description">{item.description}</p>
                <ul className="timeline-entry__list">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <aside className="experience__aside">
            <Reveal className="experience__status" delay={0.05}>
              <div className="experience__status-top">
                <span className="status-dot status-dot--pink" aria-hidden="true" />
                <span className="micro-label">Currently</span>
              </div>
              <p className="experience__status-title">{profile.availability}</p>
              <p className="experience__status-copy">
                Looking for a team working on applied AI, machine learning, or data
                products — where a student can contribute to real systems and learn
                from people who care how they are built.
              </p>
              <div className="experience__status-meta">
                <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
                <span>{profile.location}</span>
              </div>
            </Reveal>

            <Reveal className="experience__certs" delay={0.1}>
              <div className="experience__certs-head">
                <span className="micro-label">Continued learning</span>
                <span className="experience__certs-count">
                  {certifications.length.toString().padStart(2, '0')}
                </span>
              </div>
              <ul>
                {certifications.map((cert) => (
                  <li key={cert.title}>
                    <CircleDot size={13} strokeWidth={1.4} aria-hidden="true" />
                    <div>
                      <p>{cert.title}</p>
                      <span>{cert.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="experience__note" delay={0.12}>
              <p>
                Open to internships and collaborative work. Every claim on this
                page is traceable to a project, a programme, or a result.
              </p>
              <p>Languages: {languages.join(' · ')}</p>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
