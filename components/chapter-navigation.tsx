"use client";

import { useEffect, useState } from "react";
import { CHAPTERS } from "@/lib/portfolio-data";

export function ChapterNavigation() {
  const [active, setActive] = useState<string>(CHAPTERS[0].id);

  useEffect(() => {
    const targets = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    // A thin band across the middle of the viewport decides the active chapter.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = CHAPTERS.find((c) => c.id === active) ?? CHAPTERS[0];

  return (
    <>
      <nav className="chapter-rail" aria-label="Chapters">
        <ul>
          {CHAPTERS.map((chapter) => (
            <li key={chapter.id}>
              <a
                className="rail-link"
                href={`#${chapter.id}`}
                aria-label={`Chapter ${chapter.n}: ${chapter.label}`}
                aria-current={active === chapter.id ? "location" : undefined}
              >
                <span aria-hidden="true">{chapter.n}</span>
                <span className="rail-tip" aria-hidden="true">
                  {chapter.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="rail-readout" aria-hidden="true">
        <b>{current.n}</b> / 0{CHAPTERS.length}
      </p>
    </>
  );
}
