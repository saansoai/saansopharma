"use client";

import { useEffect, useRef } from "react";

/**
 * Laminar airflow.
 *
 * The ambient layer behind every section below the hero. It draws the one
 * thing that actually defines a sterile fill room and that nobody ever
 * pictures: unidirectional laminar flow — the curtain of filtered air moving
 * steadily downward over the filling line at a fixed velocity. Break the flow
 * and you break the grade; that is the whole discipline in one image.
 *
 * Chosen deliberately over the obvious options. Floating capsules, DNA
 * ribbons, orbiting molecules and drifting particles are exactly the clichés
 * the brief rules out, and a particle field in a *sterile* context is worse
 * than a cliché — visible particulate is the failure state of a cleanroom.
 * Flow lines say the same "pharmaceutical" thing and say it correctly.
 *
 * Behaviour:
 *   • streamlines drift downward continuously, so it is alive with no cursor;
 *   • near the pointer they bow outward the way flow separates around a body
 *     placed in it, and close back up behind;
 *   • three depth layers parallax against pointer movement at different rates,
 *     which is what gives it dimension rather than a flat sheet of lines.
 *
 * It is decoration, so it is cheap and it yields: off for coarse pointers and
 * reduced-motion, paused when the tab is hidden, and skipped entirely for any
 * streamline the pointer is nowhere near.
 */

type Layer = {
  /** Horizontal gap between streamlines, px. */
  spacing: number;
  width: number;
  alpha: number;
  /** Radius of the pointer's influence, px. */
  radius: number;
  /** How far a streamline is pushed aside at the centre of that radius. */
  strength: number;
  /** Downward dash travel, px per second. */
  speed: number;
  /** Horizontal parallax against pointer movement, px. */
  parallax: number;
  colour: [number, number, number];
};

const BRAND: [number, number, number] = [31, 107, 161];
const AZURE: [number, number, number] = [13, 157, 210];

/**
 * Alphas are set high for what they are because the field is viewed through a
 * section surface at ~75% opacity — only about a quarter of this reaches the
 * eye. 0.20 here lands at roughly 0.05 on screen, which is invisible; these
 * values put the near layer at a legible ~0.12.
 */
const LAYERS: Layer[] = [
  { spacing: 44, width: 1.1, alpha: 0.4, radius: 155, strength: 18, speed: 15, parallax: -5, colour: BRAND },
  { spacing: 66, width: 1.35, alpha: 0.55, radius: 210, strength: 34, speed: 24, parallax: -12, colour: BRAND },
  { spacing: 92, width: 1.7, alpha: 0.72, radius: 275, strength: 56, speed: 36, parallax: -22, colour: AZURE },
];

/** Vertical distance between sampled points on a deflected streamline. */
const STEP = 26;

export function LaminarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    // Bound to a const so the null check still holds inside `render`, which is
    // a hoisted declaration and would otherwise lose the narrowing.
    const ctx = context;

    /**
     * Whether the flow moves and reacts — not whether it exists.
     *
     * An earlier version bailed out entirely here, which meant anyone with
     * reduced-motion set saw a blank background and nothing else. Windows has
     * that switch on by default under some power and accessibility settings,
     * so "no animation" is a common state, not an edge case. Reduced motion
     * should take away the movement, not the graphic: those visitors get the
     * same field, drawn once and left still.
     */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const shouldAnimate = () =>
      !reduced.matches && !coarse.matches && window.innerWidth >= 1024;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // A still field has no loop to repaint it, so the resize has to.
      if (!shouldAnimate()) render(0);
    };

    // Target vs. eased pointer. The lag is what makes the flow feel like it
    // has mass instead of snapping to the cursor.
    let targetX = -9999;
    let targetY = -9999;
    let mx = -9999;
    let my = -9999;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    const onOut = () => {
      targetX = -9999;
      targetY = -9999;
    };

    let phase = 0;
    let last = performance.now();
    let frame = 0;
    let running = false;

    /** One complete paint of the field. Used by the loop and by the still case. */
    function render(dashPhase: number) {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";

      const cx = w / 2;

      for (const layer of LAYERS) {
        const shift = mx > -9000 ? ((mx - cx) / cx) * layer.parallax : 0;

        ctx.lineWidth = layer.width;
        ctx.strokeStyle = `rgba(${layer.colour[0]}, ${layer.colour[1]}, ${layer.colour[2]}, ${layer.alpha})`;
        // The dash is the airflow direction — offsetting it downward over time
        // is what reads as movement.
        ctx.setLineDash([7, 16]);
        ctx.lineDashOffset = -dashPhase * layer.speed;

        const reach = layer.radius + layer.strength;

        for (let x = -layer.spacing; x < w + layer.spacing; x += layer.spacing) {
          const baseX = x + shift;

          // Streamlines the pointer is nowhere near stay perfectly straight,
          // which is both correct and two points instead of forty.
          if (mx < -9000 || Math.abs(baseX - mx) > reach) {
            ctx.beginPath();
            ctx.moveTo(baseX, -10);
            ctx.lineTo(baseX, h + 10);
            ctx.stroke();
            continue;
          }

          ctx.beginPath();
          for (let y = -10; y <= h + 10; y += STEP) {
            let px = baseX;
            let py = y;

            const dx = baseX - mx;
            const dy = y - my;
            const d = Math.hypot(dx, dy);

            if (d < layer.radius && d > 0.001) {
              // Squared falloff: a firm push at the centre that fades to
              // nothing at the rim, so lines rejoin the field smoothly.
              const f = 1 - d / layer.radius;
              const push = f * f * layer.strength;
              px += (dx / d) * push;
              // Vertical component is damped — the flow slides around the
              // obstacle rather than piling up above it.
              py += (dy / d) * push * 0.3;
            }

            if (y === -10) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      }
    }

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      mx += (targetX - mx) * 0.12;
      my += (targetY - my) * 0.12;
      phase += dt;

      render(phase);
      if (running) frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    // Size first, then either animate or paint the single still frame.
    resize();
    if (shouldAnimate()) start();

    /** Toggling the OS motion setting takes effect without a reload. */
    const onPrefChange = () => {
      if (shouldAnimate()) {
        start();
      } else {
        stop();
        mx = my = targetX = targetY = -9999;
        render(0);
      }
    };
    reduced.addEventListener("change", onPrefChange);
    coarse.addEventListener("change", onPrefChange);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (shouldAnimate()) start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onOut);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      reduced.removeEventListener("change", onPrefChange);
      coarse.removeEventListener("change", onPrefChange);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onOut);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    // Shown at every width. Below lg it is painted once and left still, which
    // costs a single frame and keeps the page from going flat on a phone.
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
