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

const MAX = Math.max(...formats.map((f) => f.units ?? 0));

/**
 * Four formats, one facility.
 *
 * Reworked from the Capability Statement (Rev. 01/2026): the four fill–finish
 * formats run as cards side by side rather than as a tall expanding list, so
 * the section stays short and every spec is visible at once. Below them sits
 * the pairing the one-pager leads on — sterile injectables and inhalation
 * anaesthetics in one block on separated flows.
 *
 * Figures count up as they arrive, and anything the one-pager left as `00` or
 * `STATUS` renders as a visible PENDING mark rather than an invented number.
 */
export function Capacity() {
  const [totalRef, totalCount] = useInViewCount<HTMLDivElement>(totalUnits, 1900);

  return (
    <section
      id="capacity"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/40 to-white py-24 lg:py-36 border-t border-slate-200/80"
    >
      {/* Two very slow powder washes. Long cycles and low contrast: they keep
          the large light field from reading as dead flat, and nothing about
          them is legible as an animation. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full bg-powder-200/60 blur-3xl drift" style={{ "--drift-duration": "26s" } as React.CSSProperties}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-accent-100/50 blur-3xl drift" style={{ "--drift-duration": "32s", animationDirection: "reverse" } as React.CSSProperties}
      />

      <div className="relative mx-auto max-w-[88rem] px-6 lg:px-10">
        {/* ---- Masthead: the claim on the left, the running total on the right ---- */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow" data-reveal>
              Sterile &amp; specialty CDMO
            </p>
            <h2
              className="mt-6 max-w-xl font-display text-title font-normal text-balance text-ink-950"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Four formats. One facility.
            </h2>
            <p
              className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-ink-700"
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
            >
              {company.claim} One site, one team, one audit, four routes to
              market — none of it subcontracted.
            </p>
          </div>

          <div
            ref={totalRef}
            className="shrink-0 rounded-2xl border border-powder-200 bg-white/70 px-7 py-5 backdrop-blur-sm lg:text-right"
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            <span className="numeric block font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.035em] text-ink-950">
              {toMillions(totalCount)}
            </span>
            <p className="spec-label mt-3 block">Units a year, all formats</p>
          </div>
        </div>

        {/* ---- The four format cards ---- */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {formats.map((format, i) => (
            <FormatCard key={format.id} format={format} index={i} />
          ))}
        </div>

        {/* ---- The pairing ---- */}
        <Pairing />

        {/* ---- Quality assurance ---- */}
        <div id="quality" className="mt-16 lg:mt-20">
          <p className="eyebrow eyebrow-blue" data-reveal>
            Quality assurance
          </p>

          <dl className="mt-8 grid gap-5 lg:grid-cols-3">
            {qualityPillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="card group p-7"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="index-num numeric">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="mt-4 font-display text-xl leading-snug text-ink-950">
                  {pillar.title}
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
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

/**
 * One format. Figure counts up on arrival, the rail fills proportionally
 * against the largest format, and the whole card lifts into a warm edge on
 * hover — every spec stays visible so the card never changes height.
 */
function FormatCard({ format, index }: { format: Format; index: number }) {
  const [cardRef, counted] = useInViewCount<HTMLElement>(
    format.units,
    1500 + index * 120,
  );
  const share = format.units ? (format.units / MAX) * 100 : 0;

  return (
    <article
      ref={cardRef}
      className="card group flex flex-col overflow-hidden p-0 rounded-2xl bg-white border border-powder-200 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      data-reveal
      style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
    >
      {/* Photorealistic 3D Image Banner Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <Image
          src={FORMAT_IMAGES[format.id] || "/images/formats/vial.png"}
          alt={format.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="index-num numeric font-bold text-sky-700">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="spec-label uppercase font-bold text-xs text-slate-500">{format.attribute}</span>
        </div>

      <h3 className="mt-5 font-display text-xl leading-tight tracking-[-0.02em] text-ink-950">
        {format.name}
      </h3>

      {/* The figure */}
      <div className="mt-5 flex items-baseline gap-2">
        {format.units === null ? (
          <span className="font-display text-3xl text-powder-500">—</span>
        ) : (
          <span className="numeric font-display text-[2.5rem] leading-none tracking-[-0.035em] text-ink-950 transition-colors duration-500 group-hover:text-accent-600">
            {toMillions(counted)}
          </span>
        )}
        <span className="spec-label">{format.unitLabel} p.a.</span>
      </div>

      {/* Proportional rail — scaled against the largest format, so the 1.8M
          line reads as small next to 40M instead of being flattered by an
          equal-width card. */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-powder-200">
        <div
          className="h-full rounded-full bg-brand-500 transition-[width,background-color] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-accent-500"
          style={{ width: `${counted ? share : 0}%` }}
        />
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink-700">
        {format.description}
      </p>

      {/* Specs. `Lines` reads PENDING on every format because the one-pager
          ships it as `00`. */}
      <dl className="mt-auto space-y-2.5 border-t border-rule pt-5 text-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="spec-label">Fill</dt>
          <dd className="numeric text-ink-900">{format.fillRange}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="spec-label">Lines</dt>
          <dd className="text-ink-900">
            {format.lines ?? (
              <span
                className="spec-label rounded-full bg-powder-100 px-2 py-0.5 text-paper-600"
                title="Not stated on the Capability Statement Rev. 01/2026"
              >
                Pending
              </span>
            )}
          </dd>
        </div>
      </dl>
    </div>
  </article>
  );
}

/** The differentiator block — split, with the agent register on the right. */
function Pairing() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  return (
    <div className="mt-16 grid gap-x-10 gap-y-10 lg:mt-20 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-6">
        <p className="eyebrow" data-reveal>
          {pairing.eyebrow}
        </p>

        <h3
          className="mt-6 max-w-lg font-display text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] text-balance text-ink-950"
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

        {/* Controls as a live chip set rather than a bulleted list. */}
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
          colours used on vaporisers and packaging, which is what the
          one-pager asks for — they are data, not decoration. */}
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
                  <span
                    className="spec-label rounded-full bg-powder-100 px-2 py-0.5 text-paper-600"
                    title="Status not stated on the Capability Statement Rev. 01/2026"
                  >
                    Pending
                  </span>
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
