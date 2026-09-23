import { LEADERSHIP } from "@/lib/portfolio-data";

export function LeadershipSection() {
  return (
    <section id="lead" className="chapter leadership" aria-labelledby="lead-title">
      <p className="ghost ghost--outline" aria-hidden="true">
        07
      </p>

      <div>
        <p className="kicker">How I lead</p>
        <h2 id="lead-title" className="chapter-title display">
          <span className="line">The team ships</span>
          <span className="line outline">without me.</span>
        </h2>
      </div>

      <p className="lead-intro">
        I would rather build the system than be the bottleneck: analyses people use, grooming
        that ends in decisions, and work small enough to start Monday.
      </p>

      <ol className="lead-grid">
        {LEADERSHIP.map((item, i) => (
          <li key={item}>
            <span className="n" aria-hidden="true">
              0{i + 1}
            </span>
            <p>{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
