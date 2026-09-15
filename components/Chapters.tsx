"use client";

import type { ReactNode } from "react";
import Count from "./Count";
import FlameChart from "./FlameChart";
import Marquee from "./Marquee";
import { CONTACT } from "@/lib/data";

/**
 * Every word on the site lives in this file. Edit here, nowhere else.
 * `active` is true only while that chapter is the one on screen — it drives
 * the number animations.
 */
export const CHAPTER_CONTENT: Record<string, (active: boolean) => ReactNode> = {
  intro: () => (
    <div className="inner">
      <div className="layer" style={{ ["--d" as string]: 0.9 }}>
        <div className="eyebrow mono rise" style={{ ["--i" as string]: 0 }}>
          <b>—</b>YASH PANCHAL · AHMEDABAD
        </div>
      </div>
      <div className="layer" style={{ ["--d" as string]: 1.9 }}>
        <h1 className="giant rise" style={{ ["--i" as string]: 1 }}>
          <span>I make the web</span>
          <span>
            feel <em>instant</em>.
          </span>
        </h1>
      </div>
      <div className="layer" style={{ ["--d" as string]: 1.1 }}>
        <p className="lead rise" style={{ ["--i" as string]: 2 }}>
          Frontend lead, six years deep in React and TypeScript. I take products
          that got slow, find out exactly why, and rebuild the parts that
          deserve it — then leave the team a way of working that keeps them
          fast.
        </p>
      </div>
      <div className="layer factrow" style={{ ["--d" as string]: 0.6 }}>
        {[
          ["6", "YEARS"],
          ["7", "ENGINEERS LED"],
          ["20K", "SSR PAGES"],
          ["−30%", "BUILD TIME"],
        ].map(([n, label], i) => (
          <div className="fact rise" key={label} style={{ ["--i" as string]: 3 + i }}>
            <b>{n}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  ),

  record: () => (
    <div className="inner">
      <div className="layer" style={{ ["--d" as string]: 0.8 }}>
        <div className="eyebrow mono rise" style={{ ["--i" as string]: 0 }}>
          <b>—</b>02 · THE RECORDING
        </div>
        <h2 className="big rise" style={{ ["--i" as string]: 1 }}>
          Sixty-two months,
          <br />
          one main thread.
        </h2>
        <p className="lead rise" style={{ ["--i" as string]: 2 }}>
          Hover any frame. This is every project that mattered, laid out the way
          I would profile it.
        </p>
      </div>
      <div className="layer rise" style={{ ["--d" as string]: 0.3, ["--i" as string]: 3 }}>
        <FlameChart />
      </div>
    </div>
  ),

  sales: () => (
    <div className="inner split">
      <div>
        <div className="layer" style={{ ["--d" as string]: 1.2 }}>
          <div className="eyebrow mono rise" style={{ ["--i" as string]: 0 }}>
            <b>—</b>03 · JAN 2025 — SEP 2026
          </div>
          <h2 className="mid rise" style={{ ["--i" as string]: 1 }}>
            Saleshandy
          </h2>
          <p className="lead rise" style={{ ["--i" as string]: 2 }}>
            Joined as a senior engineer. Promoted to{" "}
            <strong>frontend lead in seven months</strong>, then grew the team
            from three to seven and shipped the revenue surface of the product.
          </p>
        </div>
        <div className="layer tags" style={{ ["--d" as string]: 0.5 }}>
          {["React 19", "TanStack", "Next.js SSR", "Zustand", "Twilio", "Sentry"].map(
            (t, i) => (
              <span className="rise" key={t} style={{ ["--i" as string]: 3 + Math.floor(i / 2) }}>
                {t}
              </span>
            )
          )}
        </div>
      </div>
      <div className="layer bullets" style={{ ["--d" as string]: 1.6 }}>
        {[
          <>Rebuilt a legacy app ground-up on TanStack, with <em>accessibility designed in</em> rather than retrofitted.</>,
          <>Profiled a constrained codebase until Lighthouse moved <em>25 to 53</em> and builds got <em>30% faster</em>.</>,
          <>Owned CRM, Dialer, Email Verifier and AI Sequences — <em>the features that bill</em>.</>,
          <>Architected a Next.js SERP of <em>around 20,000</em> server-rendered pages with dynamic sitemaps.</>,
          <>Broke 3,000-line components into code-split modules and retired non-hook logic for good.</>,
        ].map((node, i) => (
          <div className="bl rise" key={i} style={{ ["--i" as string]: 3 + i }}>
            <i className="mono">{String(i + 1).padStart(2, "0")}</i>
            <p>{node}</p>
          </div>
        ))}
      </div>
    </div>
  ),

  valens: () => (
    <div className="inner split">
      <div>
        <div className="layer" style={{ ["--d" as string]: 1.2 }}>
          <div className="eyebrow mono rise" style={{ ["--i" as string]: 0 }}>
            <b>—</b>04 · JUL 2021 — DEC 2024
          </div>
          <h2 className="mid rise" style={{ ["--i" as string]: 1 }}>
            Valens Datalabs
          </h2>
          <p className="lead rise" style={{ ["--i" as string]: 2 }}>
            Three and a half years on a high-traffic B2C platform — the
            storefront customers saw, and the CMS the business ran it from.
          </p>
        </div>
        <div className="layer tags" style={{ ["--d" as string]: 0.5 }}>
          {["React", "Recoil", "Redux", "Material UI", "D3.js", "Service workers"].map(
            (t, i) => (
              <span className="rise" key={t} style={{ ["--i" as string]: 3 + Math.floor(i / 2) }}>
                {t}
              </span>
            )
          )}
        </div>
      </div>
      <div className="layer bullets" style={{ ["--d" as string]: 1.6 }}>
        {[
          <>Shipped the storefront&apos;s first working POC in <em>one week</em>, inside a three-person team.</>,
          <>Halved load time — <em>5–6s down to 2–3s</em> — with bundle cleanup, code-splitting and service workers.</>,
          <>Architected the configurable CMS behind it: page creation and order management for non-engineers.</>,
          <>Built a customer-journey dashboard in D3 and rebuilt the routing for an internal data portal.</>,
          <>Led the team through sprints, mentored two juniors, and ran client conversations directly.</>,
        ].map((node, i) => (
          <div className="bl rise" key={i} style={{ ["--i" as string]: 3 + i }}>
            <i className="mono">{String(i + 1).padStart(2, "0")}</i>
            <p>{node}</p>
          </div>
        ))}
      </div>
    </div>
  ),

  proof: (active) => (
    <div className="inner">
      <div className="layer" style={{ ["--d" as string]: 1 }}>
        <div className="eyebrow mono rise" style={{ ["--i" as string]: 0 }}>
          <b>—</b>05 · WHAT IT ADDED UP TO
        </div>
        <h2 className="big rise" style={{ ["--i" as string]: 1 }}>
          Numbers I can
          <br />
          defend in a room.
        </h2>
      </div>
      <div className="layer grid4" style={{ ["--d" as string]: 1.5 }}>
        <div className="cell rise" style={{ ["--i" as string]: 2 }}>
          <b className="arrowline">
            <Count to={25} active={active} />
            <s>→</s>
            <Count to={53} active={active} />
          </b>
          <u>Lighthouse performance on a legacy app nobody wanted to touch</u>
        </div>
        <div className="cell rise" style={{ ["--i" as string]: 3 }}>
          <b className="arrowline">
            <span>5–6s</span>
            <s>→</s>
            <span>2–3s</span>
          </b>
          <u>Storefront load time, same route, measured cold</u>
        </div>
        <div className="cell rise" style={{ ["--i" as string]: 4 }}>
          <b>
            <Count to={30} prefix="−" suffix="%" active={active} />
          </b>
          <u>Build time, on every push, for every engineer on the team</u>
        </div>
        <div className="cell rise" style={{ ["--i" as string]: 5 }}>
          <b className="arrowline">
            <span>3</span>
            <s>→</s>
            <Count to={7} active={active} />
          </b>
          <u>Engineers, grown and led as frontend lead</u>
        </div>
      </div>
      <div className="layer" style={{ ["--d" as string]: 0.7 }}>
        <p className="lead rise" style={{ ["--i" as string]: 6 }}>
          Code review and frontend UAT caught{" "}
          <strong>10 to 15 defects per release</strong> before anything reached
          a customer.
        </p>
      </div>
    </div>
  ),

  craft: () => (
    <div className="inner">
      <div className="layer" style={{ ["--d" as string]: 0.9 }}>
        <div className="eyebrow mono rise" style={{ ["--i" as string]: 0 }}>
          <b>—</b>06 · THE TOOLBOX
        </div>
        <h2 className="big rise" style={{ ["--i" as string]: 1 }}>
          Everything I reach for.
        </h2>
      </div>
      <div className="layer rise" style={{ ["--d" as string]: 0.35, ["--i" as string]: 2 }}>
        <Marquee />
      </div>
      <div className="layer" style={{ ["--d" as string]: 0.7 }}>
        <p className="lead rise" style={{ ["--i" as string]: 4 }}>
          Ask me about any of it and I will tell you where I used it. The depth
          is in the profiler, not the list.
        </p>
      </div>
    </div>
  ),

  lead: () => (
    <div className="inner split">
      <div className="layer" style={{ ["--d" as string]: 1.2 }}>
        <div className="eyebrow mono rise" style={{ ["--i" as string]: 0 }}>
          <b>—</b>07 · HOW I LEAD
        </div>
        <h2 className="mid rise" style={{ ["--i" as string]: 1 }}>
          A team that ships
          <br />
          without me in the room.
        </h2>
        <p className="lead rise" style={{ ["--i" as string]: 2 }}>
          I would rather build the system than be the bottleneck. Technical
          analyses and SOPs the team actually adopted. KRAs, grooming, real
          1:1s. Work broken down small enough that anyone could start on Monday.
        </p>
      </div>
      <div className="layer bullets" style={{ ["--d" as string]: 1.6 }}>
        {[
          <>Designed an <em>AI-first workflow on Claude Max</em> where one developer takes a feature from analysis to release.</>,
          <>New joiners ship independently in their first weeks, because the path is written down.</>,
          <>Scaled three to seven, then right-sized back to three as the roadmap changed. Both are the job.</>,
          <>Partnered with product on requirements, and with design on the system we both had to live in.</>,
        ].map((node, i) => (
          <div className="bl rise" key={i} style={{ ["--i" as string]: 3 + i }}>
            <i className="mono">{String(i + 1).padStart(2, "0")}</i>
            <p>{node}</p>
          </div>
        ))}
      </div>
    </div>
  ),

  contact: () => (
    <div className="inner">
      <div className="layer" style={{ ["--d" as string]: 1 }}>
        <div className="eyebrow mono rise" style={{ ["--i" as string]: 0 }}>
          <b>—</b>08 · END OF RECORDING
        </div>
        <h2 className="big rise" style={{ ["--i" as string]: 1 }}>
          Yours starts
          <br />
          wherever you like.
        </h2>
        <p className="lead rise" style={{ ["--i" as string]: 2 }}>
          Ahmedabad based. Open to senior and lead frontend roles, remote or
          relocating.
        </p>
      </div>
      <div className="layer links" style={{ ["--d" as string]: 0.6 }}>
        <a className="lk rise" style={{ ["--i" as string]: 3 }} href={`mailto:${CONTACT.email}`}>
          <small className="mono">EMAIL</small>
          <b>{CONTACT.email}</b>
          <i>↗</i>
        </a>
        <a className="lk rise" style={{ ["--i" as string]: 4 }} href={`tel:${CONTACT.phoneHref}`}>
          <small className="mono">PHONE</small>
          <b>{CONTACT.phone}</b>
          <i>↗</i>
        </a>
        <a
          className="lk rise"
          style={{ ["--i" as string]: 5 }}
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <small className="mono">LINKEDIN</small>
          <b>{CONTACT.linkedinLabel}</b>
          <i>↗</i>
        </a>
      </div>
    </div>
  ),
};
