"use client";

import { useEffect, useRef, useState } from "react";

// ==========================================
// 1. LUNGS BREATHING ANIMATION (Respiro)
// ==========================================
export function LungsAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [breathPhase, setBreathPhase] = useState("Inhale");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particles representing oxygen/inhalation bubbles
    type Particle = {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
    };
    const particles: Particle[] = [];

    let breathCycle = 0; // 0 to 2*PI

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 4-second breath cycle (240 frames at 60fps)
      breathCycle += 0.02;
      const breathScale = 1 + 0.12 * Math.sin(breathCycle); // scales between 0.88 and 1.12
      const phase = Math.sin(breathCycle) > 0 ? "Inhale" : "Exhale";
      setBreathPhase(phase);

      const centerX = width / 2;
      const centerY = height / 2;

      // Spawn particles during inhale, disperse during exhale
      if (Math.sin(breathCycle) > 0 && Math.random() < 0.25) {
        particles.push({
          x: centerX + (Math.random() - 0.5) * 60 * breathScale,
          y: centerY + 100 * breathScale,
          size: Math.random() * 4 + 1,
          speedY: -(Math.random() * 1.5 + 0.5),
          speedX: (Math.random() - 0.5) * 1,
          alpha: 1,
        });
      }

      // Draw floating oxygen particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha -= 0.005;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(31, 180, 224, ${p.alpha})`; // Cyan accent
        ctx.fill();
      }

      // Draw stylized Lungs SVG outline dynamically using Canvas path
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(breathScale * 1.5, breathScale * 1.5);

      // Draw bronchial tree/windpipe
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, -70);
      ctx.lineTo(0, -20);
      // split
      ctx.lineTo(-25, 5);
      ctx.moveTo(0, -20);
      ctx.lineTo(25, 5);
      ctx.stroke();

      // Left lung lobe
      ctx.beginPath();
      ctx.moveTo(-5, -20);
      // Outer curve
      ctx.bezierCurveTo(-60, -20, -70, 30, -50, 60);
      // Bottom curve
      ctx.bezierCurveTo(-40, 75, -15, 65, -10, 40);
      // Inner curve
      ctx.bezierCurveTo(-5, 20, -2, 0, -5, -20);
      ctx.closePath();
      ctx.fillStyle = "rgba(42, 134, 191, 0.2)"; // Brand blue
      ctx.fill();
      ctx.strokeStyle = "rgba(125, 220, 245, 0.6)"; // Cyan accent glow
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Right lung lobe
      ctx.beginPath();
      ctx.moveTo(5, -20);
      // Outer curve
      ctx.bezierCurveTo(60, -20, 70, 30, 50, 60);
      // Bottom curve
      ctx.bezierCurveTo(40, 75, 15, 65, 10, 40);
      // Inner curve
      ctx.bezierCurveTo(5, 20, 2, 0, 5, -20);
      ctx.closePath();
      ctx.fillStyle = "rgba(42, 134, 191, 0.2)";
      ctx.fill();
      ctx.strokeStyle = "rgba(125, 220, 245, 0.6)";
      ctx.stroke();

      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-[300px]" />
      <div className="mt-4 flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs text-brand-300 font-semibold tracking-wider uppercase">
        <span className="h-2 w-2 rounded-full bg-accent-400 animate-pulse"></span>
        Alveolar Cycle: {breathPhase}
      </div>
    </div>
  );
}

// ==========================================
// 2. CARDIOVASCULAR EKG PULSE (Cardio)
// ==========================================
export function EKGPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pulseRate, setPulseRate] = useState(72);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const points: { x: number; y: number }[] = [];
    let x = 0;
    const speed = 2.5;

    const draw = () => {
      // Fade out background slightly to create trail effect
      ctx.fillStyle = "rgba(5, 18, 31, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Generate EKG pulse sequence
      let y = height / 2;
      const mod = Math.floor(x) % 180;

      if (mod > 40 && mod < 44) {
        // P Wave
        y -= 8;
      } else if (mod >= 44 && mod < 48) {
        y = height / 2;
      } else if (mod === 52) {
        // Q Wave (slight dip)
        y += 12;
      } else if (mod === 54) {
        // R Wave (tall spike)
        y -= 80;
      } else if (mod === 57) {
        // S Wave (deep dip)
        y += 35;
      } else if (mod >= 60 && mod < 62) {
        y = height / 2;
      } else if (mod > 70 && mod < 80) {
        // T Wave
        y -= 15;
      }

      points.push({ x, y });
      if (points.length > width / speed) {
        points.shift();
      }

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      for (let g = 0; g < width; g += 30) {
        ctx.beginPath();
        ctx.moveTo(g, 0);
        ctx.lineTo(g, height);
        ctx.stroke();
      }
      for (let g = 0; g < height; g += 30) {
        ctx.beginPath();
        ctx.moveTo(0, g);
        ctx.lineTo(width, g);
        ctx.stroke();
      }

      // Draw EKG path
      ctx.strokeStyle = "#F43F5E"; // Crimson pulse
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#F43F5E";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        // Map points to draw across the canvas coordinates
        const drawX = (points[i].x * speed) % width;
        if (i === 0 || drawX < points[i - 1].x * speed) {
          ctx.moveTo(drawX, points[i].y);
        } else {
          ctx.lineTo(drawX, points[i].y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      x += 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Pulse rate fluctuation simulation
    const interval = setInterval(() => {
      setPulseRate((prev) => Math.floor(prev + (Math.random() - 0.5) * 4));
    }, 2000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/10 rounded-2xl p-4 border border-white/5">
      <canvas ref={canvasRef} className="w-full h-[250px]" />
      <div className="mt-4 flex items-center justify-between w-full border-t border-white/5 pt-4 text-xs font-semibold uppercase tracking-wider text-rose-400">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping"></span>
          Sinus Rhythm
        </span>
        <span className="numeric">{pulseRate} BPM</span>
      </div>
    </div>
  );
}

// ==========================================
// 3. NEURAL SYNAPSE CONNECTIVITY (Neuro)
// ==========================================
export function SynapseNet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Nodes
    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulseRate: number;
      phase: number;
    };
    const nodes: Node[] = [];
    const nodeCount = 35;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 1.5,
        pulseRate: Math.random() * 0.05 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Mouse coordinates to attract nodes
    const mouse = { x: -9999, y: -9999 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw neural connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Move nodes
        n1.x += n1.vx;
        n1.y += n1.vy;
        n1.phase += n1.pulseRate;

        // Bounce walls
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Attract lightly to mouse
        if (mouse.x !== -9999) {
          const dx = mouse.x - n1.x;
          const dy = mouse.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            n1.x += dx * 0.005;
            n1.y += dy * 0.005;
          }
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.35;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`; // Indigo/Purple synapse line
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw node body with pulsing glow
        const glow = Math.abs(Math.sin(n1.phase));
        ctx.fillStyle = `rgba(192, 132, 252, ${0.4 + glow * 0.6})`;
        ctx.shadowColor = "rgba(168, 85, 247, 0.8)";
        ctx.shadowBlur = glow * 8;
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius + glow * 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-[300px] cursor-pointer" />
      <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-widest text-purple-400 animate-pulse">
        Interactive Synaptic Transmission: Hover to align synapses
      </p>
    </div>
  );
}

// ==========================================
// 4. STERILE INFUSION DRIP (Critical Care)
// ==========================================
export function InfusionDrip() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Drop tracking
    type Drop = {
      y: number;
      speed: number;
      size: number;
    };
    const drops: Drop[] = [];

    // Ripple tracking
    type Ripple = {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    };
    const ripples: Ripple[] = [];

    let dropTimer = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const dripY = height * 0.25;
      const waterLevelY = height * 0.75;

      // Draw stylized drip bottle chamber
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      // Outer chamber outline
      ctx.moveTo(centerX - 25, dripY - 50);
      ctx.lineTo(centerX - 25, dripY);
      ctx.quadraticCurveTo(centerX - 25, dripY + 20, centerX, dripY + 20);
      ctx.quadraticCurveTo(centerX + 25, dripY + 20, centerX + 25, dripY);
      ctx.lineTo(centerX + 25, dripY - 50);
      ctx.stroke();

      // Draw dropper nozzle inside chamber
      ctx.fillStyle = "rgba(244, 63, 94, 0.7)"; // Emergency rose nozzle
      ctx.fillRect(centerX - 3, dripY - 20, 6, 20);

      // Handle drop generation (approx every 1.5 seconds)
      dropTimer += 1;
      if (dropTimer >= 90) {
        dropTimer = 0;
        drops.push({
          y: dripY,
          speed: 1.5,
          size: 4,
        });
      }

      // Handle dropping animation
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.speed += 0.18; // gravity acceleration
        d.y += d.speed;

        // Collision with reservoir water level
        if (d.y >= waterLevelY) {
          // create a splash ripple
          ripples.push({
            x: centerX,
            y: waterLevelY,
            radius: 0.1,
            maxRadius: 60,
            alpha: 1,
          });
          drops.splice(i, 1);
          continue;
        }

        // Draw tear-shaped droplet
        ctx.fillStyle = "rgba(125, 220, 245, 0.9)"; // Sterile blue glow drop
        ctx.shadowColor = "rgba(70, 201, 238, 0.8)";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, d.y - d.size);
        ctx.quadraticCurveTo(centerX - d.size, d.y, centerX, d.y + d.size * 1.5);
        ctx.quadraticCurveTo(centerX + d.size, d.y, centerX, d.y - d.size);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw ripples
      ctx.lineWidth = 1.5;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.8;
        r.alpha -= 0.02;

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(125, 220, 245, ${r.alpha})`;
        ctx.shadowColor = "rgba(125, 220, 245, 0.4)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        // Elliptical ripple looking 3D
        ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw sterile reservoir level at bottom
      ctx.fillStyle = "rgba(42, 134, 191, 0.15)";
      ctx.fillRect(centerX - 100, waterLevelY, 200, height - waterLevelY);
      ctx.strokeStyle = "rgba(125, 220, 245, 0.4)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(centerX - 100, waterLevelY);
      ctx.lineTo(centerX + 100, waterLevelY);
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-[300px]" />
      <span className="mt-4 rounded-full bg-rose-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-400 border border-rose-500/20 animate-pulse">
        Sterile infusion speed: 40 gtts/min
      </span>
    </div>
  );
}

// ==========================================
// 5. DNA DOUBLE HELIX (Pharma/General Med)
// ==========================================
export function DNAHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    let angle = 0;
    const strandsCount = 18;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const amplitude = 55; // width of helix

      angle += 0.025;

      for (let i = 0; i < strandsCount; i++) {
        // Position of each strand down the helix
        const progress = i / strandsCount;
        const currentY = 50 + progress * (height - 100);

        // Map to sine wave phase offset
        const phaseOffset = progress * Math.PI * 2.8 + angle;

        // Node 1 position
        const x1 = centerX + Math.sin(phaseOffset) * amplitude;
        // Node 2 position (exactly opposite phase)
        const x2 = centerX - Math.sin(phaseOffset) * amplitude;

        // Depth perspective (closer nodes are larger and brighter)
        const cosPhase = Math.cos(phaseOffset);
        const zDepth1 = (cosPhase + 1) / 2; // 0 to 1
        const zDepth2 = (-cosPhase + 1) / 2; // 0 to 1

        // Connect the two strand nodes with base pair ladders
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 + Math.min(zDepth1, zDepth2) * 0.15})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(x1, currentY);
        ctx.lineTo(x2, currentY);
        ctx.stroke();

        // Base pair codon dots color-themed representing Adenine, Thymine, Cytosine, Guanine
        const color1 = zDepth1 > 0.5 ? "rgba(74, 166, 215, " : "rgba(31, 180, 224, "; // Brand cyan / blue
        const color2 = zDepth2 > 0.5 ? "rgba(34, 197, 94, " : "rgba(168, 85, 247, "; // Green / Purple

        // Node 1 drawing
        ctx.fillStyle = `${color1}${0.4 + zDepth1 * 0.6})`;
        ctx.beginPath();
        ctx.arc(x1, currentY, 4.5 + zDepth1 * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node 2 drawing
        ctx.fillStyle = `${color2}${0.4 + zDepth2 * 0.6})`;
        ctx.beginPath();
        ctx.arc(x2, currentY, 4.5 + zDepth2 * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-[300px]" />
      <span className="mt-4 rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
        Molecular DNA Helix model
      </span>
    </div>
  );
}
