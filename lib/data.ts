export type CanvasMode =
  | "field"
  | "trace"
  | "bars"
  | "grid"
  | "rings"
  | "rain"
  | "orbit"
  | "stars";

export type ChapterMeta = {
  id: string;
  label: string;
  accent: string;
  bg: string;
  mode: CanvasMode;
  /** root note of the ambient pad while this chapter is on screen */
  note: number;
};

export const CHAPTER_META: ChapterMeta[] = [
  { id: "intro",   label: "INTRO",       accent: "#F0674A", bg: "#080D10", mode: "field",  note: 110 },
  { id: "record",  label: "THE RECORD",  accent: "#8B7CFF", bg: "#0B0A14", mode: "trace",  note: 98 },
  { id: "sales",   label: "SALESHANDY",  accent: "#E8B04B", bg: "#12100A", mode: "bars",   note: 130.81 },
  { id: "valens",  label: "VALENS",      accent: "#35C2A8", bg: "#061013", mode: "grid",   note: 146.83 },
  { id: "proof",   label: "PROOF",       accent: "#FF5E5E", bg: "#140A0C", mode: "rings",  note: 87.31 },
  { id: "craft",   label: "TOOLBOX",     accent: "#6E9BFF", bg: "#080C16", mode: "rain",   note: 116.54 },
  { id: "lead",    label: "HOW I LEAD",  accent: "#C77BFF", bg: "#0E0916", mode: "orbit",  note: 103.83 },
  { id: "contact", label: "CONTACT",     accent: "#EFEAE1", bg: "#07090B", mode: "stars",  note: 123.47 },
];

export type Frame = {
  depth: number;
  from: number;
  to: number;
  color: string;
  title: string;
  detail: string;
  stack: string;
};

/**
 * Decimal years. 2024.5 is roughly July 2024.
 * Top-level spans are exact; the sub-project spans are approximate —
 * adjust `from` / `to` if you want them to match your real months.
 */
export const FRAMES: Frame[] = [
  { depth: 0, from: 2021.5,  to: 2026.75, color: "#8B7CFF", title: "Six years, front of the stack", detail: "Two companies. One continuous main thread.", stack: "React · TypeScript · Next.js" },

  { depth: 1, from: 2021.5,  to: 2024.95, color: "#35C2A8", title: "Valens Datalabs", detail: "Front-End Developer. Storefront, CMS, internal tooling.", stack: "React · Redux · Recoil · D3" },
  { depth: 1, from: 2025,    to: 2026.7,  color: "#E8B04B", title: "Saleshandy", detail: "Senior Engineer, then Frontend Lead in 7 months.", stack: "React 19 · TanStack · Next.js" },

  { depth: 2, from: 2021.5,  to: 2022.42, color: "#6E9BFF", title: "Configurable CMS", detail: "Page creation and order management on a live storefront.", stack: "React · Redux · Material UI" },
  { depth: 2, from: 2022.42, to: 2023.67, color: "#35C2A8", title: "B2C storefront", detail: "Mobile-first UI. First POC in one week.", stack: "React · Recoil · Swiper.js" },
  { depth: 2, from: 2023.67, to: 2024.25, color: "#F0674A", title: "Performance pass", detail: "5–6s down to 2–3s. Lighthouse 55 to 75.", stack: "Code-splitting · Service workers" },
  { depth: 2, from: 2024.25, to: 2024.95, color: "#6E9BFF", title: "D3 dashboard & DQ Portal", detail: "Journey analytics and a routing rebuild.", stack: "React · Redux · D3.js" },

  { depth: 2, from: 2025,    to: 2025.5,  color: "#E8B04B", title: "CRM · Dialer · Verifier", detail: "Revenue features owned end to end, extension included.", stack: "Twilio · WebSockets · Redux" },
  { depth: 2, from: 2025.5,  to: 2026.0,  color: "#F0674A", title: "Performance initiative", detail: "Build 30% faster. Lighthouse 25 to 53. Sentry in the loop.", stack: "DevTools · Profiler · Webpack" },
  { depth: 2, from: 2026.0,  to: 2026.33, color: "#6E9BFF", title: "Next.js SERP", detail: "Around 20K server-rendered pages, dynamic sitemaps.", stack: "Next.js · SSR · SEO" },
  { depth: 2, from: 2026.33, to: 2026.7,  color: "#C77BFF", title: "TanStack rebuild", detail: "Ground-up, accessible by design.", stack: "TanStack Router · Query · WCAG" },

  { depth: 3, from: 2025.33, to: 2026.7,  color: "#35C2A8", title: "Leading the team", detail: "Three to seven engineers, SOPs, and an AI-first workflow.", stack: "Claude Max · Review · UAT" },
];

export const STACK_ROWS: string[][] = [
  ["React", "Next.js", "TypeScript", "JavaScript ES6+", "TanStack Query", "TanStack Router", "Redux", "RTK Query", "Zustand", "Recoil"],
  ["Chrome DevTools", "React Profiler", "Lighthouse", "Bundle analysis", "Code-splitting", "Service workers", "Sentry", "Web Vitals", "Webpack", "Vite"],
  ["Tailwind", "SCSS", "styled-components", "Emotion", "MUI", "shadcn/ui", "WCAG", "ARIA", "Keyboard nav", "Screen readers"],
  ["Jest", "React Testing Library", "Playwright", "GitHub Actions", "Jenkins", "WebSockets", "Optimistic updates", "Claude Code", "MCP", "Vercel"],
];

export const CONTACT = {
  email: "yashpanchal3210@gmail.com",
  phone: "+91 79905 16356",
  phoneHref: "+917990516356",
  linkedin: "https://www.linkedin.com/in/yash-panchal-frontend",
  linkedinLabel: "in/yash-panchal-frontend",
};
