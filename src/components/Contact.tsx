import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ArrowUpRight, BriefcaseBusiness, Github, Linkedin, Mail } from 'lucide-react';
import Reveal from './Reveal';
import { profile } from '../data/profile';
import { CONTACT_ENDPOINT } from '../config';

type FieldName = 'name' | 'email' | 'subject' | 'message';
type FormValues = Record<FieldName, string> & { company: string };
type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

const emptyForm: FormValues = { name: '', email: '', subject: '', message: '', company: '' };
const limits: Record<FieldName, number> = { name: 120, email: 254, subject: 160, message: 5000 };

function validate(values: FormValues): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length > limits.name) errors.name = 'Name is too long.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Please enter a subject.';
  else if (values.subject.trim().length > limits.subject) errors.subject = 'Subject is too long.';
  if (!values.message.trim()) errors.message = 'Please enter a message.';
  else if (values.message.trim().length > limits.message) errors.message = 'Message is too long.';
  return errors;
}

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
    href: '#contact-form',
    icon: BriefcaseBusiness,
  },
] as const;

export default function Contact() {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [statusText, setStatusText] = useState('');
  const sendingRef = useRef(false);
  const formHeadingRef = useRef<HTMLHeadingElement>(null);

  const update = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== 'company') setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== 'sending') {
      setStatus('idle');
      setStatusText('');
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendingRef.current || values.company) return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstError = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstError) {
      document.getElementById('contact-' + firstError)?.focus();
      setStatus('error');
      setStatusText('Please correct the highlighted fields.');
      return;
    }

    sendingRef.current = true;
    setStatus('sending');
    setStatusText('Sending your message…');
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(12_000),
      });
      const payload: { ok?: boolean; error?: string } = await response.json().catch(() => ({}));
      if (!response.ok || payload.ok !== true) throw new Error(payload.error || 'Message could not be sent.');
      setValues(emptyForm);
      setErrors({});
      setStatus('sent');
      setStatusText("Message sent. Thank you — I'll get back to you as soon as possible.");
    } catch (error) {
      setStatus('error');
      const reason = error instanceof Error ? error.message : 'Message could not be sent.';
      setStatusText(reason + ' You can also email ' + profile.email + '.');
    } finally {
      sendingRef.current = false;
    }
  };

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
                  onClick={card.number === '04' ? () => window.requestAnimationFrame(() => formHeadingRef.current?.focus({ preventScroll: true })) : undefined}
                  aria-label={card.title === 'COLLABORATE' ? 'Go to contact form' : undefined}
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

        <Reveal className="contact__form-reveal">
          <div className="contact-form-panel" id="contact-form">
            <div className="contact-form-panel__intro">
              <p className="contact__eyebrow">A NEW CONVERSATION / 01</p>
              <h3 ref={formHeadingRef} tabIndex={-1}>SEND A MESSAGE<span>.</span></h3>
              <p>Tell me a little about what you&apos;re thinking. I&apos;ll get back to you as soon as possible.</p>
            </div>

            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="contact-form__row">
                <label className="contact-field" htmlFor="contact-name">
                  <span>NAME</span>
                  <input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={update('name')} placeholder="Your name" maxLength={limits.name} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
                  {errors.name && <small id="contact-name-error">{errors.name}</small>}
                </label>
                <label className="contact-field" htmlFor="contact-email">
                  <span>EMAIL</span>
                  <input id="contact-email" name="email" type="email" autoComplete="email" value={values.email} onChange={update('email')} placeholder="you@example.com" maxLength={limits.email} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
                  {errors.email && <small id="contact-email-error">{errors.email}</small>}
                </label>
              </div>
              <label className="contact-field" htmlFor="contact-subject">
                <span>SUBJECT</span>
                <input id="contact-subject" name="subject" value={values.subject} onChange={update('subject')} placeholder="What would you like to discuss?" maxLength={limits.subject} required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'contact-subject-error' : undefined} />
                {errors.subject && <small id="contact-subject-error">{errors.subject}</small>}
              </label>
              <label className="contact-field" htmlFor="contact-message">
                <span>MESSAGE</span>
                <textarea id="contact-message" name="message" rows={6} value={values.message} onChange={update('message')} placeholder="Tell me about your idea…" maxLength={limits.message} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
                {errors.message && <small id="contact-message-error">{errors.message}</small>}
              </label>
              <label className="contact-form__honeypot" aria-hidden="true">
                Company
                <input name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update('company')} />
              </label>
              <div className="contact-form__footer">
                <button className="contact-form__submit" type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                  <span>{status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}</span>
                  <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />
                </button>
                <p className="contact-form__note">Messages are sent directly to my inbox.</p>
              </div>
              <p className={'contact-form__status contact-form__status--' + status} role="status" aria-live="polite">{statusText}</p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
