export const SITE = {
  name: "Yash Panchal",
  role: "Frontend lead",
  title: "Yash Panchal — Frontend Lead",
  description:
    "Six years engineering fast interfaces, resilient systems, and frontend teams.",
  email: "yashpanchal3210@gmail.com",
  linkedin: "https://www.linkedin.com/in/yash-panchal-frontend",
  /** Pending content — supply real URLs to enable the header links. Never invent. */
  writingUrl: null as string | null,
  resumeUrl: null as string | null,
};

export const CHAPTERS = [
  { n: "01", id: "intro", label: "Index" },
  { n: "02", id: "work", label: "Work" },
  { n: "03", id: "proof", label: "Proof" },
  { n: "04", id: "toolbox", label: "Stack" },
  { n: "05", id: "lead", label: "Lead" },
  { n: "06", id: "contact", label: "Talk" },
] as const;

export type Project = {
  id: string;
  number: string;
  period: string;
  company: string;
  description: string;
  tags: string[];
  evidence: string[];
  artifact: "sequence" | "performance";
  tile: { label: string; value: string; sub: string };
};

export const PROJECTS: Project[] = [
  {
    id: "saleshandy",
    number: "01",
    period: "2025 — 2026",
    company: "Saleshandy",
    description:
      "Joined senior. Became frontend lead in seven months. Grew three engineers to seven and shipped the product’s revenue surface.",
    tags: ["React 19", "TanStack", "Next.js", "NestJS", "Sentry"],
    evidence: [
      "Architected AI Sequences and rebuilt the multi-step sequence builder.",
      "Shipped NestJS APIs plus Twilio access-token and webhook handling.",
      "Moved Lighthouse performance from 25 to 53 and cut builds by 30%.",
      "Architected around 20,000 server-rendered pages with dynamic sitemaps.",
    ],
    artifact: "sequence",
    tile: { label: "LIGHTHOUSE", value: "53", sub: "+28 POINTS" },
  },
  {
    id: "valens",
    number: "02",
    period: "2021 — 2024",
    company: "Valens Datalabs",
    description:
      "Three and a half years across a high-traffic storefront and the CMS that kept its business moving.",
    tags: ["React", "Recoil", "Material UI", "D3.js", "Service workers"],
    evidence: [
      "Shipped the storefront’s first working proof of concept in one week.",
      "Cut cold load time from 5–6 seconds to 2–3 seconds.",
      "Built a configurable CMS for pages, orders, and virtualized lists.",
      "Created customer-journey and transcript-analysis dashboards in D3.",
    ],
    artifact: "performance",
    tile: { label: "FIRST POC", value: "1 WK", sub: "FROM ZERO" },
  },
];

export const METRICS = [
  { label: "Legacy Lighthouse", value: "22→48", note: "On an app nobody wanted to touch." },
  { label: "Cold storefront load", value: "2–3s", note: "Down from five to six seconds." },
  { label: "Build time", value: "−27%", note: "On every push. For every engineer." },
  { label: "Pre-release defects", value: "10–15", note: "Caught through review and frontend UAT." },
];

export const TOOLBOX = [
  { n: "01", title: "Product UI", stack: ["React", "Next.js", "TypeScript", "TanStack", "Zustand"] },
  { n: "02", title: "Performance", stack: ["Profiler", "Lighthouse", "Code splitting", "Web Vitals"] },
  { n: "03", title: "Systems", stack: ["Storybook", "WCAG", "Playwright", "Feature flags"] },
  { n: "04", title: "Backend", stack: ["NestJS", "Node.js", "PostgreSQL", "WebSockets", "Twilio"] },
];

export const LEADERSHIP = [
  "Designed an AI-first workflow where one developer takes a feature from analysis to release.",
  "Helped new joiners ship independently in their first weeks by writing down the path.",
  "Scaled three to seven, then right-sized back to three as the roadmap changed. Both are the job.",
];
