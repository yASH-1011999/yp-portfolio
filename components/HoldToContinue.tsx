"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CIRCUMFERENCE = 2 * Math.PI * 29; // r = 29
const FILL_SECONDS = 0.85;
const DRAIN_SECONDS = 0.28;

type Props = {
  label: string;
  onComplete: () => void;
  disabled?: boolean;
};

/**
 * Press and hold to advance. The earlier version leaked its animation-frame
 * id, so the loop died after the first successful hold. This one tracks the
 * frame id honestly: it is set to 0 whenever the loop stops, which is the
 * only signal `start` uses to decide whether to kick it off again.
 */
export default function HoldToContinue({ label, onComplete, disabled }: Props) {
  const ringRef = useRef<SVGCircleElement | null>(null);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const progressRef = useRef(0);
  const holdingRef = useRef(false);
  const doneRef = useRef(onComplete);
  const [holding, setHolding] = useState(false);

  doneRef.current = onComplete;

  const paint = useCallback((value: number) => {
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = String(
        CIRCUMFERENCE - CIRCUMFERENCE * value
      );
    }
  }, []);

  const tick = useCallback(
    (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.1);
      lastRef.current = now;

      const rate = holdingRef.current ? 1 / FILL_SECONDS : -1 / DRAIN_SECONDS;
      progressRef.current = Math.min(
        1,
        Math.max(0, progressRef.current + rate * dt)
      );
      paint(progressRef.current);

      if (progressRef.current >= 1) {
        holdingRef.current = false;
        progressRef.current = 0;
        paint(0);
        setHolding(false);
        rafRef.current = 0; // loop is over, let `start` restart it next time
        doneRef.current();
        return;
      }

      if (progressRef.current > 0 || holdingRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = 0;
      }
    },
    [paint]
  );

  const ensureLoop = useCallback(() => {
    if (rafRef.current) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const start = useCallback(() => {
    if (disabled) return;
    holdingRef.current = true;
    setHolding(true);
    ensureLoop();
  }, [disabled, ensureLoop]);

  const stop = useCallback(() => {
    if (!holdingRef.current) return;
    holdingRef.current = false;
    setHolding(false);
    ensureLoop();
  }, [ensureLoop]);

  // Release anywhere on the page counts as a release, not just on the button.
  useEffect(() => {
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    window.addEventListener("blur", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      window.removeEventListener("blur", stop);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [stop]);

  return (
    <div
      className={`hold${holding ? " holding" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture?.(e.pointerId);
        start();
      }}
      onKeyDown={(e) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
          e.preventDefault();
          start();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " " || e.key === "Enter") stop();
      }}
      onBlur={stop}
    >
      <div className="holdRing">
        <svg viewBox="0 0 62 62" aria-hidden="true">
          <circle className="holdBg" cx="31" cy="31" r="29" />
          <circle
            ref={ringRef}
            className="holdFg"
            cx="31"
            cy="31"
            r="29"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>
        <span className="holdDot" />
      </div>
      <span className="holdLbl mono">{label}</span>
    </div>
  );
}
