import { Marquee } from "@/components/marquee";
import { METRICS } from "@/lib/portfolio-data";

export function ProofSection() {
  return (
    <section id="proof" className="chapter proof" aria-labelledby="proof-title">
      <Marquee text="MEASURED — SHIPPED — DEFENDED — REPEATED —" reverse onPrimary />

      <div className="proof-head">
        <p className="kicker">Proof, not adjectives</p>
        <h2 id="proof-title" className="chapter-title display">
          <span className="line">The numbers</span>
          <span className="line">talk louder.</span>
        </h2>
      </div>

      <dl className="metrics">
        {METRICS.map((metric) => (
          <div className="metric" key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>
              <span className="value">{metric.value}</span>
              <span className="note">{metric.note}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
