"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Tile = { label: string; value: string; sub: string };

const clamp = (n: number) => Math.max(-1, Math.min(1, n));
const fmt = (n: number) => `${n < 0 ? "-" : ""}${Math.abs(n).toFixed(2).slice(1)}`;
const IDLE_READOUT = "X.07 / Y.19";

/** Pointer-reactive stage. All movement is written as CSS variables directly
 *  on the element (no React state), throttled with requestAnimationFrame.
 *  Tilt only runs for a real mouse on wide screens; otherwise the scene is a
 *  stable 2D artifact. */
export function ProjectStage({
  children,
  tile,
  label,
}: {
  children: ReactNode;
  tile: Tile;
  label: string;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const wide = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let nx = 0;
    let ny = 0;

    const apply = () => {
      frame = 0;
      el.style.setProperty("--rx", `${ny * -8}deg`);
      el.style.setProperty("--ry", `${nx * 10}deg`);
      el.style.setProperty("--sx", `${(nx + 1) * 50}%`);
      el.style.setProperty("--sy", `${(ny + 1) * 50}%`);
      if (readout.current) readout.current.textContent = `X${fmt(nx)} / Y${fmt(ny)}`;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !wide.matches || reduce.matches) return;
      const rect = el.getBoundingClientRect();
      nx = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1);
      ny = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1);
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      nx = 0;
      ny = 0;
      if (frame) cancelAnimationFrame(frame);
      apply();
      if (readout.current) readout.current.textContent = IDLE_READOUT;
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="stage" ref={stage} role="group" aria-label={label}>
      <div className="stage-spot" aria-hidden="true" />
      <p className="stage-note" aria-hidden="true">
        Move your pointer
        <br />
        Shift the view
      </p>
      <span className="stage-readout" ref={readout} aria-hidden="true">
        {IDLE_READOUT}
      </span>

      <div className="stage-plane">
        <div className="stage-window">{children}</div>
        <div className="stage-tile">
          <span className="t-label">{tile.label}</span>
          <span className="t-value">{tile.value}</span>
          <span className="t-sub">{tile.sub}</span>
        </div>
      </div>
    </div>
  );
}
