import { ArrowUpRight } from "lucide-react";
import { Marquee } from "@/components/marquee";
import { SITE } from "@/lib/portfolio-data";

export function ContactSection() {
  return (
    <section id="contact" className="chapter contact" aria-labelledby="contact-title">
      <p className="contact-plus" aria-hidden="true">
        +
      </p>

      <div className="contact-body">
        <div>
          <p className="kicker">Your move</p>
          <h2 id="contact-title" className="chapter-title display">
            <span className="line">Let’s make</span>
            <span className="line outline">it move.</span>
          </h2>
        </div>

        <p className="copy">
          Ahmedabad based. Open to senior and lead frontend roles, remote or relocating — and to
          full-stack, frontend-heavy roles too.
        </p>

        <div className="contact-links">
          <a className="contact-link" href={`mailto:${SITE.email}`}>
            Email me
            <ArrowUpRight size={28} aria-hidden="true" />
          </a>
          <a
            className="contact-link"
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <ArrowUpRight size={28} aria-hidden="true" />
          </a>
        </div>
      </div>

      <Marquee
        className="contact-marquee"
        text="YASH PANCHAL — FRONTEND LEAD — AVAILABLE 2026 —"
      />
    </section>
  );
}
