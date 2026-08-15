"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { portfolio, type PortfolioCategory } from "@/content/portfolio";
import { FormatVessel, type VesselId } from "./FormatVessel";
import { Logo } from "./Logo";

/**
 * Dosage forms that appear at the end of a product name in the workbook.
 * Longest first, so "Injection for Infusion" wins over "Injection".
 */
const DOSAGE_FORM =
  /^(.*?)\s+(Injection for Infusion|Injection HEAVY|Ophthalmic Solution|Respiratory Suspension|Respiratory Solution|Inhalation Solution|for Inhalation|Injection)$/i;

/** "Ropivacaine Injection" → headline + strapline, the way a pack is set. */
function splitName(name: string) {
  const m = name.match(DOSAGE_FORM);
  return m
    ? { molecule: m[1].trim(), form: m[2].trim() }
    : { molecule: name, form: "" };
}

/**
 * Break a comma-separated cell into individual tokens.
 *
 * Only on commas: "0.005% + 0.50%" is one combination strength and
 * "300 / 370 mg I/mL" is one value written with a slash — splitting either
 * would invent products that do not exist.
 */
function splitValues(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Product portfolio.
 *
 * The section is only the choice: a stage toggle and a row of category bays.
 * Opening a bay irises out to a full-screen index of that category.
 *
 * Everything inside that overlay is set in the sans. The serif is the site's
 * editorial voice and it fights product data — "Ketorolac Tromethamine" in a
 * bold serif reads as a headline rather than as a molecule.
 */
export function Portfolio() {
  const [stageId, setStageId] = useState<"commercial" | "pipeline">("commercial");
  const [openId, setOpenId] = useState<string | null>(null);

  const stage = portfolio.find((s) => s.id === stageId)!;
  const isPipeline = stageId === "pipeline";

  /**
   * Switching stage while the overlay is open lands on the equivalent category
   * where one exists — Vials to Vials — and on the first otherwise, so the
   * jump from commercial to pipeline keeps its place instead of resetting.
   */
  const switchStage = useCallback(
    (next: "commercial" | "pipeline") => {
      setStageId(next);
      setOpenId((current) => {
        if (current === null) return null;
        const target = portfolio.find((s) => s.id === next)!;
        return (target.categories.find((c) => c.id === current) ?? target.categories[0]).id;
      });
    },
    [],
  );

  const productCount = useMemo(
    () => stage.categories.reduce((n, c) => n + c.products.length, 0),
    [stage],
  );

  const open = stage.categories.find((c) => c.id === openId) ?? null;

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-blue-50/50 py-10 lg:py-16 border-t border-slate-200/80"
    >
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        
        {/* Centered Masthead & Toggle */}
        <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
          <p className="eyebrow" data-reveal>
            Product portfolio
          </p>
          
          <h2
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-balance text-ink-950"
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            What we make, and what is coming.
          </h2>

          <p
            key={stage.id}
            className="animate-[panelIn_0.4s_cubic-bezier(0.16,1,0.3,1)_both] text-xs sm:text-sm leading-relaxed font-medium text-ink-800 max-w-lg"
          >
            {stage.blurb}
          </p>

          {/* Centered Toggle Bar */}
          <div
            className="mt-3 flex flex-col items-center justify-center gap-2"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <Toggle stage={stageId} onChange={setStageId} />
            <p className="numeric spec-label text-center text-[0.6875rem]">
              {stage.categories.length} categories · {productCount} products
            </p>
          </div>
        </div>

        {/* 2x2 Category Bay Grid on Mobile */}
        <div
          key={stageId}
          className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 animate-[panelIn_0.4s_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          {stage.categories.map((category, i) => (
            <Bay
              key={`${stageId}-${category.id}`}
              category={category}
              index={i}
              isPipeline={isPipeline}
              onOpen={() => setOpenId(category.id)}
            />
          ))}
        </div>
      </div>

      {open && (
        <CategoryOverlay
          category={open}
          categories={stage.categories}
          stageId={stageId}
          isPipeline={isPipeline}
          onStageChange={switchStage}
          onSwitch={setOpenId}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
  );
}

function Toggle({
  stage,
  onChange,
  compact = false,
}: {
  stage: "commercial" | "pipeline";
  onChange: (s: "commercial" | "pipeline") => void;
  /** Inside the overlay header, where the labels have to give way first. */
  compact?: boolean;
}) {
  const isPipeline = stage === "pipeline";

  return (
    <div className={`flex items-center justify-center ${compact ? "gap-2.5" : "gap-3"}`}>
      <button
        type="button"
        onClick={() => onChange("commercial")}
        className={`frost-label ${compact ? "hidden text-[0.8125rem]! sm:inline-flex" : "text-xs sm:text-sm font-semibold"}`}
        data-active={!isPipeline}
      >
        Commercial
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={isPipeline}
        aria-label="Show pipeline products"
        data-stage={stage}
        onClick={() => onChange(isPipeline ? "commercial" : "pipeline")}
        className="frost-toggle scale-95 sm:scale-100"
      >
        <span className="frost-knob">
          <span
            aria-hidden="true"
            className={`block h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
              isPipeline ? "bg-accent-500" : "bg-brand-700"
            }`}
          />
        </span>
      </button>

      <button
        type="button"
        onClick={() => onChange("pipeline")}
        className={`frost-label ${compact ? "text-[0.8125rem]!" : "text-xs sm:text-sm font-semibold"}`}
        data-active={isPipeline}
      >
        Pipeline
      </button>
    </div>
  );
}

function Bay({
  category,
  index,
  isPipeline,
  onOpen,
}: {
  category: PortfolioCategory;
  index: number;
  isPipeline: boolean;
  onOpen: () => void;
}) {
  const short = category.name.replace(/\s*\([^)]*\)\s*/g, " ").trim();

  return (
    <button
      type="button"
      onClick={onOpen}
      className="card group relative flex overflow-hidden text-left rounded-2xl border border-powder-200 bg-white p-3.5 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 transition-colors duration-500 group-hover:bg-accent-500"
        style={
          isPipeline
            ? {
                backgroundImage:
                  "repeating-linear-gradient(180deg, currentColor 0 7px, transparent 7px 13px)",
                color: "var(--color-powder-400)",
              }
            : { backgroundColor: "var(--color-powder-300)" }
        }
      />

      <span className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <FormatVessel
          id={category.vessel as VesselId}
          level={0.62}
          className="h-12 w-9 sm:h-16 sm:w-12 shrink-0 transition-transform duration-500 group-hover:scale-105"
        />

        <span className="block min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="index-num numeric text-xs font-bold text-sky-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="spec-label numeric shrink-0 text-[0.625rem]">
              {category.products.length} items
            </span>
          </span>

          <span className="mt-1 block font-display text-sm sm:text-lg leading-tight font-semibold tracking-[-0.015em] text-ink-950 transition-colors duration-300 group-hover:text-accent-600 line-clamp-1">
            {short}
          </span>

          <span className="mt-1.5 flex items-center gap-1.5 text-[0.6875rem] sm:text-xs font-bold text-ink-700 transition-colors duration-300 group-hover:text-accent-600">
            <span>{isPipeline ? "Pipeline" : "Explore"}</span>
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-3 w-3 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            >
              <path
                d="M2 8h11M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </span>
      </span>
    </button>
  );
}

/**
 * The category index.
 *
 * Products run in one dense grid rather than in a band per therapeutic area.
 * Banding was the reason this page ran so long: thirteen areas, several of
 * them holding a single product, each taking a full-width heading and an
 * almost empty row. The therapy now travels on the product itself and doubles
 * as a filter, so sixteen products fit in four rows instead of thirteen bands.
 *
 * The header carries every sibling category, so the overlay is somewhere you
 * move around rather than somewhere you get stuck — switching is one click and
 * never requires closing first.
 */
function CategoryOverlay({
  category,
  categories,
  stageId,
  isPipeline,
  onStageChange,
  onSwitch,
  onClose,
}: {
  category: PortfolioCategory;
  categories: readonly PortfolioCategory[];
  stageId: "commercial" | "pipeline";
  isPipeline: boolean;
  onStageChange: (s: "commercial" | "pipeline") => void;
  onSwitch: (id: string) => void;
  onClose: () => void;
}) {
  const [closing, setClosing] = useState(false);
  const [therapy, setTherapy] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const dismiss = useCallback(() => {
    setClosing(true);
    window.setTimeout(onClose, 400);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [dismiss]);

  // Switching category resets the filter — the old therapy rarely exists in
  // the new one, and a filter that matches nothing looks broken. Adjusted
  // during render rather than in an effect: an effect would paint the stale
  // filter for a frame first, then re-render to clear it.
  const [filterOwner, setFilterOwner] = useState(category.id);
  if (filterOwner !== category.id) {
    setFilterOwner(category.id);
    setTherapy(null);
  }

  const therapies = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of category.products) {
      const key = p.therapy || "Other";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [category]);

  /**
   * Shortest first.
   *
   * A product with ten presentations is three times the height of one with
   * two, and in a four-column grid a tall card early on leaves its whole row
   * ragged. Ordering by pack count keeps the grid dense at the top and lets
   * the deep ones — Ropivacaine, Bupivacaine, Dexmedetomidine — run together
   * at the end where their height costs nothing.
   */
  const shown = useMemo(() => {
    const base = therapy
      ? category.products.filter((p) => (p.therapy || "Other") === therapy)
      : category.products;

    return [...base].sort((a, b) => {
      const d = splitValues(a.presentation).length - splitValues(b.presentation).length;
      return d !== 0 ? d : a.name.localeCompare(b.name);
    });
  }, [category, therapy]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${category.name} products`}
      className={`fixed inset-0 z-[70] overflow-y-auto bg-powder-50 ${
        closing ? "iris-close" : "iris-open"
      }`}
    >
      <div className="sticky top-0 z-10 border-b-2 border-ink-950/10 bg-powder-50/96 backdrop-blur-md">
        <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
          {/* Brand row. The overlay covers the site header, so it has to carry
              the mark itself — otherwise opening a category drops you onto a
              page with no idea whose it is. */}
          <div className="flex items-center justify-between gap-4 border-b border-rule py-3">
            <a href="/" className="shrink-0 transition-opacity hover:opacity-70">
              <Logo tone="dark" />
            </a>

            <div className="flex items-center gap-3 sm:gap-5">
              {/* Stage lives in here too, so pipeline is one click away
                  rather than close-then-toggle-then-reopen. */}
              <Toggle stage={stageId} onChange={onStageChange} compact />

              <button
                ref={closeRef}
                type="button"
                onClick={dismiss}
                className="group flex shrink-0 items-center gap-2.5 rounded-full border-2 border-ink-950/15 py-1.5 pr-2 pl-4 text-[0.8125rem] font-bold text-ink-950 transition-colors duration-300 hover:border-accent-500 hover:bg-accent-500 hover:text-white"
              >
                <span className="hidden sm:inline">Close</span>
                <span className="hidden text-[0.6875rem] font-bold tracking-wider opacity-60 md:inline">
                  ESC
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-950/8 transition-transform duration-300 group-hover:rotate-90 group-hover:bg-white/25">
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3">
                    <path
                      d="M3.5 3.5l9 9M12.5 3.5l-9 9"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Title row */}
          <div className="flex items-center justify-between gap-6 pt-3">
            <div className="flex min-w-0 items-center gap-3">
              <FormatVessel
                id={category.vessel as VesselId}
                level={0.7}
                className="hidden h-14 w-10 shrink-0 sm:block"
              />
              <div className="min-w-0">
                <p className="spec-label">
                  {isPipeline ? "Pipeline · in development" : "Commercial · in market"}
                </p>
                <h2 className="mt-0.5 truncate text-xl font-bold tracking-[-0.02em] text-ink-950 lg:text-2xl">
                  {category.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Sibling categories — move sideways without closing. */}
          <div className="-mx-6 mt-3 flex gap-2 overflow-x-auto px-6 pb-3 lg:-mx-10 lg:px-10 [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => {
              const isCurrent = c.id === category.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSwitch(c.id)}
                  aria-current={isCurrent}
                  className={`flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-[0.8125rem] font-bold whitespace-nowrap transition-all duration-300 ${
                    isCurrent
                      ? "border-ink-950 bg-ink-950 text-white"
                      : "border-powder-300 bg-white text-ink-900 hover:-translate-y-0.5 hover:border-accent-500 hover:text-accent-700"
                  }`}
                >
                  {c.name.replace(/\s*\([^)]*\)\s*/g, " ").trim()}
                  <span
                    className={`numeric text-[0.6875rem] ${
                      isCurrent ? "text-white/70" : "text-ink-700"
                    }`}
                  >
                    {c.products.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-6 pb-20 lg:px-10">
        {/* Therapeutic area filter */}
        <div className="flex flex-wrap gap-2 py-6">
          <FilterChip
            label="All areas"
            count={category.products.length}
            active={therapy === null}
            onClick={() => setTherapy(null)}
          />
          {therapies.map(([name, n]) => (
            <FilterChip
              key={name}
              label={name}
              count={n}
              active={therapy === name}
              onClick={() => setTherapy(name)}
            />
          ))}
        </div>

        {/* Each product is its own bounded surface now. Borderless blocks in a
            grid ran together into one grey paragraph — with no edge, the eye
            had nothing to tell it where one product stopped. */}
        <div
          key={therapy ?? "all"}
          className="grid animate-[panelIn_0.4s_cubic-bezier(0.16,1,0.3,1)_both] items-start gap-4 border-t-2 border-ink-950/10 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {shown.map((p, i) => (
            <ProductCard
              key={p.name + p.presentation}
              product={p}
              index={i}
              isPipeline={isPipeline}
              showTherapy={!therapy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * One product.
 *
 * Three voices, each a different weight of the same type — no labels, and one
 * token system. Strength and pack size read almost identically ("30 mg/mL"
 * against "30 mg/1 mL"), so chipping both left no way to tell them apart:
 * strength is a single bold line, the packs keep the tokens.
 *
 * The card turns toward the pointer. Written straight to the node rather than
 * through state, so a grid of fifty cards never re-renders on pointer move.
 */
function ProductCard({
  product,
  index,
  isPipeline,
  showTherapy,
}: {
  product: { name: string; therapy: string; strength: string; presentation: string };
  index: number;
  isPipeline: boolean;
  showTherapy: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { molecule, form } = splitName(product.name);
  const strengths = splitValues(product.strength);
  const packs = splitValues(product.presentation);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    // Shallow: this is a surface catching light, not an object being spun.
    el.style.transform = `translateY(-4px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  /*
    Two elements, not one. The entry keyframe animates `transform`, and a CSS
    animation with `fill: both` outranks an inline style — run on the same node
    and the finished keyframe pins `transform: none`, silently swallowing every
    tilt. The outer element also owns the perspective, since `perspective`
    applies to direct children only.

    Entry is a keyframe rather than `data-reveal`: the reveal observer runs once
    on page mount and never sees nodes created later inside the overlay, so
    these would have sat at opacity 0 forever.
  */
  return (
    <article
      className="tilt-stage h-full animate-[irisRise_520ms_cubic-bezier(0.16,1,0.3,1)_both]"
      style={{ animationDelay: `${Math.min(index, 14) * 32}ms` }}
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`tilt-card group flex h-full flex-col rounded-xl border-2 bg-white p-5 ${
          isPipeline ? "border-dashed border-powder-300" : "border-powder-200"
        }`}
      >
        <h3 className="text-[1.0625rem] leading-snug font-bold tracking-[-0.01em] text-ink-950 transition-colors duration-300 group-hover:text-accent-700">
          {molecule}
        </h3>

        <p className="mt-1 text-[0.6875rem] font-bold tracking-[0.1em] text-ink-600 uppercase">
          {[form, showTherapy ? product.therapy : ""].filter(Boolean).join(" · ")}
        </p>

        {strengths.length > 0 && (
          <p className="numeric mt-3 text-[0.9375rem] leading-snug font-bold text-ink-950">
            {strengths.join("  ·  ")}
          </p>
        )}

        {packs.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {packs.map((v, t) => (
              <span
                key={v}
                className={`pack-token numeric rounded-md border px-2 py-1 text-xs leading-none font-semibold text-ink-800 ${
                  isPipeline ? "border-dashed border-powder-400" : "border-powder-300"
                }`}
                style={{ "--t": t } as React.CSSProperties}
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.8125rem] font-bold transition-all duration-300 ${
        active
          ? "bg-accent-600 text-white"
          : "bg-white text-ink-900 hover:-translate-y-0.5 hover:text-accent-700"
      }`}
    >
      {label}
      <span
        className={`numeric text-[0.6875rem] ${active ? "text-white/75" : "text-ink-700"}`}
      >
        {count}
      </span>
    </button>
  );
}
