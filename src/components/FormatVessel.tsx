"use client";

import { useCallback, useRef } from "react";

/**
 * The container itself, drawn to shape and filled with product.
 *
 * This replaces the progress bar that used to sit under each format. A bar is
 * a generic UI part; a fill level inside the actual vessel says the same thing
 * in the language of the business — this is a fill–finish company, so how full
 * the container is *is* the metric.
 *
 * Three things make it read as an object rather than an icon:
 *
 *   • a glass gradient across the body, so the cylinder has a lit edge and a
 *     shaded one and stops looking flat;
 *   • liquid with a moving surface, on two waves at different speeds, so the
 *     meniscus never sits still;
 *   • pointer-tracked tilt on a real perspective, so the vessel turns towards
 *     the cursor.
 *
 * Everything is drawn in a 100 × 150 user space.
 */

export type VesselId =
  | "ampoule"
  | "vial"
  | "bfs"
  | "anaesthetics"
  | "infusion"
  | "ophthalmic";

/**
 * Capacity share → visible fill.
 *
 * Strictly proportional would put the 1.8M anaesthetics line at 4% of the
 * body, which renders as three pixels of colour and reads as a bug rather
 * than as a small number. The range is compressed into 14–88% instead: the
 * ordering and the relative gaps survive, and the exact figure is printed
 * directly beside the vessel anyway.
 */
export const levelFor = (share: number) => 0.14 + (share / 100) * 0.74;

/** Interior extents of each body, for placing the meniscus. */
const BODY = {
  ampoule: { top: 58, bottom: 137 },
  vial: { top: 52, bottom: 139 },
  bfs: { top: 48, bottom: 128 },
  anaesthetics: { top: 54, bottom: 140 },
  infusion: { top: 50, bottom: 138 },
  ophthalmic: { top: 66, bottom: 136 },
} as const;

/**
 * The fillable volume of each container, as raw path data.
 *
 * Returned as strings rather than as elements because the same geometry is
 * used twice: once inside `<clipPath>` and once as the glass overlay. A
 * `<clipPath>` only honours shape children — wrapping these in a `<g>` makes
 * the browser silently ignore the whole clip, which is exactly how the
 * blow-fill-seal strip ended up rendering with no liquid in it.
 */
function bodyPaths(id: VesselId): string[] {
  if (id === "ampoule") {
    // Drawn neck, conical shoulder, cylindrical body, rounded heel.
    return [
      "M44 58 q0 -8 3 -12 v-8 h6 v8 q3 4 3 12 v71 q0 8 -6 8 t-6 -8 z",
    ];
  }

  if (id === "vial") {
    return [
      "M33 52 q0 -7 5 -11 v-7 h24 v7 q5 4 5 11 v79 q0 8 -8 8 h-18 q-8 0 -8 -8 z",
    ];
  }

  if (id === "bfs") {
    // Five cells butted together under a common web — a real respule strip is
    // one moulding, not five separate tubes standing in a rack.
    return [0, 1, 2, 3, 4].map((n) => {
      const x = 13 + n * 15;
      return `M${x} 48 h13 v72 q0 8 -6.5 8 t-6.5 -8 z`;
    });
  }

  if (id === "infusion") {
    // Wide-mouth infusion bottle: broad shoulders, straight sides, graduated.
    return [
      "M24 50 q4 -7 11 -10 v-6 h30 v6 q7 3 11 10 v80 q0 8 -8 8 h-36 q-8 0 -8 -8 z",
    ];
  }

  if (id === "ophthalmic") {
    // Small dropper bottle — narrow body, long tapered nozzle above it.
    return [
      "M34 66 q0 -7 4 -11 v-6 h24 v6 q4 4 4 11 v62 q0 8 -7 8 h-18 q-7 0 -7 -8 z",
    ];
  }

  // Volatile anaesthetics — shouldered bottle, wide base.
  return [
    "M26 54 q5 -8 13 -12 v-8 h22 v8 q8 4 13 12 v78 q0 8 -8 8 h-32 q-8 0 -8 -8 z",
  ];
}

export function FormatVessel({
  id,
  level,
  className = "",
}: {
  id: VesselId;
  /** 0–1. Where the meniscus sits inside the body. */
  level: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Tilt is written straight to the node. Routing this through React state
  // would re-render the whole card on every pointer move for no reason.
  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 26}deg) rotateX(${-py * 18}deg)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = wrapRef.current;
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg)";
  }, []);

  const body = BODY[id];
  const clamped = Math.min(1, Math.max(0, level));
  const surface = body.bottom - (body.bottom - body.top) * clamped;
  const paths = bodyPaths(id);

  return (
    <div
      className={`vessel-stage ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={wrapRef} className="vessel-tilt">
        <svg
          viewBox="0 0 100 150"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Cylindrical shading: lit down the left third, shaded on the
                right. This single gradient is what turns a flat outline into
                something that reads as round. */}
            <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="20%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="44%" stopColor="#d8ebf8" stopOpacity="0.16" />
              <stop offset="80%" stopColor="#1c5683" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#1c5683" stopOpacity="0.06" />
            </linearGradient>

            <linearGradient id={`liquid-${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#067daf" />
              <stop offset="24%" stopColor="#2fb9e9" />
              <stop offset="68%" stopColor="#0d9dd2" />
              <stop offset="100%" stopColor="#0a6389" />
            </linearGradient>

            <clipPath id={`clip-${id}`}>
              {paths.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </clipPath>
          </defs>

          {/* Liquid, clipped to the interiors */}
          <g clipPath={`url(#clip-${id})`}>
            <g
              className="vessel-liquid"
              style={{ transform: `translateY(${surface}px)` }}
            >
              <rect
                x="-60"
                y="0"
                width="220"
                height="200"
                fill={`url(#liquid-${id})`}
              />
              {/* Two surfaces at different speeds — the offset between them is
                  what stops the movement reading as one sliding image. */}
              <g className="vessel-wave vessel-wave-a">
                <path
                  d="M-100 0 q12.5 -3.5 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 V40 H-100 Z"
                  fill={`url(#liquid-${id})`}
                />
              </g>
              <g className="vessel-wave vessel-wave-b">
                <path
                  d="M-100 1 q12.5 3 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 V40 H-100 Z"
                  fill="#ffffff"
                  fillOpacity="0.18"
                />
              </g>
            </g>
          </g>

          {/* Glass over the liquid */}
          {paths.map((d, i) => (
            <path key={i} d={d} fill={`url(#glass-${id})`} />
          ))}

          {/* Outline and furniture — closures, rings, seams */}
          <VesselOutline id={id} paths={paths} />
        </svg>
      </div>
    </div>
  );
}

/** Everything that is not the fillable volume: closures, rings, seams. */
function VesselOutline({ id, paths }: { id: VesselId; paths: string[] }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };

  const outline = paths.map((d, i) => <path key={`b${i}`} {...stroke} d={d} />);

  if (id === "ampoule") {
    return (
      <g className="text-brand-600/70">
        {/* Open drawn tip */}
        <path {...stroke} d="M47 38 v-16 q0 -5 3 -5 t3 5 v16" />
        {/* Colour break ring — the identifying mark on a real ampoule */}
        <rect
          x="43"
          y="40"
          width="14"
          height="3.5"
          rx="1.5"
          className="fill-accent-500"
          stroke="none"
        />
        {outline}
      </g>
    );
  }

  if (id === "vial") {
    return (
      <g className="text-brand-600/70">
        {/* Flip-off button, crimp skirt, then the neck flange */}
        <path {...stroke} d="M40 20 q0 -7 10 -7 t10 7 v5 h-20 z" />
        <path {...stroke} d="M38 25 h24 v9 h-24 z" />
        <path {...stroke} d="M44 34 v5" />
        <path {...stroke} d="M56 34 v5" />
        {outline}
      </g>
    );
  }

  if (id === "bfs") {
    return (
      <g className="text-brand-600/70">
        {/* The web the strip is blown from, with a twist-off on every cell */}
        <path {...stroke} d="M11 42 h78" />
        {[0, 1, 2, 3, 4].map((n) => (
          <path
            key={`t${n}`}
            {...stroke}
            d={`M${16.5 + n * 15} 42 v-7 q3 -3 6 0 v7`}
          />
        ))}
        {outline}
      </g>
    );
  }

  if (id === "infusion") {
    return (
      <g className="text-brand-600/70">
        {/* Hanger ring, then the sealed port the giving set spikes */}
        <path {...stroke} d="M50 14 m-6 0 a6 6 0 1 1 12 0 a6 6 0 1 1 -12 0" />
        <path {...stroke} d="M50 20 v6" />
        <path {...stroke} d="M38 26 h24 v8 h-24 z" />
        {outline}
        {/* Graduation marks — the one thing every infusion bottle carries */}
        {[0, 1, 2, 3].map((n) => (
          <path
            key={`g${n}`}
            {...stroke}
            strokeWidth={1.4}
            d={`M64 ${70 + n * 16} h6`}
          />
        ))}
      </g>
    );
  }

  if (id === "ophthalmic") {
    return (
      <g className="text-brand-600/70">
        {/* Tamper cap over a long dropper nozzle */}
        <path {...stroke} d="M42 30 h16 v14 h-16 z" />
        <path {...stroke} d="M45 30 v-8 q5 -4 10 0 v8" />
        <path {...stroke} d="M44 44 q0 6 -2 9 h16 q-2 -3 -2 -9" />
        {outline}
      </g>
    );
  }

  return (
    <g className="text-brand-600/70">
      {/* Screw cap with knurling */}
      <path {...stroke} d="M37 34 v-16 q0 -4 4 -4 h18 q4 0 4 4 v16 z" />
      <path {...stroke} d="M44 18 v16" />
      <path {...stroke} d="M50 18 v16" />
      <path {...stroke} d="M56 18 v16" />
      {outline}
    </g>
  );
}
