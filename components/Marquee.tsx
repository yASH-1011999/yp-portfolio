"use client";

import { STACK_ROWS } from "@/lib/data";

/**
 * Two identical sets per row, each with a trailing gap of its own, so
 * translating the track by exactly -50% lands on a seam you cannot see.
 * The old version relied on flex `gap` between the duplicated sets, which
 * left half a gap unaccounted for and made the loop visibly jump.
 */
export default function Marquee() {
  return (
    <div className="mqWrap">
      {STACK_ROWS.map((row, i) => (
        <div className="mq" key={i}>
          <div
            className="mqInner"
            style={{
              animationDuration: `${38 + i * 12}s`,
              animationDirection: i % 2 ? "reverse" : "normal",
            }}
          >
            <div className="mqSet">
              {row.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="mqSet" aria-hidden="true">
              {row.map((item) => (
                <span key={`${item}-dup`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
