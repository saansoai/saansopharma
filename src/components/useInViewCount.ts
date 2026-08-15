"use client";

import { useEffect, useRef, useState } from "react";

/** Ease-out so the count decelerates into its final value instead of stopping dead. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a figure up from zero the first time it scrolls into view.
 *
 * Figures that are simply printed read as static text; figures that arrive read
 * as a live instrument, which is most of what makes the capacity cards feel
 * alive. Runs once per element and never counts back down.
 *
 * Honours `prefers-reduced-motion` by jumping straight to the final value, and
 * returns the final value immediately when `target` is null (a PENDING figure),
 * so callers can render a placeholder without special-casing the hook.
 */
export function useInViewCount<T extends HTMLElement = HTMLElement>(
  target: number | null,
  duration = 1600,
) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;

    const settle = () => setValue(target);

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      settle();
      return;
    }

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      setValue(target * easeOut(t));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  // Returned as a tuple rather than an object: an object with a `ref` property
  // reads to the react-hooks lint as a ref itself, and every `.value` access
  // then trips "cannot access refs during render".
  return [ref, value] as const;
}
