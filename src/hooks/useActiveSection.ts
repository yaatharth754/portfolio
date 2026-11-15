import { useEffect, useState } from 'react';

/** Tracks which section currently owns the reading position. */
export function useActiveSection(ids: readonly string[], initial = 'home') {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.38;
      let current = elements[0].id;

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= marker) {
          current = element.id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (nearBottom) current = elements[elements.length - 1].id;

      setActive(current);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, {
      passive: true,
    });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('hashchange', requestUpdate);

    if (prefersReduced) {
      // The same listener works without motion; no extra behaviour needed.
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('hashchange', requestUpdate);
    };
  }, [ids]);

  return active;
}
