import {
  BrainCircuit,
  ChartSpline,
  Code2,
  Layers3,
  TerminalSquare,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { appliedSkills, skillGroups } from '../data/profile';

const icons = [Code2, BrainCircuit, ChartSpline, Layers3, TerminalSquare];

export default function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          id="skills"
          title={
            <>
              Tools earned through <em>practice.</em>
            </>
          }
          intro="No percentage bars. No invented proficiency levels. These are the languages, libraries, and tools that have actually shaped the work."
        />

        <div className="skills__grid">
          {skillGroups.map((group, index) => {
            const Icon = icons[index] ?? Code2;
            return (
              <Reveal
                className={`skill-card skill-card--${index + 1}`}
                delay={index * 0.04}
                key={group.title}
                as="article"
              >
                <div className="skill-card__top">
                  <span className="skill-card__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.35} />
                  </span>
                  <span className="skill-card__index">{group.index}</span>
                </div>

                <div className="skill-card__body">
                  <h3>{group.title}</h3>
                  <p className="skill-card__caption">{group.caption}</p>
                  <ul className="tag-list" aria-label={`${group.title} skills`}>
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <span className="skill-card__corner" aria-hidden="true" />
              </Reveal>
            );
          })}
        </div>

        <Reveal className="skills__applied" delay={0.06}>
          <div className="skills__applied-head">
            <span className="micro-label">Also used across live projects</span>
            <span className="skills__applied-rule" aria-hidden="true" />
            <span className="skills__applied-count">
              {appliedSkills.length.toString().padStart(2, '0')}
            </span>
          </div>
          <ul className="applied-list" aria-label="Additional project technologies">
            {appliedSkills.map((skill) => (
              <li key={skill}>
                <span className="applied-list__dot" aria-hidden="true" />
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="skills__note" delay={0.08}>
          <p>
            Still learning, deliberately. The list grows when a project demands
            something new — not when a keyword becomes fashionable.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
