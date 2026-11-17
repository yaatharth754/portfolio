import { animate } from 'animejs';
import { createElement, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'article' | 'figure' | 'li';
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A restrained, reusable scroll reveal powered by anime.js.
 * The element starts slightly offset and fades/rises in once it enters view.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [reduce] = useState(prefersReducedMotion);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setRevealed(true);

        animate(el, {
          opacity: [0, 1],
          y: [y, 0],
          duration: 900,
          delay: delay * 1000,
          ease: 'outCubic',
          onComplete: () => {
            /* Hand styling back to CSS so hover transforms keep working. */
            el.style.removeProperty('opacity');
            el.style.removeProperty('translate');
            el.style.removeProperty('transform');
          },
        });
      },
      { rootMargin: '-10% 0px -8% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, reduce, y]);

  return createElement(
    as,
    {
      ref,
      className,
      style: reduce || revealed ? undefined : { opacity: 0, translate: `0 ${y}px` },
    },
    children,
  );
}
