import { useEffect, useId, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * The only video on the site. It is visible exclusively through the counter
 * of the name, never as a background. If playback is unavailable, a deep-blue
 * celestial gradient remains inside the letterforms.
 */
export default function VideoTypography() {
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'loading' | 'playing' | 'fallback'>('loading');
  const reduce = usePrefersReducedMotion();
  const rawId = useId();
  const id = `name-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  useEffect(() => {
    const video = videoRef.current;
    const figure = figureRef.current;
    if (!video || !figure || reduce) return;

    video.muted = true;

    const play = () => {
      if (!figure.isConnected) return;
      const attempt = video.play();
      if (attempt) {
        attempt
          .then(() => setState('playing'))
          .catch(() => {
            // Autoplay can be blocked by a low-power mode; the gradient fallback
            // still keeps the name legible.
            setState('fallback');
          });
      }
    };

    // Do not download the film until the name is near the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.preload = 'auto';
            play();
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: '240px 0px', threshold: 0.12 }
    );

    observer.observe(figure);
    video.addEventListener('canplay', play);
    video.addEventListener('loadeddata', play);

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', play);
      video.removeEventListener('loadeddata', play);
      video.pause();
    };
  }, [reduce]);

  return (
    <figure className="video-type" data-state={reduce ? 'fallback' : state} ref={figureRef}>
      <div className="video-type__topline" aria-hidden="true">
        <span>THE NAME</span>
        <span>MOTION STUDY / 01</span>
      </div>

      <div className="video-type__frame">
        <div className="video-type__media" aria-hidden="true">
          {!reduce ? (
            <video
              ref={videoRef}
              className="video-type__video"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              onCanPlay={() => setState((current) => (current === 'loading' ? 'playing' : current))}
              onError={() => setState('fallback')}
            >
              <source src="/media/yaatharth-scene.mp4" type="video/mp4" />
            </video>
          ) : null}
          <span className="video-type__fallback" aria-hidden="true" />
          <span className="video-type__grain" aria-hidden="true" />
        </div>

        <svg
          className="video-type__mask"
          viewBox="0 0 1000 260"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <mask id={`${id}-mask`} maskUnits="userSpaceOnUse">
              <rect width="1000" height="260" fill="#ffffff" />
              <text
                x="500"
                y="217"
                textAnchor="middle"
                textLength="954"
                lengthAdjust="spacingAndGlyphs"
                className="video-type__mask-text"
              >
                YAATHARTH
              </text>
            </mask>
            <linearGradient id={`${id}-scrim`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0a0a0b" stopOpacity="0.06" />
              <stop offset="0.62" stopColor="#0a0a0b" stopOpacity="0.12" />
              <stop offset="1" stopColor="#0a0a0b" stopOpacity="0.52" />
            </linearGradient>
          </defs>

          <rect width="1000" height="260" fill="#0a0a0b" mask={`url(#${id}-mask)`} />
          <rect
            width="1000"
            height="260"
            fill={`url(#${id}-scrim)`}
            mask={`url(#${id}-mask)`}
          />
          <text
            x="500"
            y="217"
            textAnchor="middle"
            textLength="954"
            lengthAdjust="spacingAndGlyphs"
            className="video-type__outline"
          >
            YAATHARTH
          </text>
        </svg>

        <span className="video-type__corner video-type__corner--tl" aria-hidden="true" />
        <span className="video-type__corner video-type__corner--tr" aria-hidden="true" />
        <span className="video-type__corner video-type__corner--bl" aria-hidden="true" />
        <span className="video-type__corner video-type__corner--br" aria-hidden="true" />
      </div>

      <figcaption className="video-type__caption">
        <span>OUTSIDE THE FRAME, EVERYTHING IS STILL.</span>
        <span className="video-type__caption-rule" aria-hidden="true" />
        <span>YAATHARTH</span>
      </figcaption>
      <span className="sr-only">
        Yaatharth. An original animated night scene plays inside the letters of the name.
      </span>
    </figure>
  );
}
