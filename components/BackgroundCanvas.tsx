"use client";

import { useEffect, useRef } from "react";
import type { CanvasMode } from "@/lib/data";

type Particle = { x: number; y: number; z: number; a: number; s: number };

const COUNT = 240;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const hexToRgb = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];
const noise = (x: number, y: number, t: number) =>
  Math.sin(x * 2.1 + t) * Math.cos(y * 2.6 - t * 0.7) +
  Math.sin((x + y) * 1.7 + t * 0.35);

type Props = { mode: CanvasMode; accent: string; pulseKey: number };

export default function BackgroundCanvas({ mode, accent, pulseKey }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef<CanvasMode>(mode);
  const targetRef = useRef<[number, number, number]>(hexToRgb(accent));
  const pulseRef = useRef(0);

  modeRef.current = mode;
  targetRef.current = hexToRgb(accent);

  useEffect(() => {
    pulseRef.current = 1;
  }, [pulseKey]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      a: Math.random() * 6.28,
      s: Math.random(),
    }));

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const colour: [number, number, number] = [...targetRef.current];
    let energy = 0;
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const t = now / 1000;

      pointer.x = lerp(pointer.x, pointer.tx, 0.055);
      pointer.y = lerp(pointer.y, pointer.ty, 0.055);
      energy = lerp(energy, pulseRef.current, 0.07);
      pulseRef.current *= 0.9;
      for (let i = 0; i < 3; i++) {
        colour[i] = lerp(colour[i], targetRef.current[i], 0.05);
      }

      const c = `${colour[0] | 0},${colour[1] | 0},${colour[2] | 0}`;
      const dx = pointer.x - 0.5;
      const dy = pointer.y - 0.5;
      const m = modeRef.current;

      ctx.clearRect(0, 0, w, h);
      if (reduce) {
        ctx.fillStyle = `rgba(${c},0.05)`;
        for (const p of particles) ctx.fillRect(p.x * w, p.y * h, 1.5, 1.5);
        return;
      }

      if (m === "field") {
        ctx.lineWidth = 1;
        for (const p of particles) {
          const a = noise(p.x * 1.5, p.y * 1.5, t * 0.12) * Math.PI + p.a * 0.15;
          const sp = (0.0007 + p.z * 0.0016) * (1 + energy * 2.4);
          p.x += Math.cos(a) * sp;
          p.y += Math.sin(a) * sp;
          if (p.x < -0.05) p.x = 1.05;
          if (p.x > 1.05) p.x = -0.05;
          if (p.y < -0.05) p.y = 1.05;
          if (p.y > 1.05) p.y = -0.05;
          const X = (p.x + dx * p.z * 0.09) * w;
          const Y = (p.y + dy * p.z * 0.09) * h;
          const L = 8 + p.z * 40;
          ctx.strokeStyle = `rgba(${c},${0.05 + p.z * 0.2})`;
          ctx.beginPath();
          ctx.moveTo(X, Y);
          ctx.lineTo(X - Math.cos(a) * L, Y - Math.sin(a) * L);
          ctx.stroke();
        }
      } else if (m === "trace") {
        for (let r = 0; r < 9; r++) {
          const base = h * (0.14 + r * 0.085) + dy * 20 * (r % 3);
          ctx.beginPath();
          for (let x = 0; x <= w; x += 7) {
            const u = x / w;
            const y =
              base +
              Math.sin(u * 7 + t * (0.5 + r * 0.16)) * 22 * Math.sin(u * 3.1 + t * 0.3) +
              Math.sin(u * 23 + t * 1.6 + r) * (4 + energy * 22);
            if (x) ctx.lineTo(x, y);
            else ctx.moveTo(x, y);
          }
          ctx.strokeStyle = `rgba(${c},${0.06 + (r === 4 ? 0.16 : 0.05)})`;
          ctx.lineWidth = r === 4 ? 1.4 : 1;
          ctx.stroke();
        }
      } else if (m === "bars") {
        const n = 54;
        const bw = w / n;
        for (let i = 0; i < n; i++) {
          const bh =
            (Math.sin(i * 0.42 + t * 1.05) * 0.5 + 0.5) *
            (Math.sin(i * 0.13 + t * 0.36) * 0.5 + 0.5) *
            h *
            (0.42 + energy * 0.5);
          ctx.fillStyle = `rgba(${c},${0.045 + (i % 7 === 0 ? 0.09 : 0.02)})`;
          ctx.fillRect(i * bw + 1 + dx * 14 * (i % 3), h - bh, bw - 2, bh);
        }
      } else if (m === "grid") {
        ctx.lineWidth = 1;
        const hz = h * 0.56 + dy * 36;
        for (let i = 1; i < 26; i++) {
          const p = i / 26;
          const y = hz + Math.pow(p, 2.6) * h * 0.72;
          ctx.strokeStyle = `rgba(${c},${0.045 + p * 0.1})`;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
        for (let i = -16; i <= 16; i++) {
          const X = w / 2 + i * (w / 16) + dx * 54;
          ctx.strokeStyle = `rgba(${c},0.06)`;
          ctx.beginPath();
          ctx.moveTo(w / 2 + i * 10 + dx * 54, hz);
          ctx.lineTo(X * 1.7 - w * 0.35, h);
          ctx.stroke();
        }
      } else if (m === "rings") {
        const cx = w / 2 + dx * 46;
        const cy = h / 2 + dy * 46;
        for (let i = 0; i < 11; i++) {
          const ph = (t * 0.16 + i * 0.09) % 1;
          const r = ph * Math.max(w, h) * 0.62;
          ctx.strokeStyle = `rgba(${c},${(1 - ph) * 0.16})`;
          ctx.lineWidth = 1 + (1 - ph) * 1.6;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${c},0.22)`;
        for (const p of particles) {
          if (p.z > 0.35) continue;
          ctx.fillRect((p.x + dx * 0.05) * w, (p.y + dy * 0.05) * h, 1.4, 1.4);
        }
      } else if (m === "rain") {
        for (const p of particles) {
          p.y += (0.0018 + p.z * 0.006) * (1 + energy * 3);
          if (p.y > 1.1) {
            p.y = -0.1;
            p.x = Math.random();
          }
          const X = (p.x + dx * p.z * 0.07) * w;
          const Y = p.y * h;
          const L = 18 + p.z * 90;
          const g = ctx.createLinearGradient(X, Y - L, X, Y);
          g.addColorStop(0, `rgba(${c},0)`);
          g.addColorStop(1, `rgba(${c},${0.07 + p.z * 0.2})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(X, Y - L);
          ctx.lineTo(X, Y);
          ctx.stroke();
        }
      } else if (m === "orbit") {
        const cx = w / 2 + dx * 40;
        const cy = h / 2 + dy * 40;
        const pts: [number, number][] = [];
        for (let i = 0; i < 32; i++) {
          const a = t * 0.11 + i * 0.6;
          const r = Math.min(w, h) * (0.16 + (i % 5) * 0.075);
          pts.push([
            cx + Math.cos(a * (1 + (i % 3) * 0.14)) * r * 1.5,
            cy + Math.sin(a * (1 + (i % 4) * 0.1)) * r,
          ]);
        }
        ctx.lineWidth = 1;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]);
            if (d < 150) {
              ctx.strokeStyle = `rgba(${c},${(1 - d / 150) * 0.13})`;
              ctx.beginPath();
              ctx.moveTo(pts[i][0], pts[i][1]);
              ctx.lineTo(pts[j][0], pts[j][1]);
              ctx.stroke();
            }
          }
        }
        ctx.fillStyle = `rgba(${c},0.4)`;
        for (const p of pts) {
          ctx.beginPath();
          ctx.arc(p[0], p[1], 1.7, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        for (const p of particles) {
          p.x += 0.00012 + p.z * 0.0004;
          if (p.x > 1.05) p.x = -0.05;
          const X = (p.x + dx * p.z * 0.05) * w;
          const Y = (p.y + dy * p.z * 0.05) * h;
          const tw = 0.1 + Math.abs(Math.sin(t * 0.7 + p.s * 9)) * 0.28;
          ctx.fillStyle = `rgba(${c},${tw * (0.3 + p.z)})`;
          ctx.fillRect(X, Y, 1 + p.z * 1.4, 1 + p.z * 1.4);
        }
      }
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="bgCanvas" aria-hidden="true" />;
}
