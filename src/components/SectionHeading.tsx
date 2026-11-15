import type { ReactNode } from 'react';
import Reveal from './Reveal';

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id: string;
  className?: string;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={['section-heading', className].filter(Boolean).join(' ')}>
      <div className="section-heading__rail" aria-hidden="true">
        <span className="section-heading__index">{index}</span>
        <span className="section-heading__rule" />
        <span className="section-heading__eyebrow">{eyebrow}</span>
      </div>
      <h2 className="section-heading__title" id={`${id}-heading`}>
        {title}
      </h2>
      {intro ? <p className="section-heading__intro">{intro}</p> : null}
    </Reveal>
  );
}
