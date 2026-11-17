import { useMotionValueEvent } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const ENTRY = '.timeline-entry, .education-entry';
const MARKER = '.timeline-entry__marker, .education-entry__marker';
/** The progress rail starts 6px below the timeline top (see .timeline-rail). */
const RAIL_TOP = 6;

/**
 * Lights each timeline diamond as the scroll-linked progress rail reaches it.
 * The rail grows from `RAIL_TOP` to the timeline's bottom, so a marker lights
 * once the spring-smoothed progress passes its position along that span.
 */
export function useTimelineLight(
  containerRef: RefObject<HTMLElement | null>,
  progress: MotionValue<number>,
  reduce: boolean,
) {
  const items = useRef<Array<{ node: HTMLElement; threshold: number }>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const span = Math.max(container.offsetHeight - RAIL_TOP, 1);
      items.current = Array.from(container.querySelectorAll<HTMLElement>(ENTRY)).map((node) => {
        const marker = node.querySelector<HTMLElement>(MARKER);
        const centre = node.offsetTop + (marker ? marker.offsetTop + marker.offsetHeight / 2 : 0);
        return { node, threshold: (centre - RAIL_TOP) / span };
      });
      if (reduce) items.current.forEach(({ node }) => node.classList.add('is-lit'));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [containerRef, reduce]);

  const apply = (value: number) => {
    if (reduce) return;
    items.current.forEach(({ node, threshold }) => {
      node.classList.toggle('is-lit', value >= threshold);
    });
  };

  useMotionValueEvent(progress, 'change', apply);

  useEffect(() => {
    apply(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, reduce]);
}
