"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer companion.
 *
 * A single hairline reticle that trails the cursor with a little lag — the
 * same 1px stroke the rest of the page is ruled with, so it reads as an
 * instrument rather than as a glow following the mouse.
 *
 * It runs entirely off a ref and a rAF loop: no state, so moving the pointer
 * never re-renders the React tree, and the loop stops the moment the pointer
 * leaves the window.
 */
export function PowderCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Touch and stylus pointers have no hover state to decorate, and anyone
    // who has asked for less motion should not be given a trailing element.
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ring = ringRef.current;
    if (!ring) return;

    let targetX = -100;
    let targetY = -100;
    let x = targetX;
    let y = targetY;
    let frame = 0;
    let seen = false;

    const render = () => {
      // Critically damped follow — close enough to keep up, loose enough to
      // read as a considered movement rather than a cursor replacement.
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!seen) {
        seen = true;
        // Land it under the pointer rather than sliding in from the corner.
        x = targetX;
        y = targetY;
        ring.style.opacity = "1";
        frame = requestAnimationFrame(render);
      }
    };

    const onLeave = () => {
      ring.style.opacity = "0";
    };

    const onEnter = () => {
      if (seen) ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-9999 hidden opacity-0 transition-opacity duration-500 lg:block"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div className="h-8 w-8 rounded-full border border-brand-600/30" />
    </div>
  );
}
