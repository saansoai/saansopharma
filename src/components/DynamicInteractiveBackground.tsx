"use client";

import { useEffect, useRef } from "react";

/**
 * Dynamic Interactive Fluid Background
 *
 * 60fps canvas-based fluid mesh background with dynamic cursor tracking.
 * Draws vibrant glowing powder-blue, azure cyan, and electric blue ambient fluid orbs
 * that gently float and dynamically deform/displace as the cursor moves across the screen.
 */
export function DynamicInteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Motion here is decoration. If the visitor has asked for less of it, draw
    // nothing at all rather than a slower version of the same thing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /**
     * Backing-store resolution.
     *
     * Everything drawn here is a soft radial gradient, so the buffer can be a
     * good deal smaller than the element and stretched back up by the compositor
     * with nothing visible lost. Full-screen gradient fills are the expensive
     * part of this loop, and their cost scales with pixel count — at 0.5 the
     * fill work drops to a quarter. Phones get the smaller factor because they
     * have the least fill rate to spare.
     */
    const bufferScale = window.innerWidth < 768 ? 0.45 : 0.55;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const sizeCanvas = () => {
      width = Math.round(window.innerWidth * bufferScale);
      height = Math.round(window.innerHeight * bufferScale);
      canvas.width = width;
      canvas.height = height;
    };
    sizeCanvas();

    /**
     * The orb radii below were picked against a desktop viewport. Left at those
     * values on a 390px-wide phone, eight blobs of 220–400px each cover the
     * screen several times over and the whole page sits under a flat blue wash.
     * Scaling them to the viewport's long edge keeps the same look at every
     * width.
     *
     * Two factors, kept separate: the first is the look, measured against the
     * CSS viewport; the second converts those CSS-pixel radii into the smaller
     * buffer. Measuring the look against the buffer instead would tie the
     * artwork's proportions to the resolution it happens to be drawn at.
     */
    const viewScale = () =>
      Math.min(1, Math.max(window.innerWidth, window.innerHeight) / 1280);
    let scale = viewScale() * bufferScale;

    // A touch device never fires mousemove, so the cursor aura would sit frozen
    // in the middle of the screen as one saturated blob. It only appears once a
    // real pointer has moved.
    let hasPointer = false;

    // Mouse coordinates with target & smoothed position (lerp)
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleResize = () => {
      if (!canvas) return;
      sizeCanvas();
      scale = viewScale() * bufferScale;
    };

    // Pointer coordinates arrive in CSS pixels and have to be brought into the
    // buffer's coordinate space, which is smaller by `bufferScale`.
    const handleMouseMove = (e: MouseEvent) => {
      hasPointer = true;
      mouse.targetX = e.clientX * bufferScale;
      mouse.targetY = e.clientY * bufferScale;
    };

    // Nothing to draw for a tab nobody is looking at.
    let paused = document.hidden;
    const handleVisibility = () => {
      paused = document.hidden;
      if (!paused) {
        last = 0;
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    // Fewer orbs on a small screen — there is less room for them to read as
    // separate washes, and a phone GPU has less to spend on overdraw.
    const numOrbs = window.innerWidth < 768 ? 5 : 8;
    const orbs = Array.from({ length: numOrbs }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      baseRadius: 220 + (i % 4) * 60,
      radius: 220 + (i % 4) * 60,
      color:
        i % 4 === 0
          ? "rgba(56, 189, 248, 0.55)" // Powder Blue / Cyan (sky-400)
          : i % 4 === 1
          ? "rgba(2, 132, 199, 0.45)" // Azure Blue (sky-600)
          : i % 4 === 2
          ? "rgba(186, 230, 253, 0.65)" // Bright Ice Blue (sky-200)
          : "rgba(147, 197, 253, 0.50)", // Soft Blue (blue-300)
      parallaxFactor: 0.03 + (i % 3) * 0.02,
    }));

    let time = 0;

    /**
     * Frame pacing.
     *
     * The washes move slowly enough that 30fps is indistinguishable from 60,
     * and halving the frame count halves the fill work — which is what leaves
     * headroom for the scroll to stay smooth while this runs behind it. `last`
     * is reset to 0 on resume so the first frame back never sees a huge delta.
     */
    const frameInterval = 1000 / 30;
    let last = 0;

    const render = (now = 0) => {
      if (paused) return;

      animationFrameId = requestAnimationFrame(render);

      if (now - last < frameInterval) return;
      // Keeping the remainder would let error accumulate into visible stutter.
      last = now;

      time += 0.03;

      // Smooth mouse lerp (spring interpolation)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Render each ambient fluid orb
      orbs.forEach((orb, i) => {
        orb.radius = orb.baseRadius * scale;

        // Natural organic oscillation
        orb.x += orb.vx + Math.sin(time + i) * 0.4;
        orb.y += orb.vy + Math.cos(time + i * 1.5) * 0.4;

        // Wrap around boundaries smoothly
        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        // Mouse displacement effect
        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const dist = Math.hypot(dx, dy);

        let drawX = orb.x + (mouse.x - width / 2) * orb.parallaxFactor;
        let drawY = orb.y + (mouse.y - height / 2) * orb.parallaxFactor;

        const reach = 400 * scale;
        if (hasPointer && dist < reach && dist > 0) {
          const push = (reach - dist) * 0.15;
          drawX -= (dx / dist) * push;
          drawY -= (dy / dist) * push;
        }

        // Draw soft radial gradient blob
        const gradient = ctx.createRadialGradient(
          drawX,
          drawY,
          0,
          drawX,
          drawY,
          orb.radius
        );

        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(0.6, orb.color.replace(/[\d.]+\)$/, "0.15)"));
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(drawX, drawY, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Cursor interactive vibrant aura follower — pointer devices only.
      if (hasPointer) {
        const auraRadius = 240 * scale;
        const cursorGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          auraRadius
        );
        cursorGradient.addColorStop(0, "rgba(56, 189, 248, 0.45)");
        cursorGradient.addColorStop(0.4, "rgba(14, 165, 233, 0.25)");
        cursorGradient.addColorStop(0.8, "rgba(186, 230, 253, 0.10)");
        cursorGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = cursorGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, auraRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (!paused) render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
    />
  );
}
