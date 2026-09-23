import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE } from "@/lib/portfolio-data";

function PendingLink({ label, href }: { label: string; href: string | null }) {
  if (href) {
    return (
      <a className="nav-link" href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  // Pending content: shown muted and disabled until a real URL is supplied.
  return (
    <span className="nav-link" aria-disabled="true" title={`${label} — coming soon`}>
      {label}
      <span className="soon" aria-hidden="true">
        SOON
      </span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#intro" aria-label={`${SITE.name} — back to top`}>
        <Image src="/logo.svg" alt="" width={44} height={44} unoptimized priority />
        <span className="brand-text">
          <span className="brand-name">{SITE.name}</span>
          <span className="brand-role">{SITE.role}</span>
        </span>
      </a>

      <nav aria-label="Primary">
        <ul className="nav-links">
          <li>
            <a className="nav-link" href="#work">
              Projects
            </a>
          </li>
          <li>
            {SITE.resumeUrl ? (
              <a className="nav-link" href={SITE.resumeUrl} download>
                Resume
              </a>
            ) : (
              <PendingLink label="Resume" href={null} />
            )}
          </li>
        </ul>
      </nav>

      <ThemeToggle />
    </header>
  );
}
