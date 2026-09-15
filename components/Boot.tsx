"use client";

import { useEffect, useState } from "react";

export default function Boot({ onEnter }: { onEnter: () => void }) {
  const [value, setValue] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => {
        const next = Math.min(100, v + Math.random() * 9 + 4);
        if (next >= 100) window.clearInterval(id);
        return next;
      });
    }, 110);
    return () => window.clearInterval(id);
  }, []);

  const ready = value >= 100;

  return (
    <div className={`boot${gone ? " gone" : ""}`}>
      <div className="bootIn">
        <div className="bootNum mono">{Math.floor(value)}</div>
        <div className="bootLbl mono">COMPILING SIX YEARS</div>
        <div className={`bootEnter${ready ? " on" : ""}`}>
          <button
            className="enterBtn"
            onClick={() => {
              setGone(true);
              onEnter();
            }}
          >
            Begin the record
          </button>
        </div>
      </div>
    </div>
  );
}
