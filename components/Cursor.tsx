"use client";

import { useEffect, useRef } from "react";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function Cursor() {
  const ring = useRef<HTMLDivElement | null>(null);
  const dot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.body.classList.add("has-cursor");

    const pos = { x: innerWidth / 2, y: innerHeight / 2, lx: 0, ly: 0 };
    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a, button, [role='button'], .fbar, .mqSet span");
      ring.current?.classList.toggle("big", interactive);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);

    let raf = requestAnimationFrame(function loop() {
      raf = requestAnimationFrame(loop);
      pos.lx = lerp(pos.lx, pos.x, 0.18);
      pos.ly = lerp(pos.ly, pos.y, 0.18);
      if (ring.current) {
        ring.current.style.transform = `translate(${pos.lx}px, ${pos.ly}px)`;
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cur" aria-hidden="true" />
      <div ref={dot} className="curDot" aria-hidden="true" />
    </>
  );
}
