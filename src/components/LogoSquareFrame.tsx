import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import AngelLogo from './AngelLogo';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function LogoSquareFrame() {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType === 'touch') return;
    const element = frameRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    element.style.setProperty('--px', x.toFixed(3));
    element.style.setProperty('--py', y.toFixed(3));
  };

  const onPointerLeave = () => {
    frameRef.current?.style.setProperty('--px', '0');
    frameRef.current?.style.setProperty('--py', '0');
  };

  return (
    <figure className="logo-frame">
      <div
        className="logo-frame__inner"
        ref={frameRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <span className="logo-frame__tick logo-frame__tick--tl" aria-hidden="true" />
        <span className="logo-frame__tick logo-frame__tick--tr" aria-hidden="true" />
        <span className="logo-frame__tick logo-frame__tick--bl" aria-hidden="true" />
        <span className="logo-frame__tick logo-frame__tick--br" aria-hidden="true" />

        <div className="logo-frame__label" aria-hidden="true">
          <span>INSIGNIA / Y</span>
          <span>EST. MMXXVI</span>
        </div>

        <div className="logo-frame__art">
          <span className="logo-frame__halo" aria-hidden="true" />
          <AngelLogo
            variant="full"
            className="logo-frame__logo"
            title="Yaatharth Bawankar glass Y logo with glowing dark blue halo"
          />
          <span className="logo-frame__dot" aria-hidden="true" />
          <span className="logo-frame__pink-line" aria-hidden="true" />
        </div>

        <div className="logo-frame__base" aria-hidden="true">
          <span>HALO · GLASS · MOTION</span>
          <span>f/01</span>
        </div>
      </div>

      <figcaption className="logo-frame__caption">
        <span className="logo-frame__caption-mark" aria-hidden="true" />
        A personal insignia, built in layers: a fixed frame, a living centre.
      </figcaption>
    </figure>
  );
}
