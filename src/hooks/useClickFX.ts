import { animate } from 'animejs';
import { useEffect } from 'react';

const CLICK_SELECTOR =
  'a[href], button:not([disabled]), [role="button"]:not([aria-disabled="true"])';

/**
 * anime.js click feedback: a neon ring + dot bloom from the pointer on any
 * interactive element (links, buttons, carousel dots). Purely decorative —
 * elements are appended to <body>, so no layout or stacking context changes.
 */
export function useClickFX() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest(CLICK_SELECTOR)) return;
      spawnClickFX(event.clientX, event.clientY);
    };

    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);
}

function spawnClickFX(x: number, y: number) {
  const ring = document.createElement('span');
  ring.className = 'anime-click-ring';
  ring.setAttribute('aria-hidden', 'true');
  ring.style.left = `${x - 32}px`;
  ring.style.top = `${y - 32}px`;
  document.body.appendChild(ring);

  const dot = document.createElement('span');
  dot.className = 'anime-click-dot';
  dot.setAttribute('aria-hidden', 'true');
  dot.style.left = `${x - 5}px`;
  dot.style.top = `${y - 5}px`;
  document.body.appendChild(dot);

  animate(ring, {
    scale: [0.3, 1],
    opacity: [0.85, 0],
    duration: 560,
    ease: 'outExpo',
    onComplete: () => ring.remove(),
  });

  animate(dot, {
    scale: [0.7, 2.2],
    opacity: [0.55, 0],
    duration: 420,
    ease: 'outQuad',
    onComplete: () => dot.remove(),
  });
}
