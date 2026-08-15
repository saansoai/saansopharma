"use client";

import Image from "next/image";
import { useRef } from "react";

const scaleStats = [
  {
    value: "60M+",
    label: "Units produced every year",
    desc: "Across five production lines.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9m4 0V7m0 0h-4m4 0H9" />
      </svg>
    ),
  },
  {
    value: "300+",
    label: "Products",
    desc: "Across four fill-finish formats.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    value: "10,000+",
    label: "Healthcare professionals",
    desc: "Prescribing Saanso across India.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    value: "8+",
    label: "Operational states",
    desc: "Taking medicines closer to patients.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function About() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const distance = 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 via-white/80 to-sky-100/40 py-12 lg:py-16 border-b border-sky-100/80">
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        
        {/* ---- TOP BLOCK: WHO WE ARE (Compact 2-Column) ---- */}
        <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-2xl border border-sky-200/70 p-6 sm:p-8 lg:p-10 shadow-xl shadow-sky-900/5">
          <div className="grid gap-6 lg:gap-10 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Eyebrow + Headline + Subtitle */}
            <div className="lg:col-span-6 z-10" data-reveal>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-6 bg-brand-600 rounded-full"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                  WHO WE ARE
                </span>
              </div>

              <h2 className="mt-4 font-display text-2xl sm:text-4xl lg:text-5xl font-normal text-ink-950 tracking-tight leading-[1.1]">
                Named after <em className="italic text-brand-600 font-serif font-normal">oxygen</em> — the breath that sustains us.
              </h2>

              <p className="mt-4 text-sm lg:text-base text-ink-700 leading-relaxed font-medium max-w-lg">
                Healthcare becomes meaningful when it reaches the person who needs it. That simple idea has shaped Saanso since 2017.
              </p>
            </div>

            {/* Right Column: 2x2 Points & Quality Callout */}
            <div className="lg:col-span-6 z-10 border-t lg:border-t-0 lg:border-l border-sky-200/80 pt-5 lg:pt-0 pl-0 lg:pl-8 space-y-3 lg:space-y-4" data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-ink-800 leading-relaxed font-sans">
                <div className="rounded-xl bg-sky-50/70 p-3.5 border border-sky-100">
                  <span className="font-bold text-brand-600 block mb-1">Our Mission</span>
                  Making high-quality generic medicines and inhalers accessible without high price barriers.
                </div>
                <div className="rounded-xl bg-sky-50/70 p-3.5 border border-sky-100">
                  <span className="font-bold text-brand-600 block mb-1">Our Facility</span>
                  Built in Eluru, Andhra Pradesh with state-of-the-art sterile manufacturing.
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between bg-brand-50/60 p-3.5 rounded-xl border border-brand-100">
                <p className="font-sans text-xs sm:text-sm font-bold text-brand-700 leading-snug">
                  Quality shouldn&apos;t be a privilege. It should be the standard.
                </p>
                <span className="h-2 w-2 rounded-full bg-brand-500 shrink-0 ml-2" />
              </div>
            </div>

          </div>

          {/* Conveyor Image Background Overlay on Right Side */}
          <div className="absolute top-0 right-0 bottom-0 w-1/2 hidden lg:block opacity-15 pointer-events-none">
            <Image
              src="/images/conveyor.png"
              alt="Automated pharmaceutical conveyor line"
              fill
              sizes="50vw"
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>
        </div>

        {/* ---- BOTTOM BLOCK: OUR SCALE OF CARE (SIDE-BY-SIDE MOVING CARDS) ---- */}
        <div className="mt-8 rounded-3xl bg-white/90 backdrop-blur-2xl border border-sky-200/70 p-5 sm:p-6 lg:p-8 shadow-xl shadow-sky-900/5" data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
          
          {/* Header with Navigation Controls */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 bg-brand-600 rounded-full"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                OUR SCALE OF CARE
              </span>
            </div>

            {/* Side-by-side Scroll Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous stat"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-200 bg-white text-ink-800 shadow-sm transition-all hover:bg-sky-50 active:scale-95"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
                  <path d="M10 12L4 8l6-4v8z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next stat"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-200 bg-white text-ink-800 shadow-sm transition-all hover:bg-sky-50 active:scale-95"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
                  <path d="M6 4l6 4-6 4V4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Side-by-side moving cards container (Horizontal snapping slider) */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pt-1 px-1 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {scaleStats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex min-w-[240px] sm:min-w-[260px] lg:min-w-[280px] flex-1 shrink-0 snap-start flex-col items-start rounded-2xl border border-sky-100 bg-gradient-to-b from-sky-50/70 to-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-sky-200/80 shadow-sm">
                  {stat.icon}
                </div>

                <span className="numeric mt-4 font-display text-3xl sm:text-4xl font-normal text-ink-950 font-serif">
                  {stat.value}
                </span>

                <span className="mt-2 text-xs sm:text-sm font-bold text-ink-900 leading-tight">
                  {stat.label}
                </span>

                <p className="mt-1 text-xs text-slate-500 font-medium leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
