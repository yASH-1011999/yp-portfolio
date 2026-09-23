import { PortfolioHero } from "@/components/portfolio-hero";
import { WorkOpener, ProjectChapter } from "@/components/project-chapter";
import { ProofSection } from "@/components/proof-section";
import { ToolboxSection } from "@/components/toolbox-section";
import { LeadershipSection } from "@/components/leadership-section";
import { ContactSection } from "@/components/contact-section";
import { PROJECTS } from "@/lib/portfolio-data";

export default function Page() {
  return (
    <main id="main" className="site-main">
      <PortfolioHero />
      <div id="work" className="work-group">
        <WorkOpener />
        {PROJECTS.map((project) => (
          <ProjectChapter key={project.id} project={project} />
        ))}
      </div>
      <ProofSection />
      <ToolboxSection />
      <LeadershipSection />
      <ContactSection />
    </main>
  );
}
