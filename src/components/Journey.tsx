"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { company, milestones } from "@/content/site";

const START_YEAR = milestones[0].year;
const END_YEAR = company.visionYear;
const SPAN = END_YEAR - START_YEAR;

const RING_R = 34;
const RING_C = 2 * Math.PI * RING_R;

/** Where a given year sits along the run, 0–100. */
const positionOf = (year: number) => ((year - START_YEAR) / SPAN) * 100;

/**
 * The roadmap.
 *
 * Rebuilt as a climb rather than a flat rail. The old horizontal timeline put
 * eight years across the page and left the detail to a panel underneath, which
 * meant seven of the eight milestones were invisible at any moment — the shape
 * of the journey never actually appeared.
 *
 * Now every milestone is present at once down a central spine, and the spine
 * fills as you scroll past them: the page itself walks 2017 to 2030. Reached
 * milestones are solid, the two ahead are dashed and hollow, and the dial in
 * the masthead reports how much of the run is behind us.
 */
export function Journey() {
  const [reached, setReached] = useState(-1);
  const [armed, setArmed] = useState(false);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  const nowIndex = useMemo(
    () => milestones.reduce((acc, m, i) => (m.status === "past" ? i : acc), 0),
    [],
  );

  const percentComplete = Math.round(positionOf(milestones[nowIndex].year));

  const setItemRef = useCallback(
    (i: number) => (el: HTMLLIElement | null) => {
      itemRefs.current[i] = el;
    },
    [],
  );

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") {
      setReached(milestones.length - 1);
      setArmed(true);
      return;
    }

    // A milestone counts as reached once it crosses the middle of the screen,
    // so the spine fills in step with reading rather than running ahead.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = nodes.indexOf(entry.target as HTMLLIElement);
          if (i >= 0) setReached((prev) => Math.max(prev, i));
        }
      },
      { rootMargin: "0px 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setArmed(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Fill to just past the last milestone reached.
  const fill =
    reached < 0 ? 0 : ((reached + 0.5) / milestones.length) * 100;
  const dial = armed ? percentComplete : 0;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="wash relative overflow-hidden border-y border-rule"
    >
      <div className="relative mx-auto max-w-[88rem] px-6 py-20 lg:px-10 lg:py-28">
        {/* ---- Masthead ---- */}
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal>
              Roadmap to {END_YEAR}
            </p>
            <h2
              className="mt-7 max-w-2xl font-display text-title font-normal text-balance text-ink-950"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              A vision with a date on it.
            </h2>
            <p
              className="mt-6 max-w-xl text-[1rem] leading-relaxed font-medium text-ink-800"
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
            >
              {company.ambition} Here is our chronological progression toward
              health equity.
            </p>
          </div>

          <div
            className="flex items-center gap-6 lg:col-span-4 lg:col-start-9 lg:justify-end"
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            <div className="relative h-24 w-24 shrink-0">
              <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r={RING_R}
                  fill="none"
                  stroke="var(--color-powder-200)"
                  strokeWidth="3"
                />
                <circle
                  cx="40"
                  cy="40"
                  r={RING_R}
                  fill="none"
                  stroke="var(--color-accent-500)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={RING_C - (RING_C * dial) / 100}
                  className="transition-[stroke-dashoffset] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </svg>
              <span className="numeric absolute inset-0 flex items-center justify-center text-xl font-bold tracking-[-0.02em] text-ink-950">
                {dial}%
              </span>
            </div>

            <div className="lg:text-right">
              <p className="spec-label">Distance covered</p>
              <p className="numeric mt-2 text-sm font-semibold text-ink-800">
                {START_YEAR} → {END_YEAR}
              </p>
            </div>
          </div>
        </div>

        {/* ---- The climb ---- */}
        <ol className="relative mt-16 lg:mt-20">
          {/* Spine. Sits hard left on a phone and down the centre from lg. */}
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[7px] w-0.5 rounded-full bg-powder-200 lg:left-1/2 lg:-translate-x-1/2"
          />
          <span
            aria-hidden="true"
            className="absolute top-0 left-[7px] w-0.5 rounded-full bg-accent-500 transition-[height] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:left-1/2 lg:-translate-x-1/2"
            style={{ height: `${fill}%` }}
          />

          {milestones.map((m, i) => {
            const isReached = i <= reached;
            const isFuture = m.status === "future";
            const onRight = i % 2 === 1;

            return (
              <li
                key={m.year}
                ref={setItemRef(i)}
                className="relative pb-10 pl-10 last:pb-0 lg:pl-0"
              >
                {/* Node */}
                <span
                  aria-hidden="true"
                  className={`absolute top-7 left-0 z-10 block h-4 w-4 rounded-full border-2 transition-all duration-500 ease-[cubic-bezier(0.22,1.2,0.36,1)] lg:left-1/2 lg:-translate-x-1/2 ${
                    isReached
                      ? "scale-110 border-accent-500 bg-accent-500 shadow-[0_0_0_5px_rgba(13,157,210,0.16)]"
                      : isFuture
                        ? "border-dashed border-powder-400 bg-powder-50"
                        : "border-powder-300 bg-white"
                  }`}
                />

                <div
                  className={`lg:grid lg:grid-cols-2 lg:gap-x-16 ${
                    onRight ? "" : "lg:[&>*]:col-start-1"
                  }`}
                >
                  <article
                    className={`tilt-card group rounded-2xl border-2 bg-white p-6 transition-all duration-500 lg:p-7 ${
                      isFuture
                        ? "border-dashed border-powder-300"
                        : "border-powder-200"
                    } ${onRight ? "lg:col-start-2" : "lg:col-start-1 lg:text-right"} ${
                      isReached ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    <div
                      className={`flex items-baseline gap-4 ${
                        onRight ? "" : "lg:justify-end"
                      }`}
                    >
                      <span className="numeric font-display text-[clamp(2.25rem,3.4vw,3rem)] leading-none tracking-[-0.04em] text-ink-950 transition-colors duration-400 group-hover:text-accent-600">
                        {m.year}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.12em] uppercase ${
                          isFuture
                            ? "bg-powder-100 text-ink-700"
                            : "bg-accent-100 text-accent-700"
                        }`}
                      >
                        {isFuture ? "Ahead" : "Done"}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg leading-snug font-bold text-ink-950 lg:text-xl">
                      {m.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-800">
                      {m.detail}
                    </p>
                  </article>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
