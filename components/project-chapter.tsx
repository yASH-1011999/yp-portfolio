import { ProjectStage } from "@/components/project-stage";
import { PerformanceArtifact, SequenceArtifact } from "@/components/project-artifacts";
import type { Project } from "@/lib/portfolio-data";

export function WorkOpener() {
  return (
    <section className="chapter work-opener" aria-labelledby="work-title">
      <p className="ghost" aria-hidden="true">
        01
      </p>
      <p className="kicker">Selected work / real constraints</p>
      <h2 id="work-title" className="chapter-title display">
        <span className="line">Two products.</span>
        <span className="line outline">One obsession.</span>
      </h2>
      <p className="work-desc">
        Speed is not polish at the end. It is architecture, product judgment, and a team that
        knows where the sharp edges are.
      </p>
    </section>
  );
}

export function ProjectChapter({ project }: { project: Project }) {
  const titleId = `${project.id}-title`;

  return (
    <section id={project.id} className="chapter project" aria-labelledby={titleId}>
      <p className="ghost ghost--outline" aria-hidden="true">
        {project.number}
      </p>

      <div className="project-top">
        <div>
          <p className="project-meta">
            <span className="num">{project.number}</span>
            <span>{project.period}</span>
          </p>
          <h3 id={titleId} className="project-title display">
            {project.company}
          </h3>
          <p className="project-desc">{project.description}</p>
          <ul className="tags" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <ProjectStage tile={project.tile} label={`${project.company} project visual`}>
          {project.artifact === "sequence" ? <SequenceArtifact /> : <PerformanceArtifact />}
        </ProjectStage>
      </div>

      <ol className="evidence" aria-label={`${project.company} evidence`}>
        {project.evidence.map((item, i) => (
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
