"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BackgroundCanvas from "./BackgroundCanvas";
import Boot from "./Boot";
import { CHAPTER_CONTENT } from "./Chapters";
import Cursor from "./Cursor";
import HoldToContinue from "./HoldToContinue";
import { ambient } from "@/lib/audio";
import { CHAPTER_META } from "@/lib/data";

const TRANSITION_MS = 700;

export default function Experience() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(-1);
  const [soundOn, setSoundOn] = useState(false);
  const lockedRef = useRef(true);
  const indexRef = useRef(0);

  indexRef.current = index;
  const chapter = CHAPTER_META[index];

  const goTo = useCallback((next: number) => {
    const target = Math.min(Math.max(next, 0), CHAPTER_META.length - 1);
    if (target === indexRef.current || lockedRef.current) return;
    lockedRef.current = true;
    setLeaving(indexRef.current);
    setIndex(target);
    ambient.setRoot(CHAPTER_META[target].note);
    window.setTimeout(() => {
      lockedRef.current = false;
      setLeaving(-1);
    }, TRANSITION_MS);
  }, []);

  const advance = useCallback(() => {
    goTo(indexRef.current >= CHAPTER_META.length - 1 ? 0 : indexRef.current + 1);
  }, [goTo]);

  // theme follows the chapter
  useEffect(() => {
    document.documentElement.style.setProperty("--acc", chapter.accent);
    document.body.style.background = chapter.bg;
  }, [chapter]);

  // pointer parallax
  useEffect(() => {
    if (!started) return;
    const onMove = (e: PointerEvent) => {
      const root = document.documentElement;
      root.style.setProperty("--px", `${(e.clientX / innerWidth - 0.5) * -16}px`);
      root.style.setProperty("--py", `${(e.clientY / innerHeight - 0.5) * -16}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [started]);

  // wheel, keyboard and touch navigation
  useEffect(() => {
    if (!started) return;

    let accumulated = 0;
    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      const now = performance.now();
      if (now - lastWheel > 220) accumulated = 0;
      lastWheel = now;
      accumulated += e.deltaY;
      if (accumulated > 110) {
        accumulated = 0;
        advance();
      } else if (accumulated < -110) {
        accumulated = 0;
        goTo(indexRef.current - 1);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        advance();
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(indexRef.current - 1);
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(CHAPTER_META.length - 1);
      }
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 60) {
        if (delta > 0) advance();
        else goTo(indexRef.current - 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [started, advance, goTo]);

  return (
    <>
      <BackgroundCanvas mode={chapter.mode} accent={chapter.accent} pulseKey={index} />
      <div className="vignette" />
      <div className="grain" />
      <Cursor />

      <main className="stage">
        {CHAPTER_META.map((meta, i) => (
          <section
            key={meta.id}
            id={meta.id}
            className={`ch${started && i === index ? " active" : ""}${i === leaving ? " out" : ""}`}
            aria-hidden={i !== index}
          >
            {CHAPTER_CONTENT[meta.id](started && i === index)}
          </section>
        ))}
      </main>

      <div className="mark mono">
        <b>YASH PANCHAL</b> <span>— FRONTEND LEAD</span>
      </div>

      <button
        className={`sound mono${soundOn ? " on" : ""}`}
        aria-pressed={soundOn}
        onClick={() => {
          const on = ambient.toggle();
          setSoundOn(on);
          if (on) ambient.setRoot(CHAPTER_META[indexRef.current].note);
        }}
      >
        <span className="eq" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span>{soundOn ? "SOUND ON" : "SOUND OFF"}</span>
      </button>

      <nav className="rail" aria-label="Chapters">
        {CHAPTER_META.map((meta, i) => (
          <button
            key={meta.id}
            className={`rl${i === index ? " on" : ""}`}
            aria-label={`Chapter ${i + 1}: ${meta.label}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
          >
            <u className="mono">{meta.label}</u>
            <b />
          </button>
        ))}
      </nav>

      <div className="hud mono">
        <div className="hudN">
          <em>{String(index + 1).padStart(2, "0")}</em> / 0{CHAPTER_META.length}
        </div>
        <div className="bar">
          <i style={{ width: `${((index + 1) / CHAPTER_META.length) * 100}%` }} />
        </div>
      </div>

      <HoldToContinue
        label={index === CHAPTER_META.length - 1 ? "HOLD TO REPLAY" : "HOLD TO CONTINUE"}
        onComplete={advance}
      />

      {!started && (
        <Boot
          onEnter={() => {
            setStarted(true);
            window.setTimeout(() => {
              lockedRef.current = false;
            }, 520);
          }}
        />
      )}
    </>
  );
}
