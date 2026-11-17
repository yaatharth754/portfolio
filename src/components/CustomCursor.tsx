import { animate } from 'animejs';
import { useEffect } from 'react';

/**
 * A neon pointer: a hot pink core, a spinning pink/blue/cyan ring, and a soft
 * colour bloom that follows with a little lag. anime.js drives the hover and
 * press states; the trailing follow is a light rAF interpolation. Desktop
 * (fine pointer) only, and never with reduced motion.
 */
export default function CustomCursor() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.classList.add('cursor-fx-on');

    const aura = document.createElement('div');
    aura.className = 'cursor-fx__aura';
    aura.setAttribute('aria-hidden', 'true');

    const dot = document.createElement('div');
    dot.className = 'cursor-fx__dot';
    dot.setAttribute('aria-hidden', 'true');

    const ring = document.createElement('div');
    ring.className = 'cursor-fx__ring';
    ring.setAttribute('aria-hidden', 'true');

    document.body.append(aura, ring, dot);

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let auraX = pointerX;
    let auraY = pointerY;
    let hovering = false;
    let overFrame = false;
    let frame = 0;

    const place = () => {
      dot.style.translate = `${pointerX - 3.5}px ${pointerY - 3.5}px`;
      ring.style.translate = `${ringX - 21}px ${ringY - 21}px`;
      aura.style.translate = `${auraX - 60}px ${auraY - 60}px`;
    };

    const tick = () => {
      ringX += (pointerX - ringX) * 0.18;
      ringY += (pointerY - ringY) * 0.18;
      auraX += (pointerX - auraX) * 0.1;
      auraY += (pointerY - auraY) * 0.1;
      place();
      frame = window.requestAnimationFrame(tick);
    };

    /** Small, haze-free pointer over the motion frame; neon elsewhere. */
    const applyState = () => {
      animate(ring, {
        scale: overFrame ? 0.45 : hovering ? 1.75 : 1,
        opacity: overFrame ? 0.6 : hovering ? 1 : 0.9,
        duration: 300,
        ease: 'outQuad',
      });
      animate(dot, {
        scale: overFrame ? 0.55 : hovering ? 0.35 : 1,
        opacity: overFrame ? 0.75 : 1,
        duration: 300,
        ease: 'outQuad',
      });
      animate(aura, {
        scale: overFrame ? 0.3 : hovering ? 1.5 : 1,
        opacity: overFrame ? 0 : hovering ? 0.85 : 0.55,
        duration: 320,
        ease: 'outQuad',
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) {
        ringX = pointerX;
        ringY = pointerY;
        auraX = pointerX;
        auraY = pointerY;
        place();
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = Boolean(
        target.closest('a[href], button, [role="button"], input, textarea, select, .carousel-dot'),
      );
      const inFrame = Boolean(target.closest('.video-type__frame'));
      if (interactive === hovering && inFrame === overFrame) return;
      hovering = interactive;
      overFrame = inFrame;
      root.classList.toggle('cursor-fx--quiet', overFrame);
      applyState();
    };

    const onPointerDown = () => {
      animate(ring, {
        scale: overFrame ? 0.36 : hovering ? 1.4 : 0.85,
        duration: 160,
        ease: 'outQuad',
      });
      animate(aura, {
        scale: overFrame ? 0.2 : hovering ? 1.2 : 0.8,
        duration: 160,
        ease: 'outQuad',
      });
    };

    const onPointerUp = () => {
      applyState();
    };

    const hide = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      aura.style.opacity = '0';
    };

    const show = () => {
      applyState();
    };

    place();
    frame = window.requestAnimationFrame(tick);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      root.classList.remove('cursor-fx-on');
      root.classList.remove('cursor-fx--quiet');
      aura.remove();
      ring.remove();
      dot.remove();
    };
  }, []);

  return null;
}
