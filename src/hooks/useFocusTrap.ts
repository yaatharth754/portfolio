import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Keeps keyboard focus inside an overlay while it is open and returns focus
 * to the element that opened it when it closes.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  active: boolean,
  onEscape?: () => void
): RefObject<T | null> {
  const containerRef = useRef<T | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const escapeRef = useRef(onEscape);

  useEffect(() => {
    escapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!active) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const container = containerRef.current;

    const getFocusable = () =>
      container
        ? Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (element) =>
              element.offsetWidth > 0 ||
              element.offsetHeight > 0 ||
              element.getClientRects().length > 0
          )
        : [];

    const timer = window.setTimeout(() => {
      const focusable = getFocusable();
      focusable[0]?.focus();
    }, 30);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        escapeRef.current?.();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown);
      previousFocus.current?.focus?.();
    };
  }, [active]);

  return containerRef;
}
