"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { leadership, type Leader } from "@/content/site";

/** "Mr. Naren Paturi" → "NP" — honorifics dropped. */
const initials = (name: string) =>
  name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

/** "Mr. Naren Paturi" → "Naren Paturi" for the display name. */
const withoutHonorific = (name: string) =>
  name.replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "");

/**
 * Leadership.
 *
 * No photographs were supplied, so this does not pretend otherwise — there are
 * no grey avatar circles standing in for faces. The profile is carried by a
 * monogram, the figures pulled out of each bio, and the roll of manufacturers
 * each person has worked for, which for a contract manufacturer is the part a
 * partner actually reads.
 *
 * The roster runs across the top rather than down a side column: four names in
 * a tall left rail left two-thirds of that column empty, which is a lot of page
 * to spend on nothing. Across the top it costs one row and the profile gets the
 * full measure.
 *
 * Switching profile unfolds the new one as a stack of hinged leaves — see
 * `.fold-leaf`. Re-mounting on `key` is what replays it each time.
 */
export function Leadership() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasTeam = leadership.length > 0;
  const active = hasTeam ? leadership[activeIndex] : null;

  return (
    <section id="leadership" className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/50 to-slate-50 py-16 lg:py-36 border-t border-slate-200/80">
      {/* Section and wrapper padding both applied below lg — ~176px of empty
          ground at each end on a phone. Desktop keeps both. */}
      <div className="mx-auto max-w-[88rem] px-6 py-0 lg:px-10 lg:py-28">
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal>
              Leadership
            </p>
            <h2
              className="mt-8 max-w-2xl font-display text-title font-normal text-balance text-ink-950"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              The people accountable for it.
            </h2>
          </div>
          <p
            className="max-w-sm text-[0.9375rem] leading-relaxed font-medium text-ink-800 lg:col-span-4 lg:col-start-9 lg:pb-2"
            data-reveal
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            Manufacturing, quality and commercial — the decisions behind every
            batch have names attached to them.
          </p>
        </div>

        {hasTeam && active ? (
          <div className="mt-10 lg:mt-16" data-reveal>
            {/* ---- Roster ---- */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {leadership.map((leader, i) => {
                const isActive = i === activeIndex;
                return (
                  <li key={leader.name}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-pressed={isActive}
                      className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border-2 p-3 text-left transition-all duration-400 ease-[cubic-bezier(0.22,1.2,0.36,1)] lg:gap-4 lg:p-4 ${
                        isActive
                          ? "-translate-y-1 border-accent-500 bg-white shadow-[0_18px_34px_-20px_rgba(6,32,47,0.4)]"
                          : "border-powder-200 bg-white/60 hover:-translate-y-0.5 hover:border-accent-300 hover:bg-white"
                      }`}
                    >
                      {/* Fills from the left as it becomes current. */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-1 origin-top bg-accent-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "scale-y-100" : "scale-y-0"
                        }`}
                      />
                      <Monogram leader={leader} isActive={isActive} small />
                      <span className="min-w-0">
                        <span
                          className={`block text-[0.9375rem] leading-tight font-bold transition-colors duration-300 ${
                            isActive
                              ? "text-accent-700"
                              : "text-ink-950 group-hover:text-accent-700"
                          }`}
                        >
                          {withoutHonorific(leader.name)}
                        </span>
                        <span className="spec-label mt-1 block leading-snug">
                          {leader.role}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* ---- Profile, unfolding ---- */}
            <div key={active.name} className="fold-stage mt-5 space-y-3">
              <Leaf index={0} className="rounded-2xl border-2 border-powder-200 bg-white p-6 lg:p-8">
                <div className="flex flex-wrap items-center gap-5">
                  <Monogram leader={active} isActive />
                  <div>
                    <h3 className="text-2xl leading-tight font-bold tracking-[-0.02em] text-ink-950 lg:text-[2rem]">
                      {withoutHonorific(active.name)}
                    </h3>
                    <p className="mt-1.5 text-[0.8125rem] font-bold tracking-[0.12em] text-accent-700 uppercase">
                      {active.role}
                    </p>
                  </div>
                </div>
              </Leaf>

              {active.highlights && active.highlights.length > 0 && (
                <Leaf index={1} className="rounded-2xl border-2 border-powder-200 bg-white px-6 py-7 lg:px-8">
                  <dl className="grid gap-6 sm:grid-cols-3">
                    {active.highlights.map((h) => (
                      <div key={h.label}>
                        <dt className="numeric font-display text-[clamp(2.25rem,3.4vw,3rem)] leading-none tracking-[-0.035em] text-ink-950">
                          <CountUp value={h.value} />
                        </dt>
                        <dd className="spec-label mt-2.5 block leading-snug">
                          {h.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Leaf>
              )}

              <Leaf index={2} className="rounded-2xl border-2 border-powder-200 bg-white p-6 lg:p-8">
                <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    {active.bio.length > 0 ? (
                      <div className="space-y-4">
                        {active.bio.map((para, i) => (
                          <p
                            key={i}
                            className={`leading-relaxed text-ink-800 ${
                              i === 0
                                ? "text-[1.0625rem] font-medium text-ink-900"
                                : "text-[0.9375rem]"
                            }`}
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    ) : (
                      /* The document names this person and gives no biography.
                         Saying so is the only honest option. */
                      <p className="rounded-xl border-2 border-dashed border-powder-300 p-5 text-[0.9375rem] leading-relaxed text-ink-700">
                        A biography for {withoutHonorific(active.name)} has not
                        been supplied yet. Add one to{" "}
                        <code className="font-semibold text-ink-900">
                          leadership
                        </code>{" "}
                        in{" "}
                        <code className="font-semibold text-ink-900">site.ts</code>{" "}
                        and it appears here.
                      </p>
                    )}
                  </div>

                  <div className="lg:col-span-4 lg:col-start-9">
                    <Portrait leader={active} />

                    {active.companies && active.companies.length > 0 && (
                      <>
                        <p className="spec-label mt-7">Previously with</p>
                        <ul className="mt-4 space-y-2">
                          {active.companies.map((c, i) => (
                            <li
                              key={c}
                              className="flex items-center gap-3 border-b border-rule pb-2 text-[0.875rem] font-semibold text-ink-900 transition-colors duration-300 last:border-b-0 hover:text-accent-700"
                            >
                              <span className="index-num numeric shrink-0">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </Leaf>
            </div>
          </div>
        ) : (
          <div className="mt-16 lg:mt-20" data-reveal>
            <p className="max-w-md border-t border-rule pt-6 text-sm leading-relaxed text-ink-700">
              Leadership profiles are being prepared for publication. Supply
              names, roles, short bios and photographs to replace this panel —
              add them to <code className="text-ink-900">leadership</code> in{" "}
              <code className="text-ink-900">src/content/site.ts</code> and this
              section fills itself in.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/** One hinged panel in the stack. `--leaf` sets its place in the sequence. */
function Leaf({
  index,
  className = "",
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`fold-leaf ${className}`}
      style={{ "--leaf": index } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * Counts a figure up as its leaf unfolds.
 *
 * Years are left alone — running 2022 up from zero reads as a counter, not as
 * a date. Any suffix ("80+") is preserved and only the number moves.
 */
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : NaN;
  const suffix = match ? match[2] : "";
  const isYear = /^(19|20)\d{2}$/.test(match?.[1] ?? "");
  const animatable = Number.isFinite(target) && !isYear;

  const [shown, setShown] = useState(animatable ? 0 : target);
  const frame = useRef(0);

  useEffect(() => {
    if (!animatable) return;
    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Ease-out cubic: quick off the mark, settles onto the final figure.
      setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [animatable, target]);

  // Anything not being animated is printed exactly as written. Running a year
  // through a locale formatter turns 2022 into "2,022".
  if (!match || !animatable) return <>{value}</>;

  return (
    <>
      {shown.toLocaleString("en-IN")}
      {suffix}
    </>
  );
}

/**
 * The portrait slot.
 *
 * Drops in a real photograph the moment `photo` is set on the leader — put the
 * files under `public/images/leadership/` and set
 * `photo: "/images/leadership/naren-paturi.jpg"`. A 4:5 portrait crop is what
 * the frame expects.
 *
 * Until then it holds the frame at that exact ratio with the monogram set
 * large, so the reserved space reads as designed rather than as a gap, and
 * nothing shifts when the photographs arrive.
 */
function Portrait({ leader }: { leader: Leader }) {
  if (leader.photo) {
    return (
      <div className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-powder-100">
        <Image
          src={leader.photo}
          alt={leader.name}
          fill
          sizes="(min-width: 1024px) 26vw, 90vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div className="group relative grid aspect-4/5 place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-powder-300 bg-powder-50 transition-colors duration-500 hover:border-accent-300">
      {/* Registration cross — a print production mark, so the field reads as
          reserved rather than as broken. */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 block h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-powder-300"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 block h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-powder-300"
      />

      <span className="relative grid h-20 w-20 place-items-center rounded-xl bg-white text-2xl font-bold text-ink-700 shadow-[0_10px_24px_-14px_rgba(6,32,47,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,1.2,0.36,1)] group-hover:-translate-y-1">
        {initials(leader.name)}
      </span>

      <span className="spec-label absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
        Photograph to follow
      </span>
    </div>
  );
}

/**
 * A monogram, not an avatar.
 *
 * A grey circle with a silhouette in it reads as a missing photograph; set
 * initials read as a deliberate mark. Swaps to the real portrait the moment
 * `photo` is supplied.
 */
function Monogram({
  leader,
  isActive,
  small = false,
}: {
  leader: Leader;
  isActive: boolean;
  small?: boolean;
}) {
  const size = small ? "h-12 w-12 text-sm" : "h-20 w-20 text-2xl";

  if (leader.photo) {
    return (
      <span
        className={`relative ${size} shrink-0 overflow-hidden rounded-xl bg-powder-100`}
      >
        <Image
          src={leader.photo}
          alt={leader.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${size} grid shrink-0 place-items-center rounded-xl font-bold tracking-[0.02em] transition-colors duration-400 ${
        isActive
          ? "bg-ink-950 text-white"
          : "bg-powder-100 text-ink-700 group-hover:bg-powder-200"
      }`}
    >
      {initials(leader.name)}
    </span>
  );
}
