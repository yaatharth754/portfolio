import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AngelLogo from './AngelLogo';

type LoadingScreenProps = {
  onComplete: () => void;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setProgress(100);
      const timer = window.setTimeout(() => completeRef.current(), 220);
      return () => window.clearTimeout(timer);
    }

    const started = performance.now();
    const duration = 900;
    let frame = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      const elapsed = now - started;
      const linear = Math.min(elapsed / duration, 1);
      // Ease out, but never pretend to finish before the mark has assembled.
      const eased = 1 - Math.pow(1 - linear, 2.4);
      setProgress(Math.round(eased * 100));

      if (linear < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        exitTimer = window.setTimeout(() => completeRef.current(), 180);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
    };
  }, []);

  return (
    <motion.div
      className="loading-screen"
      initial={false}
      exit={{ opacity: 0, filter: reduce ? 'none' : 'blur(8px)' }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
      aria-label="Loading Yaatharth Bawankar's portfolio"
    >
      <div className="loading-screen__chart" aria-hidden="true">
        <span className="loading-screen__ring" />
        <span className="loading-screen__line loading-screen__line--h" />
        <span className="loading-screen__line loading-screen__line--v" />
      </div>

      <div className="loading-screen__mark">
        <AngelLogo variant="loading" className="loading-screen__logo" title="Yaatharth Bawankar glass Y mark" />
      </div>

      <div className="loading-screen__footer">
        <div className="loading-screen__identity">
          <span className="loading-screen__name">YAATHARTH BAWANKAR</span>
          <span className="loading-screen__role">AI · ML · DATA SCIENCE</span>
        </div>
        <div className="loading-screen__meter">
          <span className="loading-screen__meter-label">
            {progress.toString().padStart(3, '0')}
          </span>
          <span className="loading-screen__track" aria-hidden="true">
            <span className="loading-screen__fill" style={{ transform: `scaleX(${progress / 100})` }} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
