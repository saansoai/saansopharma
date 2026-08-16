import Image from "next/image";
import {
  faqSchema,
  formatsListSchema,
  graph,
  insightsListSchema,
} from "@/content/schema";
import { JsonLd } from "@/components/JsonLd";

/**
 * Structured data scoped to the homepage.
 *
 * It is mounted here rather than in `page.tsx` because the hero is the one
 * component that renders on the homepage and nowhere else — the root layout
 * carries the site-wide graph, and an `FAQPage` node has no business appearing
 * on an article. Nothing here renders: `JsonLd` emits a script tag only.
 */
const homeGraph = graph(faqSchema, formatsListSchema, insightsListSchema);

/**
 * Full-bleed hero.
 *
 * `hero-plant.jpg` is the finished architectural plate — building, sky, clouds
 * and lawn already in one frame — so it runs edge to edge as the background and
 * the headline sits over the open sky at the left. Nothing is composited here:
 * the earlier gradient-sky treatment could not survive the render's flat white
 * ground, and the plate has real clouds and a real tree line anyway.
 *
 * The focal point is pinned right-of-centre so the building stays in frame and
 * the left third stays open for the type as the viewport narrows.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-gradient-to-b from-brand-100 via-sky-50 to-white lg:bg-brand-100"
    >
      <JsonLd data={homeGraph} />

      {/* Desktop edge-to-edge background plate */}
      <div className="absolute inset-0 -z-10 hidden lg:block">
        <Image
          src="/images/hero-plant.png"
          alt="The Saanso Pharma manufacturing facility at Eluru, Andhra Pradesh"
          fill
          priority
          sizes="100vw"
          quality={92}
          className="animate-[facilityRise_1.6s_cubic-bezier(0.16,1,0.3,1)_both] object-cover object-[60%_center]"
        />

        {/* Desktop Legibility scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(96deg, rgba(236,246,252,0.52) 0%, rgba(232,243,251,0.38) 20%, rgba(226,240,249,0.2) 34%, transparent 48%)",
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative mx-auto flex w-full max-w-[88rem] flex-1 flex-col justify-start px-4 pt-20 pb-10 sm:px-6 sm:pt-24 lg:justify-center lg:px-10 lg:pt-36 lg:pb-16">
        
        {/* ================= MOBILE VIEW (Unified Grounded Architecture) ================= */}
        <div className="flex flex-col w-full max-w-xl mx-auto lg:hidden">
          
          {/* 1. Plant Image Showcase Card with Integrated Location Chip */}
          <div className="relative w-full overflow-hidden rounded-3xl border border-sky-200/90 bg-white p-2 shadow-xl shadow-sky-950/10 ring-1 ring-sky-100">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-sky-100">
              <Image
                src="/images/hero-plant.png"
                alt="The Saanso Pharma manufacturing facility at Eluru, Andhra Pradesh"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40rem"
                quality={95}
                className="object-cover object-center"
              />
              
              {/* Floating Pill on Image */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[0.6875rem] font-bold text-ink-950 shadow-sm border border-white/60">
                <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
                <span>Eluru, AP · Operational</span>
              </div>
            </div>
          </div>

          {/* 2. Grounded Content Panel (Connected right below the plant) */}
          <div className="mt-3.5 w-full rounded-3xl border border-sky-200/80 bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-xl shadow-sky-950/5">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-5 bg-brand-600 rounded-full" />
              <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-brand-600">
                SAANSO PHARMA CDMO
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-normal leading-[1.08] tracking-tight text-ink-950">
              Working for a healthier world.
            </h1>

            <p className="mt-2 text-sm sm:text-base font-serif italic text-brand-700 font-normal">
              Made as if a life depends on it.
            </p>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-700 font-sans">
              Sterile injectables, BFS and inhalation anaesthetics engineered to Schedule M, U.S. FDA and EU GMP standards.
            </p>

            {/* Grounded 3-Feature Bar */}
            <div className="mt-4 grid grid-cols-3 gap-2 border-y border-sky-100 py-3 text-center">
              <div className="rounded-lg bg-sky-50/80 py-1.5 px-1">
                <span className="block font-display text-sm font-bold text-ink-950">60M+</span>
                <span className="text-[0.625rem] text-slate-500 font-medium">Units / year</span>
              </div>
              <div className="rounded-lg bg-sky-50/80 py-1.5 px-1">
                <span className="block font-display text-sm font-bold text-ink-950">4 Formats</span>
                <span className="text-[0.625rem] text-slate-500 font-medium">Single Site</span>
              </div>
              <div className="rounded-lg bg-sky-50/80 py-1.5 px-1">
                <span className="block font-display text-sm font-bold text-ink-950">WHO-GMP</span>
                <span className="text-[0.625rem] text-slate-500 font-medium">Compliant</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex items-center gap-2.5">
              <a
                href="#categories"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-ink-950 py-3 text-xs sm:text-sm font-medium text-white shadow-md transition-all active:scale-98 hover:bg-brand-700"
              >
                <span>Inside the facility</span>
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-xl border border-sky-200 bg-sky-50/80 px-4 py-3 text-xs sm:text-sm font-semibold text-brand-700 transition-all hover:bg-sky-100"
              >
                Products
              </a>
            </div>
          </div>

        </div>

        {/* ================= DESKTOP VIEW ================= */}
        <div className="hidden lg:block max-w-[34rem]">
          <div className="flex items-center gap-2" data-reveal>
            <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
            <p className="eyebrow">
              Eluru, Andhra Pradesh
            </p>
          </div>

          <h1
            className="mt-5 font-display text-[clamp(2.5rem,5.2vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.03em] text-ink-950"
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
          >
            Working for a healthier world.
          </h1>

          <p
            className="mt-3 font-display text-2xl font-serif italic text-brand-700 font-normal"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            Made as if a life depends on it.
          </p>

          <p
            className="mt-4 text-base leading-relaxed text-ink-700 font-medium max-w-lg"
            data-reveal
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          >
            Sterile injectables, BFS and inhalation anaesthetics engineered to Schedule M, U.S. FDA and EU GMP standards.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3"
            data-reveal
            style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
          >
            <a
              href="#categories"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink-950 px-7 py-3.5 text-base font-medium text-white shadow-lg shadow-sky-950/15 transition-all duration-300 hover:bg-brand-700 hover:shadow-xl active:scale-95"
            >
              Inside the facility
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M2 8h11M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
