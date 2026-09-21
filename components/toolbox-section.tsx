import { ArrowUpRight } from "lucide-react";
import { TOOLBOX } from "@/lib/portfolio-data";

export function ToolboxSection() {
  return (
    <section id="toolbox" className="chapter toolbox" aria-labelledby="toolbox-title">
      <p className="ghost" aria-hidden="true">
        Systems
      </p>

      <div>
        <p className="kicker">03 / Tools follow decisions</p>
        <h2 id="toolbox-title" className="chapter-title display">
          <span className="line">Depth lives</span>
          <span className="line">in the profiler.</span>
        </h2>
      </div>

      <ul className="tool-rows">
        {TOOLBOX.map((row) => (
          <li className="tool-row" key={row.n}>
            <span className="n" aria-hidden="true">
              {row.n}
            </span>
            <h3 className="t">{row.title}</h3>
            <p className="s">{row.stack.join(" · ")}</p>
            <span className="a" aria-hidden="true">
              <ArrowUpRight size={24} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
