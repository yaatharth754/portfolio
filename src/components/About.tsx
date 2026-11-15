import { ArrowUpRight, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import VideoTypography from './VideoTypography';
import Reveal from './Reveal';
import { profile } from '../data/profile';

const facts = [
  { label: 'Based in', value: 'Ahmedabad, India' },
  { label: 'Studying', value: 'B.Tech CSE · Class of 2027' },
  { label: 'Current CGPA', value: '8.85 / 10' },
  { label: 'Working toward', value: 'AI/ML & Data Science' },
];

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="Origin"
          id="about"
          title={
            <>
              A builder drawn to <em>intelligence.</em>
            </>
          }
          intro="A student by title, an engineer by practice. I build AI systems that begin with a real problem and end with something usable."
        />

        <div className="about__grid">
          <div className="about__left">
            <Reveal>
              <VideoTypography />
            </Reveal>

            <div className="about__copy">
              <Reveal className="about__manifesto" delay={0.05}>
                <p className="about__lede">
                  I&apos;m Yaatharth Bawankar — a Computer Science Engineering student who
                  learns by making the thing rather than talking about the thing.
                </p>
                <span className="about__mark" aria-hidden="true">✦</span>
              </Reveal>

              <div className="about__paragraphs">
                {profile.intro.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={0.05 + index * 0.05}>
                    <p>{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal className="about__facts" delay={0.1}>
                <dl>
                  {facts.map((fact) => (
                    <div className="about__fact" key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="about__location">
                  <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
                  <span>Ahmedabad, Gujarat · IST</span>
                </div>
              </Reveal>

              <Reveal className="about__cta" delay={0.12}>
                <a className="text-link" href={profile.resume} download={profile.resumeName}>
                  <span>Read the one-page resume</span>
                  <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
                </a>
                <p className="about__cta-note">
                  A short record of what I&apos;ve built and what I&apos;m still learning.
                </p>
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
