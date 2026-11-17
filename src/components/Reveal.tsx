import { createElement } from 'react';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /* Kept so existing call sites stay untouched; content now renders immediately. */
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'article' | 'figure' | 'li';
};

/**
 * Section wrapper. It used to fade and rise in on scroll, but that made
 * content flicker into view. It now renders children at full opacity straight
 * away, with no observer and no entrance animation.
 */
export default function Reveal({ children, className, as = 'div' }: RevealProps) {
  return createElement(as, { className }, children);
}
