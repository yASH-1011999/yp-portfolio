/* Fictionalised technical artifacts — drawn in markup rather than stock
   screenshots. Purely decorative, so they are hidden from assistive tech;
   the project's evidence list carries the real content. */

const SEQUENCE_STEPS = ["Lead added", "Personalise", "Send email", "Wait 2 days"];

export function SequenceArtifact() {
  return (
    <div aria-hidden="true">
      <div className="win-bar">
        <span className="win-dots">
          <i />
          <i />
          <i />
        </span>
        <span>AI_SEQUENCE.BUILD</span>
      </div>
      <ol className="flow">
        {SEQUENCE_STEPS.map((step, i) => (
          <li key={step} className={`step${step === "Send email" ? " is-hot" : ""}`}>
            <span className="idx">0{i + 1}</span>
            {step}
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
            points="8,28 70,46 130,92 190,118 250,140 320,158 388,172"
          />
          <circle className="dot" cx="388" cy="172" r="7" />
        </svg>
        <div className="perf-read">
          <p className="perf-big">−55%</p>
          <p className="perf-small">COLD LOAD</p>
        </div>
      </div>
    </div>
  );
}
