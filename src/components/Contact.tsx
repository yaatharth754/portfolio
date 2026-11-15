import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { profile } from '../data/profile';
import { CONTACT_ENDPOINT } from '../config';

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '',
};

function useLocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());

    setTime(format());
    const interval = window.setInterval(() => setTime(format()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle');
  const localTime = useLocalTime();

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied('copied');
      window.setTimeout(() => setCopied('idle'), 2500);
    } catch {
      setCopied('failed');
      window.setTimeout(() => setCopied('idle'), 3500);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.company) return;

    setStatus('sending');
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus('sent');
      setValues(initialValues);
    } catch {
      setStatus('error');
    }
  };

  const statusMessage: Record<Status, string> = {
    idle: '',
    sending: 'Sending your message…',
    sent: 'Message received. Thank you — I\u2019ll get back to you when I can.',
    error: `Something blocked the message. Please email me directly at ${profile.email}.`,
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          id="contact"
          title={
            <>
              Have an Idea? <em>Let&apos;s Build Something.</em>
            </>
          }
          intro="I'm always interested in connecting with people who enjoy building meaningful things with technology."
        />

        <div className="contact__panel">
          <div className="contact__left">
            <Reveal>
              <p className="contact__lead">
                Whether it&apos;s an internship, a research conversation, or a
                project that needs an extra pair of hands — start here.
              </p>
            </Reveal>

            <Reveal className="contact__details" delay={0.05}>
              <ul className="contact-list">
                <li className="contact-list__item">
                  <span className="contact-list__icon" aria-hidden="true">
                    <Mail size={17} strokeWidth={1.4} />
                  </span>
                  <div className="contact-list__body">
                    <span className="contact-list__label">Email</span>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </div>
                  <button
                    type="button"
                    className="contact-list__copy"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                  >
                    {copied === 'copied' ? (
                      <Check size={15} strokeWidth={1.8} aria-hidden="true" />
                    ) : (
                      <Copy size={15} strokeWidth={1.5} aria-hidden="true" />
                    )}
                    <span className="sr-only" aria-live="polite">
                      {copied === 'copied'
                        ? 'Email copied'
                        : copied === 'failed'
                          ? 'Could not copy. Email address is visible.'
                          : ''}
                    </span>
                  </button>
                </li>

                <li className="contact-list__item">
                  <span className="contact-list__icon" aria-hidden="true">
                    <Phone size={17} strokeWidth={1.4} />
                  </span>
                  <div className="contact-list__body">
                    <span className="contact-list__label">Phone</span>
                    <a href={profile.phoneHref}>{profile.phoneDisplay}</a>
                  </div>
                  <ArrowUpRight size={15} strokeWidth={1.3} className="contact-list__arrow" aria-hidden="true" />
                </li>

                <li className="contact-list__item">
                  <span className="contact-list__icon" aria-hidden="true">
                    <MessageCircle size={17} strokeWidth={1.4} />
                  </span>
                  <div className="contact-list__body">
                    <span className="contact-list__label">WhatsApp</span>
                    <a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer">
                      {profile.whatsappDisplay}
                    </a>
                  </div>
                  <ArrowUpRight size={15} strokeWidth={1.3} className="contact-list__arrow" aria-hidden="true" />
                </li>

                <li className="contact-list__item">
                  <span className="contact-list__icon" aria-hidden="true">
                    <Linkedin size={17} strokeWidth={1.4} />
                  </span>
                  <div className="contact-list__body">
                    <span className="contact-list__label">LinkedIn</span>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                      /in/yaatharth754
                    </a>
                  </div>
                  <ArrowUpRight size={15} strokeWidth={1.3} className="contact-list__arrow" aria-hidden="true" />
                </li>

                <li className="contact-list__item">
                  <span className="contact-list__icon" aria-hidden="true">
                    <Github size={17} strokeWidth={1.4} />
                  </span>
                  <div className="contact-list__body">
                    <span className="contact-list__label">GitHub</span>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                      /yaatharth754
                    </a>
                  </div>
                  <ArrowUpRight size={15} strokeWidth={1.3} className="contact-list__arrow" aria-hidden="true" />
                </li>

                <li className="contact-list__item contact-list__item--static">
                  <span className="contact-list__icon" aria-hidden="true">
                    <MapPin size={17} strokeWidth={1.4} />
                  </span>
                  <div className="contact-list__body">
                    <span className="contact-list__label">Location</span>
                    <span>{profile.location}</span>
                  </div>
                  <span className="contact-list__time">{localTime || '—'} IST</span>
                </li>
              </ul>
            </Reveal>

            <Reveal className="contact__availability" delay={0.1}>
              <span className="status-dot status-dot--pink" aria-hidden="true" />
              <span>{profile.availability}</span>
            </Reveal>
          </div>

          <Reveal className="contact__right" delay={0.08}>
            <div className="contact-form__head">
              <span className="micro-label">Start a conversation</span>
              <span className="contact-form__index" aria-hidden="true">01</span>
            </div>

            <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
              <div className="contact-form__row">
                <label className="field">
                  <span className="field__label">Your name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={(event) => update('name', event.target.value)}
                    placeholder="Ada Lovelace"
                  />
                </label>
                <label className="field">
                  <span className="field__label">Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={(event) => update('email', event.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="field">
                <span className="field__label">Subject</span>
                <input
                  type="text"
                  name="subject"
                  required
                  value={values.subject}
                  onChange={(event) => update('subject', event.target.value)}
                  placeholder="An internship, a project, a good question"
                />
              </label>

              <label className="field">
                <span className="field__label">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={values.message}
                  onChange={(event) => update('message', event.target.value)}
                  placeholder="Tell me what you're thinking about."
                />
              </label>

              <label className="contact-form__honeypot" aria-hidden="true">
                Company
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={(event) => update('company', event.target.value)}
                />
              </label>

              <div className="contact-form__footer">
                <button className="btn btn--solid contact-form__submit" type="submit" disabled={status === 'sending'}>
                  <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                  <Send size={15} strokeWidth={1.6} aria-hidden="true" />
                </button>
                <p className="contact-form__note">
                  Your message is sent securely when you press Send.
                </p>
              </div>

              <p
                className={`contact-form__status${status !== 'idle' ? ' is-visible' : ''}`}
                role="status"
                aria-live="polite"
              >
                {statusMessage[status]}
              </p>

              <noscript>
                <p className="contact-form__note">
                  JavaScript is off. Please email{' '}
                  <a href={`mailto:${profile.email}`}>{profile.email}</a> directly.
                </p>
              </noscript>
            </form>
          </Reveal>
        </div>

        <Reveal className="contact__footer-note">
          <span className="contact__footer-mark" aria-hidden="true">✦</span>
          <p>Based in Ahmedabad, India — working wherever the problem is.</p>
          <a className="text-link" href={`mailto:${profile.email}`}>
            <span>{profile.email}</span>
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
