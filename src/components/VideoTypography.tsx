import { animate } from 'animejs';
import { useEffect, useId, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { popElement } from '../lib/motion';

const DUST_COUNT = 52;
/** Half the frame's perimeter: both trace paths meet exactly at its end. */
const TRACE_LENGTH = 1256;

/**
 * The only video on the site. It is visible exclusively through the counter
 * of the name, never as a background. If playback is unavailable, a deep-blue
 * celestial gradient remains inside the letterforms.
 */
export default function VideoTypography() {
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dustRef = useRef<HTMLSpanElement>(null);
  const traceRef = useRef<SVGSVGElement>(null);
  const traceAnimations = useRef<Array<{ cancel: () => void }>>([]);
  const [state, setState] = useState<'loading' | 'playing' | 'fallback'>('loading');
  const [bare, setBare] = useState(false);
  const reduce = usePrefersReducedMotion();
  const rawId = useId();
  const id = `name-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  /** Cyan motes that pour off the frame's borders on every toggle. */
  const spawnDust = () => {
    const layer = dustRef.current;
    if (!layer || reduce) return;

    for (let i = 0; i < DUST_COUNT; i += 1) {
      const mote = document.createElement('span');
      const size = 2.6 + Math.random() * 3.6;
      mote.className = 'video-type__mote';
      mote.style.width = `${size.toFixed(1)}px`;
      mote.style.height = `${(size * (1.5 + Math.random() * 1.7)).toFixed(1)}px`;

      // Emit from the frame itself: most from the bottom border (dense around
      // the point where the two traces meet), the rest from the lower sides.
      const roll = Math.random();
      if (roll < 0.14) {
        mote.style.left = `${0.3 + Math.random() * 1.1}%`;
        mote.style.top = `${45 + Math.random() * 50}%`;
      } else if (roll < 0.28) {
        mote.style.left = `${98.6 + Math.random() * 1.1}%`;
        mote.style.top = `${45 + Math.random() * 50}%`;
      } else {
        const bias = (Math.random() + Math.random() + Math.random()) / 3;
        mote.style.left = `${4 + bias * 92}%`;
        mote.style.top = `${99.2 + Math.random() * 0.8}%`;
      }

      layer.appendChild(mote);

      animate(mote, {
        y: [0, 90 + Math.random() * 130],
        x: [(Math.random() - 0.5) * 22, (Math.random() - 0.5) * 70],
        opacity: [0, 1, 0],
        scale: [1, 0.35],
        duration: 1200 + Math.random() * 1000,
        delay: Math.random() * 380,
        ease: 'outQuad',
        onComplete: () => mote.remove(),
      });
    }
  };

  /**
   * Two neon traces race from the centre of the top border in opposite
   * directions along the frame perimeter. They meet at the centre of the
   * bottom border, and that is when the dust is released.
   */
  const runBorderTrace = () => {
    const svg = traceRef.current;
    if (!svg || reduce) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>('.video-type__trace-path'));
    if (paths.length < 2) return;

    traceAnimations.current.forEach((animation) => animation.cancel());
    traceAnimations.current = [];

    paths.forEach((path) => {
      path.style.opacity = '1';
      path.style.strokeDasharray = `${TRACE_LENGTH}`;
      path.style.strokeDashoffset = `${TRACE_LENGTH}`;
    });

    const run = (path: SVGPathElement, onComplete?: () => void) =>
      animate(path, {
        strokeDashoffset: [TRACE_LENGTH, 0],
        duration: 1000,
        ease: 'inOutSine',
        onComplete,
      });

    traceAnimations.current.push(
      run(paths[0], () => {
        spawnDust();
        // Hold the meeting glow for a beat, then clear the traced perimeter.
        paths.forEach((path) => {
          traceAnimations.current.push(
            animate(path, {
              opacity: [1, 0],
              duration: 560,
              delay: 520,
              ease: 'outQuad',
              onComplete: () => {
                path.style.opacity = '';
                path.style.strokeDashoffset = `${TRACE_LENGTH}`;
              },
            }),
          );
        });
      }),
      run(paths[1]),
    );
  };

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
    <figure
      className="video-type"
      data-state={reduce ? 'fallback' : state}
      data-bare={bare ? 'true' : undefined}
      ref={figureRef}
      role="button"
      tabIndex={0}
      aria-pressed={bare}
      aria-label="Toggle the full-screen motion behind the name"
      onClick={(event) => {
        popElement(event.currentTarget.querySelector('.video-type__frame'));
        runBorderTrace();
        setBare((current) => !current);
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        popElement(event.currentTarget.querySelector('.video-type__frame'));
        runBorderTrace();
        setBare((current) => !current);
      }}
    >
      <div className="video-type__topline" aria-hidden="true">
        <span>THE NAME</span>
        <span>MOTION STUDY / 01</span>
      </div>

      <div className="video-type__stage">
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

            <rect
              className="video-type__screen"
              width="1000"
              height="260"
              fill="#0a0a0b"
              mask={`url(#${id}-mask)`}
            />
            <rect
              className="video-type__screen-scrim"
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

          <svg
            className="video-type__trace"
            viewBox="0 0 1000 260"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            focusable="false"
            ref={traceRef}
          >
            <path
              className="video-type__trace-path video-type__trace-path--cw"
              d="M 500 1.2 H 998.8 V 258.8 H 500"
            />
            <path
              className="video-type__trace-path video-type__trace-path--ccw"
              d="M 500 1.2 H 1.2 V 258.8 H 500"
            />
          </svg>

          <span className="video-type__corner video-type__corner--tl" aria-hidden="true" />
          <span className="video-type__corner video-type__corner--tr" aria-hidden="true" />
          <span className="video-type__corner video-type__corner--bl" aria-hidden="true" />
          <span className="video-type__corner video-type__corner--br" aria-hidden="true" />
        </div>

        <span className="video-type__dust" ref={dustRef} aria-hidden="true" />
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
