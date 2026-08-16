"use client";

import Image from "next/image";
import { useState } from "react";
import {
  anaestheticAgents,
  company,
  formats,
  pairing,
  qualityPillars,
  totalUnits,
  type Format,
} from "@/content/site";
import { useInViewCount } from "./useInViewCount";

const FORMAT_IMAGES: Record<string, string> = {
  ampoule: "/images/formats/ampoule.png",
  vial: "/images/formats/vial.png",
  bfs: "/images/formats/bfs.png",
  anaesthetics: "/images/formats/anaesthetics.png",
};

/** 40_000_000 → "40M", 1_800_000 → "1.8M". */
const toMillions = (n: number) => {
  const m = n / 1_000_000;
  return `${m >= 10 || Number.isInteger(m) ? Math.round(m * 10) / 10 : m.toFixed(1)}M`;
};

/**
 * Categories — the four fill–finish formats, per the Capability Statement
 * (Rev. 01/2026).
 *
 * This is one merged section: the formats are what the company sells, so the
 * capacity figures, the pairing and the quality record all sit with them
 * rather than being spun out into a second block that repeats the same four
 * names.
 *
 * Each card carries an `id` of `format-<id>` so the header's Categories menu
 * can jump straight to one.
 *
 * Where the one-pager ships `LINES 00`, the row reads `Operational` rather than
 * an invented figure; the agent register still carries a visible Pending mark
 * where the document leaves `STATUS` blank.
 */
export function Categories() {
  const [totalRef, totalCount] = useInViewCount<HTMLDivElement>(totalUnits, 1900);

  return (
    <section
      id="categories"
      className="wash relative overflow-hidden border-y border-rule py-10 lg:py-16"
    >
      <span id="capacity" aria-hidden="true" className="absolute -top-24" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full bg-powder-200/60 blur-3xl drift" style={{ "--drift-duration": "26s" } as React.CSSProperties}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-accent-100/50 blur-3xl drift" style={{ "--drift-duration": "32s", animationDirection: "reverse" } as React.CSSProperties}
      />

      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        {/* ---- Masthead ---- */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow" data-reveal>
              Sterile &amp; specialty CDMO
            </p>
            <h2
              className="mt-3 max-w-xl font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-balance text-ink-950"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Four formats. One facility.
            </h2>
            <p
              className="mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-ink-700 font-medium"
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
            >
              {company.claim} One site, one team, one audit, four routes to
              market — none of it subcontracted.
            </p>
          </div>

          <div
            ref={totalRef}
            className="shrink-0 rounded-2xl border border-powder-200 bg-white/80 px-5 py-3.5 backdrop-blur-sm lg:text-right shadow-sm"
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            <span className="numeric block font-display text-2xl sm:text-3xl lg:text-4xl leading-none tracking-[-0.035em] text-ink-950">
              {toMillions(totalCount)}
            </span>
            <p className="spec-label mt-1.5 block text-[0.6875rem]">Units a year, all formats</p>
          </div>
        </div>

        {/* ---- The four formats (2x2 Grid on Mobile!) ---- */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {formats.map((format, i) => (
            <FormatCard key={format.id} format={format} index={i} />
          ))}
        </div>

        <Pairing />

        {/* ---- Quality assurance (2x2 / 3-Col compact) ---- */}
        <div id="quality" className="mt-10 lg:mt-12">
          <p className="eyebrow eyebrow-blue" data-reveal>
            Quality assurance
          </p>

          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {qualityPillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="card group p-4 sm:p-5"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="index-num numeric text-xs font-bold text-sky-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="mt-2 font-display text-base sm:text-lg leading-snug text-ink-950 font-medium">
                  {pillar.title}
                </dt>
                <dd className="mt-1.5 text-xs sm:text-[0.8125rem] leading-relaxed text-ink-700">
                  {pillar.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function FormatCard({ format, index }: { format: Format; index: number }) {
  const [cardRef, counted] = useInViewCount<HTMLElement>(
    format.units,
    1500 + index * 120,
  );

  return (
    <article
      id={`format-${format.id}`}
      ref={cardRef}
      className="card group flex scroll-mt-28 flex-col overflow-hidden rounded-2xl bg-white border border-powder-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      data-reveal
      style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
    >
      {/* Photorealistic 3D Image Banner Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={FORMAT_IMAGES[format.id] || "/images/formats/vial.png"}
          // Written out for image search, which only ever sees the alt text.
          alt={`${format.name} fill–finish line at the Saanso Pharma facility, Eluru — ${format.attribute.toLowerCase()}, ${format.fillRange} fill`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* ---- The specs ---- */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="index-num numeric font-bold text-sky-700 text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="spec-label uppercase font-bold text-[0.625rem] text-slate-500">{format.attribute}</span>
        </div>

        <h3 className="font-display text-sm sm:text-base leading-tight tracking-[-0.02em] text-ink-950 font-medium">
          {format.name}
        </h3>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          {format.units === null ? (
            <span className="font-display text-lg text-powder-500">—</span>
          ) : (
            <span className="numeric font-display text-xl sm:text-2xl leading-none tracking-[-0.035em] text-ink-950 transition-colors duration-500 group-hover:text-accent-600">
              {toMillions(counted)}
            </span>
          )}
          <span className="spec-label text-[0.625rem]">{format.unitLabel} p.a.</span>
        </div>

        <p className="mt-2 mb-3 text-[0.75rem] leading-relaxed text-ink-700 line-clamp-2 sm:line-clamp-3">
          {format.description}
        </p>

        <dl className="mt-auto space-y-1.5 border-t border-rule pt-2 text-xs">
          <div className="flex items-baseline justify-between gap-2">
            <dt className="spec-label text-[0.625rem]">Fill</dt>
            <dd className="numeric text-[0.75rem] font-semibold text-ink-900 truncate">
              {format.fillRange}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="spec-label text-[0.625rem]">Lines</dt>
            <dd className="text-[0.75rem] text-ink-900">
              {format.lines ?? <Operational />}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

/**
 * The line state. The Capability Statement ships `LINES 00`, so where no count
 * is stated the row carries the state rather than an invented number.
 */
function Operational() {
  return (
    <span className="spec-label inline-flex items-center gap-1 text-[0.625rem] text-brand-700">
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-500" />
      Operational
    </span>
  );
}

/** Explicit placeholder for anything the source document left unfilled. */
function Pending({ label }: { label: string }) {
  return (
    <span
      className="spec-label rounded-full bg-powder-100 px-2 py-0.5 text-paper-600"
      title={label}
    >
      Pending
    </span>
  );
}

/** The differentiator block — split, with the agent register on the right. */
function Pairing() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  return (
    <div className="mt-14 grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-6">
        <p className="eyebrow" data-reveal>
          {pairing.eyebrow}
        </p>

        <h3
          className="mt-5 max-w-lg font-display text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] text-balance text-ink-950"
          data-reveal
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          {pairing.title}
        </h3>

        <p
          className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-ink-700"
          data-reveal
          style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
        >
          {pairing.body}
        </p>

        <ul
          className="mt-7 flex flex-wrap gap-2"
          data-reveal
          style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
        >
          {pairing.controls.map((control) => (
            <li
              key={control}
              className="rounded-full border border-powder-200 bg-white px-4 py-2 text-[0.8125rem] font-medium text-ink-800 transition-all duration-400 ease-[cubic-bezier(0.22,1.2,0.36,1)] hover:-translate-y-0.5 hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700"
            >
              {control}
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-700/80">
          {pairing.note}
        </p>
      </div>

      {/* Agents. The swatches are the international agent-identification
          colours used on vaporisers and packaging — data, not decoration. */}
      <div
        className="card p-7 lg:col-span-5 lg:col-start-8"
        data-reveal
        style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
      >
        <p className="spec-label">Halogenated agents</p>

        <ul className="mt-5">
          {anaestheticAgents.map((agent, i) => {
            const isActive = activeAgent === agent.name;

            return (
              <li
                key={agent.name}
                onMouseEnter={() => setActiveAgent(agent.name)}
                onMouseLeave={() => setActiveAgent(null)}
                className={`flex items-center gap-4 rounded-xl px-3 py-3.5 transition-colors duration-300 ${
                  i > 0 ? "border-t border-rule" : ""
                } ${isActive ? "bg-powder-50" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 rounded-full transition-transform duration-400 ease-[cubic-bezier(0.22,1.2,0.36,1)]"
                  style={{
                    backgroundColor: agent.colour,
                    transform: isActive ? "scale(1.35)" : "scale(1)",
                    boxShadow: isActive ? `0 0 0 4px ${agent.colour}22` : "none",
                  }}
                />
                <span className="flex-1 font-display text-lg text-ink-950">
                  {agent.name}
                </span>
                {agent.status ? (
                  <span className="spec-label">{agent.status}</span>
                ) : (
                  <Pending label="Status not stated on the Capability Statement Rev. 01/2026" />
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-5 border-t border-rule pt-5 text-xs leading-relaxed text-ink-700/75">
          Colours follow the international agent-identification code used on
          vaporisers and packaging.
        </p>

        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-800">
          {pairing.outcome}
        </p>
      </div>
    </div>
  );
}
