"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (fill.current) fill.current.style.transform = `scaleX(${progress})`;
      if (!reduce.matches) root.style.setProperty("--scroll-y", `${y}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-meter" aria-hidden="true">
      <div className="scroll-meter-fill" ref={fill} />
    </div>
  );
}
