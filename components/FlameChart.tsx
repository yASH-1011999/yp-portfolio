"use client";

import { useRef, useState } from "react";
import { FRAMES, type Frame } from "@/lib/data";

const START = 2021 + 6 / 12;
const END = 2026 + 9 / 12;
const SPAN = END - START;
const scale = (t: number) => ((t - START) / SPAN) * 1000;
const ROW_Y = [8, 42, 76, 110];
const BAR_H = 26;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function FlameChart() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Frame | null>(null);

  const place = (clientX: number, clientY: number) => {
    const stage = stageRef.current;
    const tip = tipRef.current;
    if (!stage || !tip) return;
    const r = stage.getBoundingClientRect();
    tip.style.left = `${clamp(clientX - r.left + 14, 8, r.width - tip.offsetWidth - 8)}px`;
    tip.style.top = `${clamp(clientY - r.top - tip.offsetHeight - 12, 4, r.height - tip.offsetHeight)}px`;
  };

  return (
    <div className="scope">
      <div className="scopeBar mono">
        <span className="rec" />
        RECORDING · JUL 2021 — SEP 2026
      </div>
      <div className="scopeStage" ref={stageRef}>
        <svg
          className={`flame${active ? " dim" : ""}`}
          viewBox="0 0 1000 176"
          preserveAspectRatio="none"
          role="img"
          aria-label="Timeline of roles and projects from 2021 to 2026"
        >
          {FRAMES.map((f, i) => {
            const x = scale(f.from);
            const width = Math.max(7, scale(f.to) - x);
            return (
              <g
                className="fbar"
                key={f.title}
                tabIndex={0}
                onMouseEnter={(e) => {
                  setActive(f);
                  place(e.clientX, e.clientY);
                }}
                onMouseMove={(e) => place(e.clientX, e.clientY)}
                onMouseLeave={() => setActive(null)}
                onFocus={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setActive(f);
                  place(r.left + 40, r.top);
                }}
                onBlur={() => setActive(null)}
              >
                <rect
                  x={x}
                  y={ROW_Y[f.depth]}
                  width={width}
                  height={BAR_H}
                  rx={3}
                  fill={f.color}
                  style={{ transitionDelay: `${0.25 + i * 0.05}s` }}
                />
                {width > 105 && (
                  <text x={x + 9} y={ROW_Y[f.depth] + 17}>
                    {f.title}
                  </text>
                )}
              </g>
            );
          })}
          <g className="axis">
            {[2022, 2023, 2024, 2025, 2026].map((y) => (
              <g key={y}>
                <line x1={scale(y)} y1={140} x2={scale(y)} y2={147} />
                <text x={scale(y)} y={161} textAnchor="middle">
                  {y}
                </text>
              </g>
            ))}
            <line x1={0} y1={140} x2={1000} y2={140} />
          </g>
        </svg>

        <div ref={tipRef} className={`tip${active ? " on" : ""}`}>
          <h4>{active?.title}</h4>
          <p>{active?.detail}</p>
          <u className="mono">{active?.stack}</u>
        </div>
      </div>
    </div>
  );
}
