import { animate } from 'animejs';

/** A quick, springy acknowledgement on interactive artwork (anime.js). */
export function popElement(element: Element | null) {
  if (!element) return;
  animate(element, {
    scale: [1, 1.07, 1],
    duration: 560,
    ease: 'outElastic(1, 0.55)',
  });
}
