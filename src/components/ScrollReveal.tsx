"use client";

import { useEffect } from "react";

/**
 * Mounts a single IntersectionObserver for every revealing element on the page,
 * so sections stay server-rendered and no component needs its own client
 * boundary just to animate in.
 *
 * Two behaviours share the observer: `[data-reveal]` settles content upward,
 * `[data-reveal-rule]` draws a hairline across from its left edge.
 *
 * Elements are unobserved once revealed — nothing animates back out on scroll-up,
 * which reads as jitter on long pages.
 */
export function ScrollReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-rule]",
    );

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      // Fires as soon as the element enters or nears the viewport
      { rootMargin: "60px 0px -2% 0px", threshold: 0.01 },
    );

    document.documentElement.classList.add("js-reveal");
    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, []);

  return null;
}
