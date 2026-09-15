"use client";

import { useEffect, useRef, useState } from "react";

type Props = { to: number; prefix?: string; suffix?: string; active: boolean };

export default function Count({ to, prefix = "", suffix = "", active }: Props) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1200);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, to]);

  return (
    <span>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
