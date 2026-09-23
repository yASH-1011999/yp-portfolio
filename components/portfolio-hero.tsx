import { ArrowDown } from "lucide-react";
import { Marquee } from "@/components/marquee";

export function PortfolioHero() {
  return (
    <section id="intro" className="chapter hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-spot" aria-hidden="true" />

      <div className="hero-meta">
        <span>Yash Panchal®</span>
        <span>Frontend Engineer, Performance &amp; Systems</span>
        <span>Open to Relocate</span>
      </div>

      <div className="hero-body">
        <p className="kicker">Engineering interfaces since 2020</p>
        <h1 id="hero-title" className="hero-title display">
          <span className="line l1">I make</span>
          <span className="line l2 outline">the web</span>
          <span className="line l3">feel instant.</span>
        </h1>
      </div>

      <p className="hero-code" aria-hidden="true">
        <span>06Y</span>
        <span className="hero-code-label">EXP</span>
      </p>

      <div className="hero-support">
        <p className="support-label display">
          Not a product.
          <br />A working record.
        </p>
        <p className="copy">
          Six years deep in React and TypeScript. I find what makes products slow, rebuild
          what deserves it, and leave the team a faster way to work.
        </p>
        <a className="cta" href="#work">
          Enter the record
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      </div>

      <Marquee text="REACT 19 — TYPESCRIPT — PERFORMANCE — SYSTEMS — FRONTEND LEAD —" />
    </section>
  );
}
