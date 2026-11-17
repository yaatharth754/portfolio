import { animate, onScroll } from 'animejs';
import { useEffect } from 'react';

/**
 * Scroll-linked depth parallax powered by anime.js `onScroll`.
 *
 * Any element with `data-depth="<factor>"` drifts vertically as the page
 * scrolls. Larger factors move further, so layered decoration gains depth as
 * the page scrolls. Add `data-depth-root` on an ancestor to tie a whole group
 * to one long scroll range (the hero uses this so its ambience keeps moving
 * from the first pixel of scroll). Purely decorative elements only.
 */
export function useScrollDepth() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-depth]'));
    const animations = elements.map((el) => {
      const depth = Number(el.dataset.depth) || 0;
      const root = el.closest<HTMLElement>('[data-depth-root]');
      const scoped = Boolean(root && root !== el);

      return animate(el, {
        y: [depth * 45, depth * -160],
        ease: 'linear',
        autoplay: onScroll({
          target: scoped ? root : el,
          enter: scoped ? 'top top' : 'bottom top',
          leave: 'top bottom',
          sync: 0.35,
        }),
      });
    });

    return () => animations.forEach((animation) => animation.revert());
  }, []);
}
