"use client";

import { useEffect } from "react";

/** Writes --mouse-x / --mouse-y straight to :root (no React re-renders)
 *  and reveals the cursor orbit once a real mouse has moved. */
export function PointerEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const write = () => {
      frame = 0;
      root.style.setProperty("--mouse-x", `${x}px`);
      root.style.setProperty("--mouse-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduce.matches) return;
      x = event.clientX;
      y = event.clientY;
      root.dataset.pointer = "live";
      if (!frame) frame = requestAnimationFrame(write);
    };
    const onLeave = () => {
      delete root.dataset.pointer;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      delete root.dataset.pointer;
    };
  }, []);

  return <div className="cursor-orbit" aria-hidden="true" />;
}
