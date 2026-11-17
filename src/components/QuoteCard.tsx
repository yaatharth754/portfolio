import { animate } from 'animejs';
import { useEffect, useRef, useState } from 'react';
import { QUOTE_EVENT } from '../lib/quote';
import type { QuoteEventDetail } from '../lib/quote';

const QUOTE_TEXT =
  'HE WHO LAUGHS IN THE FACE OF DANGER, FINDS HIMSELF THE VICTOR IN THE END';
const VISIBLE_MS = 8000;
const GAP = 18;
/* The anchor keeps the percentage transform; anime animates the inner card. */

/**
 * The field-note card. Opened by the Y mark or the YAATHARTH frame, animated
 * with anime.js, and dismissed automatically after five seconds.
 */
export default function QuoteCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [point, setPoint] = useState<QuoteEventDetail>({ x: 0, y: 0 });

  useEffect(() => {
    const onQuote = (event: Event) => {
      const detail = (event as CustomEvent<QuoteEventDetail>).detail;
      setPoint(
        detail && Number.isFinite(detail.x)
          ? detail
          : { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      );
      setVisible(true);
    };

    window.addEventListener(QUOTE_EVENT, onQuote);
    return () => window.removeEventListener(QUOTE_EVENT, onQuote);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const card = cardRef.current;
    if (!card) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hideNow = () => setVisible(false);

    if (!reduce) {
      animate(card, {
        opacity: [0, 1],
        scale: [0.9, 1],
        y: [10, 0],
        duration: 560,
        ease: 'outExpo',
      });
      const bar = barRef.current;
      if (bar) {
        animate(bar, { scaleX: [1, 0], duration: VISIBLE_MS, ease: 'linear' });
      }
    } else {
      card.style.opacity = '1';
    }

    timerRef.current = window.setTimeout(() => {
      if (reduce) {
        hideNow();
        return;
      }
      animate(card, {
        opacity: [1, 0],
        scale: [1, 0.96],
        y: [0, -6],
        duration: 320,
        ease: 'inQuad',
        onComplete: hideNow,
      });
    }, VISIBLE_MS);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [visible, point]);

  if (!visible) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const above = point.y > vh - 250;
  const left = Math.min(Math.max(point.x, 196), vw - 196);
  const top = above ? point.y - GAP : point.y + GAP;

  return (
    <div
      className="quote-card-anchor"
      style={{
        left,
        top,
        transform: above ? 'translate(-50%, -100%)' : 'translateX(-50%)',
      }}
    >
      <div ref={cardRef} className="quote-card" role="status" aria-live="polite">
        <span className="quote-card__eyebrow">
          <span className="quote-card__spark" aria-hidden="true" />
          Y / FIELD NOTE
        </span>
        <p className="quote-card__text">{QUOTE_TEXT}</p>
        <span className="quote-card__timer" aria-hidden="true">
          <span className="quote-card__timer-fill" ref={barRef} />
        </span>
      </div>
    </div>
  );
}
