/* Fictionalised technical artifacts — drawn in markup rather than stock
   screenshots. Purely decorative, so they are hidden from assistive tech;
   the project's evidence list carries the real content. */

const SALESHANDY_FEATURES = ["CRM / Kanban", "Dialer + Chrome ext.", "Email Verifier", "AI Sequences"];

export function SequenceArtifact() {
  return (
    <div aria-hidden="true">
      <div className="win-bar">
        <span className="win-dots">
          <i />
          <i />
          <i />
        </span>
        <span>SALESHANDY.SUITE</span>
      </div>
      <ol className="flow">
        {SALESHANDY_FEATURES.map((feature, i) => (
          <li key={feature} className={`step${feature === "AI Sequences" ? " is-hot" : ""}`}>
            <span className="idx">0{i + 1}</span>
            {feature}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PerformanceArtifact() {
  return (
    <div aria-hidden="true">
      <div className="win-bar">
        <span className="win-dots">
          <i />
          <i />
          <i />
        </span>
        <span>STOREFRONT.PERF</span>
      </div>
      <div className="perf">
        <svg viewBox="0 0 400 200" role="presentation" focusable="false">
          <path
            className="grid-lines"
            d="M0 40H400M0 80H400M0 120H400M0 160H400M80 0V200M160 0V200M240 0V200M320 0V200"
          />
          <polyline
            className="trace"
            points="8,172 70,158 130,140 190,118 250,92 320,46 388,28"
          />
          <circle className="dot" cx="388" cy="28" r="7" />
        </svg>
        <div className="perf-read">
          <p className="perf-big">55→80</p>
          <p className="perf-small">LIGHTHOUSE SCORE</p>
        </div>
      </div>
    </div>
  );
}
