import { ArrowUpRight, BriefcaseBusiness, Github, Linkedin, Mail } from 'lucide-react';
import Reveal from './Reveal';
import { profile } from '../data/profile';

const cardDetails = [
  {
    number: '01',
    title: 'EMAIL',
    description: "Let's connect and discuss your ideas.",
    detail: profile.email,
    action: 'SEND AN EMAIL',
    href: 'mailto:' + profile.email,
    icon: Mail,
  },
  {
    number: '02',
    title: 'LINKEDIN',
    description: "Let's connect professionally.",
    detail: '/in/yaatharth754',
    action: 'VISIT LINKEDIN',
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    number: '03',
    title: 'GITHUB',
    description: 'Explore my projects and code.',
    detail: '/yaatharth754',
    action: 'EXPLORE GITHUB',
    href: profile.github,
    icon: Github,
    external: true,
  },
  {
    number: '04',
    title: 'COLLABORATE',
    description: 'Have an internship opportunity, project idea, or something interesting to build together?',
    detail: 'Ideas welcome',
    action: "LET'S TALK",
    href: 'mailto:' + profile.email,
    icon: BriefcaseBusiness,
  },
] as const;

export default function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="container contact__container">
        <Reveal className="contact__intro">
          <p className="contact__eyebrow">06 / CONTACT</p>
          <h2 className="contact__title" id="contact-heading">
            <span>LET&apos;S BUILD</span>
            <span>SOMETHING</span>
            <span>INTELLIGENT<span className="contact__title-stop">.</span></span>
          </h2>
          <div className="contact__intro-bottom">
            <p className="contact__summary">
              Have an interesting idea, an exciting opportunity, or a project in mind? Let&apos;s turn it into something meaningful.
            </p>
            <p className="contact__available">
              <span className="contact__available-dot" aria-hidden="true" />
              OPEN TO COLLABORATION
            </p>
          </div>
        </Reveal>

        <div className="contact__cards" aria-label="Ways to connect">
          {cardDetails.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal className="contact__card-reveal" delay={index * 0.05} key={card.number}>
                <a
                  className="contact-card"
                  href={card.href}
                  target={'external' in card ? '_blank' : undefined}
                  rel={'external' in card ? 'noopener noreferrer' : undefined}
                >
                  <span className="contact-card__top">
                    <span className="contact-card__icon" aria-hidden="true"><Icon size={27} strokeWidth={1.45} /></span>
                    <span className="contact-card__number">{card.number} / 04</span>
                  </span>
                  <span className="contact-card__body">
                    <strong className="contact-card__title">{card.title}</strong>
                    <span className="contact-card__description">{card.description}</span>
                    <span className="contact-card__detail">{card.detail}</span>
                  </span>
                  <span className="contact-card__action">
                    {card.action}
                    <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
