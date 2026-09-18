"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  ArrowUpRight, Copy, Check, Mail, Phone, MapPin, Linkedin, Plus,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ASSETS: served from /public (see public/fonts and public/portrait)
   ═══════════════════════════════════════════════════════════════ */
const PORTRAIT = "/portrait.png";
const PORTRAIT_WEBP = "/portrait.webp";
/* TODO: replace public/resume.pdf with your current résumé export. */
const RESUME = "/resume.pdf";

/* depth of the extruded type + portrait relief */
const NAME_LAYERS = 14;
const FIG_LAYERS = 10;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const PROFILE = {
  first: "AHMAD",
  last: "RIAZ",
  role: "UI/UX & Product Designer",
  tagline: "Product design that survives handoff. I draw it in Figma, then build it.",
  location: "Lahore, Pakistan",
  email: "ahmi2662@gmail.com",
  phone: "+92 323 7277228",
  linkedin: "https://linkedin.com/in/ahmad-riaz-a3ab22310",
  bio:
    "I'm a product designer with two years designing and shipping digital products for clients in Australia, Ghana, Botswana, the United States and Europe. I work the whole arc — user flows, wireframes, Figma prototypes, design systems — and because I build the front end in React and React Native myself, the designs I hand over survive handoff intact. BSCS, University of Lahore.",
};

const STATS = [
  { n: "05", l: "Products designed & shipped", back: "Compliance SaaS, PropTech, security, e-commerce" },
  { n: "02", l: "Years in product design", back: "Designing for real users since 2023" },
  { n: "04", l: "Platforms designed for", back: "Web · iOS · Android · Admin" },
  { n: "03", l: "Design systems built", back: "Component libraries with white-label theming" },
];

const MARQUEE = [
  "Figma", "FigJam", "Prototyping", "Design Systems", "Adobe CC", "Wireframing",
  "User Flows", "Responsive Design", "React", "React Native", "HTML/CSS",
];

const EXPERIENCE = [
  {
    period: "Dec 2025 to Present",
    company: "QuisHub",
    role: "Product Designer & Full-Stack Developer",
    current: true,
    points: [
      "Design client product interfaces end to end in Figma — user flows, wireframes, high-fidelity screens and interactive prototypes — then implement them in React and React Native.",
      "Build and maintain reusable design systems across concurrent products: component libraries, type and colour scales, white-label theming for multiple brands.",
      "Present design rationale to international stakeholders, run feedback rounds and iterate on prototypes before development starts.",
      "Translate regulated workflows in compliance, security training and tenancy into information architecture non-technical users can operate without training.",
    ],
    stack: ["Figma", "FigJam", "Design Systems", "React", "React Native", "Node.js"],
  },
  {
    period: "Mar 2023 to Aug 2023",
    company: "Cloud Service Group",
    role: "Front-End Developer",
    current: false,
    points: [
      "Owned UI components from design handoff to production in an agile, Git-based workflow with peer code review.",
      "Built interactive, responsive web interfaces with JavaScript, HTML and CSS on the company's flagship product.",
    ],
    stack: ["JavaScript", "HTML", "CSS", "Git", "Agile"],
  },
];

/* One screenshot per project. Drop a file in public/work/ and put its path
   here — until then the panel shows a labelled drop zone, never a fake. */
const LEASY_SCREENS = [
    { src: "/work/leasy-home.webp", alt: "Leasy Link home: outstanding balances, arrears split, vacant units", w: 224, h: 497, phone: true },
    { src: "/work/leasy-arrears.webp", alt: "Leasy Link arrears list filtered by rent and utility", w: 229, h: 505, phone: true },
    { src: "/work/leasy-record-payment.webp", alt: "Leasy Link record-payment sheet", w: 95, h: 213, phone: true },
  ];

const WORK_SHOTS = {
  "ETS FDC": [
    { src: "/work/ets-fdc-dashboard.webp", alt: "ETS FDC coordinator dashboard with documents expiring soon", w: 960, h: 600 },
    { src: "/work/ets-fdc-hero.webp", alt: "ETS FDC landing hero with compliance stats and install prompt", w: 1600, h: 1000 },
    { src: "/work/ets-fdc-forms.webp", alt: "ETS FDC forms library grouped by service operation", w: 1356, h: 540, wide: true },
    { src: "/work/ets-fdc-features.webp", alt: "ETS FDC feature grid: expiry tracking, incident reporting, audit pack", w: 1600, h: 1000, wide: true },
  ],
  "Leasy Link": LEASY_SCREENS,
  Nimdio: null,
  "Postal Solutions": [
    { src: "/work/postal-step1.webp", alt: "Postal Solutions resident flow, step 1: find your apartment", w: 1440, h: 900 },
    { src: "/work/postal-step2.webp", alt: "Postal Solutions resident flow, step 2: choose move type", w: 1440, h: 900 },
    { src: "/work/postal-admin.webp", alt: "Postal Ops admin overview: batch countdown, volume chart, tonight's batch preview", w: 1428, h: 1097, wide: true },
  ],
  Digitales: [
    { src: "/work/digitales-home.webp", alt: "Digitales homepage hero with free audit entry", w: 1600, h: 1000 },
    { src: "/work/digitales-audit.webp", alt: "Digitales audit results: health score, Core Web Vitals, dimension breakdown", w: 1600, h: 1000 },
  ],
};

const FILTERS = ["All", "Product Design", "Design + Build"];

const PROJECTS = [
  {
    title: "ETS FDC",
    sub: "Family day care compliance platform, Australia",
    role: "Sole Designer & Front-End Developer",
    discipline: "Product Design",
    year: "2026",
    tags: ["Full-Stack Web", "SaaS & AI"],
    links: [{ label: "excellentteamsphere.com.au", href: "https://excellentteamsphere.com.au/" }],
    stack: ["Figma", "React", "PWA", "White-label theming"],
    points: [
      "Sole designer: defined the brand direction, design system and full UI/UX in Figma — colour and type scales, component library, dashboard layouts and the marketing site — then built the front end.",
      "Designed dense compliance workflows into one coordinator dashboard: certification expiry tracking, 24-hour incident reporting, one-click audit-pack export and magic-link document uploads that require no login.",
      "Shipped a responsive, installable PWA with white-label theming so each service renders under its own logo and accent colour.",
    ],
  },
  {
    title: "Leasy Link",
    sub: "Rental management suite: mobile + admin, Botswana",
    role: "Product Designer & Full-Stack Developer",
    discipline: "Product Design",
    year: "2025",
    tags: ["Mobile Apps", "Full-Stack Web"],
    links: [],
    stack: ["Figma", "Flutter", "Riverpod", "Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL 16", "Next.js Admin", "pdf-lib"],
    points: [
      "Designed the full mobile UI/UX in Figma — user flows, screen designs and a mobile-first design system following native iOS and Android patterns — then implemented it on both platforms.",
      "Designed the admin portal alongside the app so tenant, lease and document states read the same way to landlords and to staff.",
      "Shipped to the App Store and Google Play with three subscription tiers via Google Play Billing across five Southern African markets.",
      "Row-level security in PostgreSQL 16 for strict tenant isolation; automated PDF signature stamping via pdf-lib.",
    ],
  },
  {
    title: "Nimdio",
    sub: "Multi-tenant cybersecurity awareness SaaS, Ghana",
    role: "Sole Designer & Developer",
    discipline: "Product Design",
    year: "2025",
    tags: ["SaaS & AI", "Full-Stack Web"],
    links: [{ label: "nimdi.ai", href: "https://nimdi.ai/" }],
    stack: ["Figma", "Next.js", "NestJS", "PostgreSQL", "AWS"],
    points: [
      "Sole designer: produced the complete UI/UX in Figma — wireframes, dashboard layouts and a reusable component system supporting white-label theming — then built the platform end to end.",
      "Designed the analytics dashboards and campaign-builder flows for a multi-tenant B2B platform running phishing simulations and security-awareness training with full customer isolation.",
      "Tuned state management and rendering paths so real-time campaign data stays legible under load.",
    ],
  },
  {
    title: "Postal Solutions",
    sub: "Mail forwarding platform, United States",
    role: "Product Designer & Full-Stack Developer",
    discipline: "Design + Build",
    year: "2025",
    tags: ["Full-Stack Web"],
    links: [],
    stack: ["Figma", "Next.js", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "n8n", "Puppeteer", "IPP Printing", "AWS EC2/S3/SES", "Stripe", "Google Places"],
    points: [
      "Designed the resident-facing ordering flow and the staff admin dashboard as one system, so a request looks the same to the person who makes it and the person who fulfils it.",
      "Built the automation behind the flow: online payment, address validation, nightly batching and automated label generation sent to a network printer.",
      "Delivered a self-hosted architecture costing roughly $20 per month against $133 for an equivalent SaaS stack, fully owned by the client.",
    ],
  },
  {
    title: "Digitales",
    sub: "Premium agency platform",
    role: "Product Designer & Full-Stack Developer",
    discipline: "Design + Build",
    year: "2025",
    tags: ["Full-Stack Web"],
    links: [
      { label: "digitales.pk", href: "https://www.digitales.pk/" },
      { label: "digitalesusa.org", href: "https://www.digitalesusa.org/" },
    ],
    stack: ["Figma", "Google Stitch", "Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "API Routes", "Firebase", "Resend", "PageSpeed API", "Vercel"],
    points: [
      "Designed the entire interface in Figma — layout system, type and colour scales, and component states — held consistent across both regional sites, then built it.",
      "Architected the core full-stack feature set across two regional sites.",
      "Automated CI/CD pipelines and cut page-load times.",
      "Dynamic structured-data schemas for search visibility.",
    ],
  },
];

/* The one in-depth case study. Image slots are deliberately empty —
   drop the Figma exports into /public/case/leasy-link/ and fill `src`. */
const CASE_STUDY = {
  project: "Leasy Link",
  sub: "Rental management suite — mobile app + admin portal",
  market: "Botswana · five Southern African markets",
  year: "2025",
  role: "Product Designer & Full-Stack Developer",
  platforms: ["iOS", "Android", "Web admin"],
  tools: ["Figma", "FigJam", "Flutter", "Next.js"],
  sections: [
    {
      k: "Context",
      body: [
        "Landlords in Botswana run their tenancies on WhatsApp threads, paper leases and bank transfer screenshots. There is no shared record. When a dispute happens, nobody can prove what was agreed.",
        "A client asked for one place to hold leases, tenants, payments and documents. Landlords on their phones. Staff on a desktop admin portal. I designed both and built both.",
      ],
    },
    {
      k: "The problem",
      body: [
        "A landlord managing two properties can handle rent collection manually over WhatsApp. A landlord managing twenty cannot. Payments get buried in chat threads, and the landlord ends up spending more time managing messages than managing the properties.",
        "So the design problem was not \"build a lease screen\". It was: make the state of twenty tenancies readable at a glance, and make recording a payment take one tap instead of one conversation.",
        "That is harder than it sounds, because a lease is a long-running object — tenant, property, rent schedule, signature, documents — and every one of those carries its own state.",
      ],
    },
    {
      k: "What I explored",
      body: [
        "I mapped the full tenancy lifecycle in FigJam first — from listing a property to closing a lease — and marked every point where a landlord has to do something and every point where the system can do it instead.",
        "Then three wireframe directions: a document-first shell, a calendar-first shell, and a property-first shell with the lease nested under it. I built all three as low-fidelity flows before drawing a single high-fidelity screen.",
      ],
      slots: ["user-flow", "wireframes"],
    },
    {
      k: "The decision, and why",
      body: [
        "Property-first won. Landlords think in units, not in leases — they ask \"is 12B paid?\" not \"is lease #4471 current?\". Nesting the lease under the property matched the question people actually arrive with.",
        "That decision set the navigation for both platforms. The mobile app opens on a property list. The admin portal opens on the same list, wider, with the same labels. A staff member and a landlord looking at the same tenancy see the same words in the same order, which killed a whole class of support call.",
        "I prototyped the three highest-traffic flows in Figma — record a payment, add a tenant, sign a lease — and ran them past the client before any code was written.",
      ],
      slots: ["prototype-screens"],
    },
    {
      k: "What shipped",
      body: [
        "A mobile-first design system built around native iOS and Android patterns: type and spacing scales, a component library covering the twelve recurring screens, and status tokens so a lease state reads identically on a phone and on the admin dashboard.",
        "Shipped to the App Store and Google Play with three subscription tiers through Google Play Billing, across five Southern African markets.",
        "On the engineering side I built the Flutter app with Riverpod, the Next.js admin portal, and the Node/Express API on PostgreSQL 16 with row-level security for tenant isolation. Lease signatures are stamped into the PDF automatically with pdf-lib.",
      ],
      slots: ["design-system-tokens", "final-ui"],
    },
    {
      k: "Outcome",
      body: [
        "Live on Google Play and the App Store, across five Southern African markets.",
        "Rebatho Mogegeh, CEO and founder, has expressed strong satisfaction with the platform.",
        "What I would change: the onboarding still asks for the full property record before a landlord can do anything useful. Next version lets them record one payment first and backfill the rest.",
      ],
    },
  ],
};

/* Labelled placeholders. Fill `src` once the Figma exports exist. */
const CASE_SLOTS = {
  "user-flow": { label: "User flow", note: "FigJam — full tenancy lifecycle, listing through lease close", ratio: "16 / 9", src: null },
  wireframes: { label: "Wireframes", note: "Three low-fidelity directions, side by side", ratio: "16 / 10", src: null },
  "prototype-screens": { label: "Prototype screens", note: "Record payment · add tenant · sign lease", ratio: "4 / 3", src: null },
  "design-system-tokens": { label: "Design system", note: "Type scale, spacing, colour and status tokens", ratio: "16 / 9", src: null },
  "final-ui": { label: "Final UI", note: "Shipped: home, arrears, record payment", ratio: "16 / 9", src: null, items: LEASY_SCREENS },
};

const PROCESS = [
  {
    step: "Discover",
    line: "I map the real workflow before I draw anything — who does what, where it breaks, what the system can absorb.",
    tools: ["FigJam", "Stakeholder interviews"],
  },
  {
    step: "Wireframe",
    line: "Two or three structural directions at low fidelity, so the argument is about structure and not about colour.",
    tools: ["Figma", "User flows"],
  },
  {
    step: "Prototype",
    line: "The highest-traffic flows built as clickable Figma prototypes, walked through with the client before code starts.",
    tools: ["Figma", "Auto-layout", "Variants"],
  },
  {
    step: "Ship",
    line: "I build the front end myself, so the spacing, states and motion survive handoff instead of drifting.",
    tools: ["React", "React Native", "Tailwind"],
  },
];

const CAPABILITIES = [
  "UI/UX Design", "User Flows", "Wireframing", "Prototyping (Figma)",
  "Design Systems", "Responsive Design", "Interaction Design",
  "Information Architecture", "Design Handoff", "Usability Review",
];

const TOOLS = [
  { group: "Design", items: ["Figma", "FigJam", "Adobe Photoshop", "Adobe Illustrator", "Adobe XD"] },
  { group: "Build", items: ["React", "React Native", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Flutter"] },
  { group: "Collaborate", items: ["Git / GitHub", "Agile handoff", "Design reviews", "Claude", "Cursor"] },
];

const NAV = [
  { id: "work", label: "Work", meta: "05" },
  { id: "process", label: "Process", meta: "04" },
  { id: "tools", label: "Tools", meta: "03" },
  { id: "experience", label: "Experience", meta: "2Y" },
  { id: "contact", label: "Contact", meta: "" },
];

/* ═══════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════ */

const CSS = `
/* ─────────────────────────────────────────────
   TOKENS — nothing below sets a raw size or colour
   ───────────────────────────────────────────── */
.ar{
  /* surface */
  --paper:#F4EFE6;
  --paper-2:#EBE5DA;
  --paper-3:#E0D9CC;
  --ink:#161512;
  --graphite:#5F5C56;        /* 5.4:1 on --paper-2 */
  --ghost:#D6CEBF;           /* rules and edges only, never text */
  --rule:rgba(22,21,18,.14);
  --rule-2:rgba(22,21,18,.07);

  /* exactly two accents, matched lightness and chroma */
  --accent:#2F4BA0;          /* 7.1:1 on --paper */
  --accent-2:#9A4526;        /* 5.7:1 on --paper */
  --accent-ink:#F4EFE6;

  /* type */
  --disp:'Space Grotesk',ui-sans-serif,system-ui,sans-serif;
  --body:'Inter',ui-sans-serif,system-ui,-apple-system,sans-serif;
  --mono:ui-monospace,'SFMono-Regular',Menlo,Consolas,monospace;

  /* modular scale, 1.25 — display sizes fluid */
  --fs-100:10.5px;
  --fs-200:12px;
  --fs-300:13.5px;
  --fs-400:15px;
  --fs-500:clamp(16px,1.1vw,17.5px);
  --fs-600:clamp(19px,1.8vw,23px);
  --fs-700:clamp(23px,2.8vw,30px);
  --fs-800:clamp(28px,4.2vw,46px);
  --fs-900:clamp(34px,6.4vw,78px);
  --fs-hero:clamp(46px,13.2vw,188px);
  --lh-tight:1.05;
  --lh-snug:1.35;
  --lh-body:1.7;
  --tr-wide:.17em;
  --measure:68ch;

  /* spacing, 4px base */
  --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s5:24px;
  --s6:32px; --s7:48px; --s8:64px; --s9:96px; --s10:128px;

  /* grid */
  --maxw:1320px;
  --gutter:clamp(18px,3vw,32px);
  --rail:64px;               /* hanging numerals live here, page-wide */
  --sec-pad:clamp(64px,8vw,112px);

  /* motion — one curve, one budget */
  --ease:cubic-bezier(.2,.8,.25,1);
  --dur-1:160ms;
  --dur-2:200ms;
  --dur-3:240ms;
  --lift:6px;                /* nothing moves further than this */

  background:var(--paper);color:var(--ink);
  font-family:var(--body);font-weight:300;font-size:var(--fs-400);
  -webkit-font-smoothing:antialiased;
  position:relative;overflow-x:clip;min-height:100vh;
}
@supports (color:oklch(0.5 0.1 250)){
  .ar{--accent:oklch(.45 .13 262);--accent-2:oklch(.45 .13 40)}
}
@media(max-width:760px){.ar{--rail:44px}}

.ar *{box-sizing:border-box;margin:0;padding:0}
.ar ::selection{background:var(--ink);color:var(--paper)}
.ar button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
.ar a{color:inherit;text-decoration:none}
.ar :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:2px}
.ar h1,.ar h2,.ar h3,.ar h4,.ar p{text-wrap:pretty}

.ar::before{
  content:"";position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;
  background-image:radial-gradient(rgba(22,21,18,.05) .6px,transparent .7px);
  background-size:3px 3px;
}
/* two washes, one per accent — colour without gradient soup */
.ar::after{
  content:"";position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(60vw 52vh at 16% 6%,color-mix(in srgb,var(--accent) 13%,transparent),transparent 70%),
    radial-gradient(54vw 46vh at 90% 32%,color-mix(in srgb,var(--accent-2) 11%,transparent),transparent 70%);
}

/* ── receding ground plane ── */
.floor{position:fixed;inset:auto 0 0 0;height:52vh;z-index:0;pointer-events:none;perspective:420px;perspective-origin:50% 0%;overflow:hidden;opacity:.45}
.floor i{
  position:absolute;left:-60%;right:-60%;top:0;height:260%;
  transform:rotateX(76deg);transform-origin:50% 0%;
  background-image:
    linear-gradient(to right,var(--rule-2) 1px,transparent 1px),
    linear-gradient(to bottom,var(--rule-2) 1px,transparent 1px);
  background-size:74px 74px;
  background-position:0 var(--fy,0px);
  -webkit-mask-image:linear-gradient(180deg,transparent 0%,#000 26%,transparent 78%);
  mask-image:linear-gradient(180deg,transparent 0%,#000 26%,transparent 78%);
}

/* ── type roles ── */
.d{font-family:var(--disp);font-weight:600;text-transform:uppercase}
.lbl{font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:var(--tr-wide);text-transform:uppercase;color:var(--graphite)}
.num{font-family:var(--disp);font-weight:500;font-size:var(--fs-200);letter-spacing:.12em;color:var(--accent);font-variant-numeric:tabular-nums}

/* ── the one grid ── */
.wrap{position:relative;z-index:1;max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter)}
.sec{padding:var(--sec-pad) 0;position:relative;z-index:1}
.rail{display:grid;grid-template-columns:var(--rail) minmax(0,1fr);gap:0}

/* ── section head: numeral hangs on the page rail ── */
.sec-head{
  display:grid;grid-template-columns:var(--rail) minmax(0,1fr);
  column-gap:0;row-gap:var(--s3);align-items:baseline;
  padding-bottom:var(--s5);border-bottom:1px solid var(--rule);margin-bottom:var(--s7);
  perspective:900px;
}
.sec-idx{font-family:var(--disp);font-weight:500;font-size:var(--fs-200);letter-spacing:.12em;color:var(--accent);font-variant-numeric:tabular-nums}
.sec-title{
  font-family:var(--disp);font-weight:600;font-size:var(--fs-800);letter-spacing:-.02em;text-transform:uppercase;line-height:var(--lh-tight);
  transform-origin:50% 100%;transform:rotateX(-84deg);opacity:0;
  transition:transform var(--dur-3) var(--ease),opacity var(--dur-3) ease;
}
.rv.in .sec-title{transform:rotateX(0deg);opacity:1}
.sec-note{grid-column:2;font-size:var(--fs-300);color:var(--graphite);max-width:46ch;line-height:var(--lh-body)}
@media(min-width:900px){
  .sec-head{grid-template-columns:var(--rail) minmax(0,1fr) minmax(0,38ch)}
  .sec-note{grid-column:3;justify-self:end;text-align:left}
}

/* ── top bar ── */
.bar{
  position:fixed;top:0;left:0;right:0;z-index:60;
  display:flex;align-items:center;gap:var(--s5);padding:var(--s3) var(--gutter);
  background:rgba(244,239,230,.86);
  background:color-mix(in srgb,var(--paper) 86%,transparent);
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border-bottom:1px solid var(--rule-2);perspective:700px;
}
.bar-status{display:flex;align-items:center;gap:var(--s2);font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.14em;text-transform:uppercase;color:var(--graphite)}
.dot{width:6px;height:6px;border-radius:50%;background:var(--accent);position:relative;flex:none}
.dot::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:1px solid var(--accent);animation:ping 2.6s ease-out infinite}
@keyframes ping{0%{transform:scale(.6);opacity:.8}100%{transform:scale(2);opacity:0}}
.bar-nav{display:flex;gap:var(--s5);margin:0 auto}
.bar-nav button{
  font-family:var(--disp);font-weight:500;font-size:var(--fs-200);letter-spacing:.04em;text-transform:uppercase;color:var(--graphite);
  position:relative;min-height:44px;padding:0 2px;display:inline-flex;align-items:center;
  transition:color var(--dur-2) var(--ease);
}
.bar-nav button sup{font-size:9px;color:var(--accent);margin-left:2px;vertical-align:super;font-variant-numeric:tabular-nums}
.bar-nav button::after{content:"";position:absolute;left:0;bottom:12px;height:1px;width:0;background:var(--ink);transition:width var(--dur-2) var(--ease)}
.bar-nav button:hover,.bar-nav button.on{color:var(--ink)}
.bar-nav button:hover::after,.bar-nav button.on::after{width:100%}
.ar .talk{
  display:inline-flex;align-items:center;gap:var(--s2);
  background:var(--ink);color:var(--accent-ink);
  font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.12em;text-transform:uppercase;
  min-height:44px;padding:0 var(--s4);border:1px solid var(--ink);border-radius:999px;
  transition:transform var(--dur-2) var(--ease),box-shadow var(--dur-2) var(--ease);
}
.ar .talk:hover{transform:translateY(calc(var(--lift) * -.5));box-shadow:0 10px 20px -12px rgba(22,21,18,.7)}
@media(max-width:900px){.bar-status,.bar-nav{display:none}.bar{justify-content:space-between}.bar-brand{display:block!important}}
.bar-brand{display:none;font-family:var(--disp);font-weight:600;font-size:var(--fs-300);letter-spacing:.08em}

/* ── skip link ── */
.skip{
  position:fixed;top:var(--s2);left:var(--s2);z-index:200;transform:translateY(-160%);
  background:var(--ink);color:var(--accent-ink);padding:var(--s3) var(--s4);border-radius:3px;
  font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.14em;text-transform:uppercase;
  transition:transform var(--dur-1) var(--ease);
}
.skip:focus-visible{transform:translateY(0)}

/* ── buttons ── */
.ar .btn{
  display:inline-flex;align-items:center;justify-content:center;gap:var(--s2);
  min-height:48px;padding:0 var(--s5);border-radius:999px;
  font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.13em;text-transform:uppercase;
  border:1px solid var(--ink);
  transition:transform var(--dur-2) var(--ease),box-shadow var(--dur-2) var(--ease),border-color var(--dur-2) var(--ease),background var(--dur-2) var(--ease);
}
.ar .btn-primary{background:var(--ink);color:var(--accent-ink)}
.ar .btn-primary:hover{transform:translateY(calc(var(--lift) * -1));box-shadow:0 14px 24px -14px rgba(22,21,18,.8)}
.ar .btn-quiet{background:transparent;color:var(--ink);border-color:var(--rule)}
.ar .btn-quiet:hover{border-color:var(--ink);transform:translateY(calc(var(--lift) * -1))}
.bar-resume{
  display:inline-flex;align-items:center;gap:var(--s2);min-height:40px;padding:0 var(--s3);
  font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.11em;text-transform:uppercase;
  color:var(--graphite);border:1px solid var(--rule);border-radius:999px;
  transition:color var(--dur-2) var(--ease),border-color var(--dur-2) var(--ease);
}
.bar-resume:hover{color:var(--ink);border-color:var(--ink)}
@media(max-width:1040px){.bar-resume{display:none}}

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */
.hero{position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:flex-end;padding-top:var(--s9);z-index:1}
.hero-hint{
  position:absolute;left:0;right:0;top:clamp(84px,14vh,160px);text-align:center;z-index:3;padding:0 var(--gutter);
  font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.3em;text-transform:uppercase;color:var(--graphite);
  pointer-events:none;
}
.stage{position:relative;flex:1;display:flex;align-items:flex-end;justify-content:center;perspective:1500px;perspective-origin:50% 42%}
.stage-in{
  position:relative;width:100%;display:flex;align-items:flex-end;justify-content:center;
  transform-style:preserve-3d;transform:rotateX(2deg) rotateY(0deg);
  transition:transform var(--dur-3) var(--ease);will-change:transform;
}
.name3d{
  position:absolute;left:0;right:0;top:clamp(24px,7vh,90px);
  transform-style:preserve-3d;transform:translateZ(-190px) scale(1.12);
  pointer-events:none;
}
.name3d>span{
  display:block;text-align:center;white-space:nowrap;
  font-family:var(--disp);font-weight:600;text-transform:uppercase;
  font-size:var(--fs-hero);line-height:.88;letter-spacing:-.035em;
}
.name3d>span+span{position:absolute;left:0;right:0;top:0}
.name3d .surname{color:var(--ink)}

.fig3d{
  position:relative;z-index:2;width:min(52vw,520px);transform-style:preserve-3d;
  transition:transform var(--dur-3) var(--ease);will-change:transform;
}
.fig3d picture{display:block}
.fig3d img{
  width:100%;height:auto;display:block;
  -webkit-mask-image:linear-gradient(180deg,#000 88%,transparent 100%);
  mask-image:linear-gradient(180deg,#000 88%,transparent 100%);
}
/* reliefs are masked colour fills now — no stacked <img>, and not black */
.fig3d .relief{
  position:absolute;inset:0;pointer-events:none;background:var(--accent);
  -webkit-mask:url(${PORTRAIT_WEBP}) center/contain no-repeat;
  mask:url(${PORTRAIT_WEBP}) center/contain no-repeat;
}
.fig3d .relief:nth-child(2n){background:var(--accent-2)}
@media(max-width:760px){.fig3d{width:min(78vw,380px)}}
@media(max-width:400px){.fig3d{width:min(72vw,300px)}.name3d{transform:translateZ(-150px) scale(1)}}

.ground{
  position:absolute;bottom:2px;left:50%;width:64%;height:70px;
  transform:translateX(-50%) rotateX(84deg);transform-origin:50% 100%;
  background:radial-gradient(ellipse at center,rgba(22,21,18,.3),transparent 68%);
  filter:blur(14px);pointer-events:none;
}
.marks{position:absolute;inset:-4% -7% 5% -7%;pointer-events:none;transform:translateZ(70px)}
.mark{position:absolute;width:16px;height:16px;border:1px solid var(--rule)}
.mark.tl{top:0;left:0;border-right:0;border-bottom:0}
.mark.tr{top:0;right:0;border-left:0;border-bottom:0}
.mark.bl{bottom:0;left:0;border-right:0;border-top:0}
.mark.br{bottom:0;right:0;border-left:0;border-top:0}
.mark-lbl{position:absolute;bottom:-3px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:10px;letter-spacing:.14em;color:var(--graphite);white-space:nowrap}
@media(max-width:400px){.mark-lbl{display:none}}

.hero-foot{display:flex;justify-content:space-between;align-items:flex-end;gap:var(--s6);padding-bottom:var(--s6);margin-top:-104px;position:relative;z-index:5}
@media(max-width:900px){.hero-foot{margin-top:-24px;flex-direction:column;align-items:flex-start;gap:var(--s5);padding-bottom:var(--s5)}}
.hero-role{font-family:var(--disp);font-weight:600;font-size:var(--fs-700);letter-spacing:-.02em;line-height:var(--lh-tight)}
.hero-tag{margin-top:var(--s3);max-width:34ch;font-size:var(--fs-400);line-height:var(--lh-body);color:var(--graphite)}
.hero-links{display:flex;flex-direction:column;gap:0;min-width:210px}
.hero-links a{
  display:flex;align-items:center;gap:var(--s3);min-height:44px;font-size:var(--fs-300);color:var(--graphite);
  border-bottom:1px solid var(--rule-2);
  transition:color var(--dur-2) var(--ease),padding-left var(--dur-2) var(--ease);
}
.hero-links a:hover{color:var(--ink);padding-left:var(--lift)}
.hero-links a .ar-arrow{margin-left:auto;opacity:0;transition:opacity var(--dur-2) ease}
.hero-links a:hover .ar-arrow{opacity:1}

.cta{
  display:inline-flex;align-items:center;gap:var(--s2);margin-top:var(--s5);
  border:1px solid var(--ink);border-radius:999px;min-height:48px;padding:0 var(--s5);
  font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.13em;text-transform:uppercase;
  position:relative;overflow:hidden;
  transition:color var(--dur-2) var(--ease),transform var(--dur-2) var(--ease),box-shadow var(--dur-2) var(--ease);
}
.cta span{position:relative;z-index:1;display:inline-flex;align-items:center;gap:var(--s2)}
.cta::before{content:"";position:absolute;inset:0;background:var(--ink);transform:translateY(101%);transition:transform var(--dur-3) var(--ease)}
.cta:hover{color:var(--paper);transform:translateY(calc(var(--lift) * -1));box-shadow:0 14px 24px -16px rgba(22,21,18,.8)}
.cta:hover::before{transform:translateY(0)}
.cta-persp{display:inline-block}

/* ── marquee ── */
.marq{
  position:relative;z-index:1;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);
  background:var(--paper-2);overflow:hidden;perspective:600px;padding:var(--s1) 0;
}
.marq-plane{transform:rotateX(22deg);transform-style:preserve-3d}
.marq-row{display:flex;width:max-content;padding:var(--s2) 0}
.marq-row.a{animation:slide 38s linear infinite}
.marq-row.b{animation:slideB 52s linear infinite reverse;transform:translateZ(-46px);opacity:.35}
.marq-item{font-family:var(--disp);font-weight:500;font-size:var(--fs-300);letter-spacing:.14em;text-transform:uppercase;padding:0 var(--s5);display:flex;align-items:center;gap:var(--s5);color:var(--ink)}
.marq-item::after{content:"";width:4px;height:4px;border-radius:50%;background:var(--accent-2)}
@keyframes slide{to{transform:translateX(-50%)}}
@keyframes slideB{to{transform:translateZ(-46px) translateX(-50%)}}
.marq:hover .marq-row{animation-play-state:paused}

/* ── profile ── */
.profile-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:var(--s8);align-items:start;padding-left:var(--rail)}
@media(max-width:1000px){.profile-grid{grid-template-columns:1fr;gap:var(--s6)}}
@media(max-width:760px){.profile-grid{padding-left:0}}
.statement{font-size:var(--fs-600);line-height:var(--lh-snug);font-weight:400;letter-spacing:-.015em;max-width:24ch}
.statement em{font-style:normal;color:var(--accent)}
.bio{margin-top:var(--s5);font-size:var(--fs-400);line-height:var(--lh-body);color:var(--graphite);max-width:var(--measure)}

.stats{display:grid;grid-template-columns:1fr 1fr;gap:var(--s2)}
.stat{perspective:900px;height:150px}
.stat-in{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform var(--dur-3) var(--ease)}
.stat:hover .stat-in,.stat:focus-within .stat-in{transform:rotateY(180deg)}
.stat-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:1px solid var(--rule);padding:var(--s5) var(--s4);display:flex;flex-direction:column;justify-content:space-between;gap:var(--s3);background:var(--paper)}
.stat-face.back{transform:rotateY(180deg);background:var(--ink);color:var(--paper);border-color:var(--ink)}
.stat .n{font-family:var(--disp);font-weight:600;font-size:var(--fs-700);line-height:1;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.stat .l{font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.14em;text-transform:uppercase;color:var(--graphite)}
.stat-face.back .l{color:var(--paper);opacity:.7}
.stat-face.back p{font-size:var(--fs-300);line-height:var(--lh-snug)}

/* ─────────────────────────────────────────────
   rows — numerals sit on the page rail
   ───────────────────────────────────────────── */
.row-persp{perspective:1400px}
.row{
  position:relative;display:grid;align-items:center;gap:var(--s5);
  padding:var(--s5) 0;border-bottom:1px solid var(--rule);
  transform-style:preserve-3d;background:transparent;
  transition:transform var(--dur-2) var(--ease),box-shadow var(--dur-2) var(--ease),padding-left var(--dur-2) var(--ease);
  will-change:transform;
}
.row.lift{padding-left:var(--lift);box-shadow:0 18px 30px -26px rgba(22,21,18,.5)}
.row::before{content:"";position:absolute;left:0;top:0;bottom:0;width:0;background:var(--accent);transition:width var(--dur-2) var(--ease)}
.row.lift::before{width:2px}
.row-num{font-family:var(--disp);font-weight:500;font-size:var(--fs-200);letter-spacing:.12em;color:var(--graphite);font-variant-numeric:tabular-nums;transition:color var(--dur-2) var(--ease)}
.row.lift .row-num{color:var(--accent)}
.row-title{font-family:var(--disp);font-weight:600;font-size:var(--fs-700);letter-spacing:-.02em;text-transform:uppercase;line-height:1.08;display:block;transition:transform var(--dur-2) var(--ease);transform-style:preserve-3d}
.row.lift .row-title{transform:translateZ(8px)}
.row-sub{font-size:var(--fs-300);color:var(--graphite);margin-top:var(--s2);line-height:var(--lh-snug);display:block;max-width:56ch}
.row-meta{font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.13em;text-transform:uppercase;color:var(--graphite);text-align:right}

.exp-row{grid-template-columns:var(--rail) minmax(0,1fr) minmax(0,240px);gap:0 var(--s5)}
@media(max-width:900px){.exp-row{grid-template-columns:var(--rail) minmax(0,1fr);row-gap:var(--s3)}.exp-row .row-meta{grid-column:2;text-align:left}}
.work-row{grid-template-columns:var(--rail) minmax(0,1fr) auto 44px;gap:0 var(--s5);cursor:pointer;text-align:left;width:100%}
@media(max-width:860px){.work-row{grid-template-columns:var(--rail) minmax(0,1fr) 44px}.work-row .row-meta{display:none}}

.plus{width:36px;height:36px;border:1px solid var(--rule);border-radius:50%;display:grid;place-items:center;color:var(--graphite);justify-self:end;transition:transform var(--dur-2) var(--ease),background var(--dur-2) var(--ease),color var(--dur-2) var(--ease),border-color var(--dur-2) var(--ease)}
.row.lift .plus{border-color:var(--ink);color:var(--ink)}
.plus.open{transform:rotate(45deg);background:var(--ink);border-color:var(--ink);color:var(--paper)}

.panel{overflow:hidden;transition:height var(--dur-3) var(--ease),opacity var(--dur-2) ease}
.panel-in{padding:var(--s2) 0 var(--s6) var(--rail);display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:var(--s7);perspective:1000px}
@media(max-width:860px){.panel-in{grid-template-columns:1fr;gap:var(--s5)}}
.bullets{display:flex;flex-direction:column;gap:var(--s3)}
.bullet{display:flex;gap:var(--s3);font-size:var(--fs-400);line-height:var(--lh-body);color:var(--ink);max-width:var(--measure)}
.bullet::before{content:"";flex:none;width:14px;height:1px;background:var(--accent);margin-top:13px}
.bullet.is-todo{color:var(--accent-2);font-family:var(--mono);font-size:var(--fs-300)}
.bullet.is-todo::before{background:var(--accent-2)}
.chips{display:flex;flex-wrap:wrap;gap:var(--s2)}
.chip{
  font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.1em;text-transform:uppercase;color:var(--graphite);
  border:1px solid var(--rule);border-radius:3px;padding:var(--s2) var(--s3);
  transition:border-color var(--dur-2) var(--ease),color var(--dur-2) var(--ease),background var(--dur-2) var(--ease);
}
.chip:hover{border-color:var(--ink);color:var(--ink);background:var(--paper-2)}
.extlink{display:inline-flex;align-items:center;gap:var(--s2);min-height:44px;font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-right:var(--s5);transition:color var(--dur-2) var(--ease)}
.extlink span{border-bottom:1px solid currentColor;padding-bottom:2px}
.extlink:hover{color:var(--ink)}

/* ── filters ── */
.filters{display:flex;flex-wrap:wrap;gap:var(--s2);margin-bottom:var(--s5)}
.filters button{
  font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.12em;text-transform:uppercase;
  min-height:44px;padding:0 var(--s4);border:1px solid var(--rule);border-radius:999px;color:var(--graphite);
  display:inline-flex;align-items:center;
  transition:background var(--dur-2) var(--ease),color var(--dur-2) var(--ease),border-color var(--dur-2) var(--ease);
}
.filters button sup{font-size:9px;margin-left:4px;vertical-align:super;font-variant-numeric:tabular-nums}
.filters button:hover{border-color:var(--ink);color:var(--ink)}
.filters button[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:var(--paper)}

/* ─────────────────────────────────────────────
   case study
   ───────────────────────────────────────────── */
.cs-top{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,340px);gap:var(--s7);align-items:start;margin-bottom:var(--s7);padding-left:var(--rail)}
@media(max-width:900px){.cs-top{grid-template-columns:1fr;gap:var(--s5);padding-left:0}}
.cs-name{font-family:var(--disp);font-weight:600;font-size:var(--fs-900);line-height:.95;letter-spacing:-.035em;text-transform:uppercase}
.cs-sub{margin-top:var(--s3);font-size:var(--fs-500);line-height:var(--lh-body);color:var(--graphite);max-width:46ch}
.cs-facts{display:flex;flex-direction:column;border-top:1px solid var(--rule)}
.cs-fact{display:flex;gap:var(--s4);justify-content:space-between;align-items:baseline;padding:var(--s3) 0;border-bottom:1px solid var(--rule-2)}
.cs-fact .k{font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.15em;text-transform:uppercase;color:var(--graphite);flex:none}
.cs-fact .v{font-size:var(--fs-300);text-align:right;line-height:var(--lh-snug)}

.cs-block{display:grid;grid-template-columns:var(--rail) minmax(0,1fr);gap:0;padding:var(--s6) 0;border-top:1px solid var(--rule)}
.cs-n{font-family:var(--disp);font-weight:500;font-size:var(--fs-200);letter-spacing:.12em;color:var(--accent);font-variant-numeric:tabular-nums;position:sticky;top:96px;align-self:start}
@media(max-width:760px){.cs-n{position:static}}
.cs-k{font-family:var(--disp);font-weight:600;font-size:var(--fs-600);letter-spacing:-.01em;text-transform:uppercase;margin-bottom:var(--s4);line-height:var(--lh-tight)}
.cs-body p{font-size:var(--fs-500);line-height:var(--lh-body);color:var(--ink);max-width:var(--measure)}
.cs-body p+p{margin-top:var(--s4)}
.cs-body p.todo{
  color:var(--accent-2);border-left:2px solid var(--accent-2);padding-left:var(--s3);
  font-family:var(--mono);font-size:var(--fs-300);line-height:var(--lh-snug);
}

.slots{display:grid;gap:var(--s3);margin-top:var(--s5)}
.work-shot{grid-column:1/-1;margin-top:var(--s5)}
.work-shots{grid-column:1/-1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s3);margin-top:var(--s5)}
@media(max-width:860px){.work-shots{grid-template-columns:1fr;grid-column:auto}}
.shot{border:1px solid var(--rule);border-radius:4px;overflow:hidden;background:var(--ink);box-shadow:0 18px 34px -26px rgba(22,21,18,.55)}
.shot img{display:block;width:100%;height:auto}
.shot.wide{grid-column:1/-1}
.phone-row{
  grid-column:1/-1;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:var(--s5);
  margin-top:var(--s5);padding:var(--s7) var(--s5);border:1px solid var(--rule);border-radius:4px;
  background:
    radial-gradient(60% 80% at 50% 100%,color-mix(in srgb,var(--accent) 14%,transparent),transparent 70%),
    var(--paper-2);
}
@media(max-width:860px){.phone-row{grid-column:auto;padding:var(--s5) var(--s3);gap:var(--s3)}}
.shot.phone{width:clamp(96px,26vw,224px);border-radius:22px;border:6px solid var(--ink);background:var(--ink);box-shadow:0 24px 40px -24px rgba(22,21,18,.6)}
.shot.phone img{border-radius:15px}
@media(max-width:860px){.work-shot{grid-column:auto}}
.slot{
  position:relative;border:1px solid var(--rule);border-radius:3px;overflow:hidden;
  background:
    radial-gradient(42% 62% at 50% 40%,color-mix(in srgb,var(--accent) 10%,transparent),transparent 75%),
    repeating-linear-gradient(135deg,var(--paper-2) 0 11px,var(--paper-3) 11px 22px);
  display:flex;flex-direction:column;justify-content:flex-end;
}
.slot img{width:100%;height:auto;display:block}
.slot-cap{
  background:var(--paper);border-top:1px solid var(--rule);padding:var(--s3) var(--s4);
  font-family:var(--mono);font-size:var(--fs-200);line-height:var(--lh-snug);color:var(--graphite);
  display:flex;flex-wrap:wrap;gap:var(--s1) var(--s3);align-items:baseline;
}
.slot-cap b{font-weight:500;color:var(--ink)}
.slot-cap span{margin-left:auto;color:var(--accent-2)}

/* ── process ── */
.proc{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--rule)}
@media(max-width:1000px){.proc{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:620px){.proc{grid-template-columns:1fr}}
.proc-step{
  padding:var(--s5) var(--s5) var(--s6);border-right:1px solid var(--rule-2);border-bottom:1px solid var(--rule);
  display:flex;flex-direction:column;gap:var(--s3);
  transition:background var(--dur-2) var(--ease);
}
.proc-step:last-child{border-right:0}
.proc-step:hover{background:var(--paper-2)}
@media(max-width:620px){.proc-step{border-right:0;padding:var(--s5) 0}}
.proc-n{font-family:var(--disp);font-weight:500;font-size:var(--fs-200);letter-spacing:.12em;color:var(--accent);font-variant-numeric:tabular-nums}
.proc-t{font-family:var(--disp);font-weight:600;font-size:var(--fs-600);letter-spacing:-.015em;text-transform:uppercase;line-height:var(--lh-tight)}
.proc-l{font-size:var(--fs-300);line-height:var(--lh-body);color:var(--graphite)}
.proc-tools{display:flex;flex-wrap:wrap;gap:var(--s1);margin-top:auto;padding-top:var(--s2)}

/* ── tools ── */
.cap-row{margin-bottom:var(--s7);padding-left:var(--rail)}
@media(max-width:760px){.cap-row{padding-left:0}}
.cap-list{display:flex;flex-wrap:wrap;gap:var(--s2);margin-top:var(--s4)}
.cap{
  font-family:var(--disp);font-weight:500;font-size:var(--fs-200);letter-spacing:.08em;text-transform:uppercase;
  border:1px solid var(--rule);border-radius:999px;min-height:40px;padding:0 var(--s4);color:var(--ink);
  display:inline-flex;align-items:center;
  transition:border-color var(--dur-2) var(--ease),background var(--dur-2) var(--ease);
}
.cap:hover{border-color:var(--ink);background:var(--paper-2)}
.tool-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid var(--rule)}
@media(max-width:820px){.tool-grid{grid-template-columns:1fr}}
.tool-col{padding:var(--s5) var(--s5) var(--s6);border-right:1px solid var(--rule-2);border-bottom:1px solid var(--rule)}
.tool-col:last-child{border-right:0}
@media(max-width:820px){.tool-col{border-right:0;padding:var(--s5) 0}}
.tool-g{font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:var(--s4)}
.tool-col ul{list-style:none}
.tool-col li{
  font-size:var(--fs-500);line-height:var(--lh-snug);padding:var(--s3) 0;border-bottom:1px solid var(--rule-2);
  transition:padding-left var(--dur-2) var(--ease);
}
.tool-col li:last-child{border-bottom:0}
.tool-col li:hover{padding-left:var(--lift)}

/* ─────────────────────────────────────────────
   contact
   ───────────────────────────────────────────── */
.contact-stage{perspective:1400px;padding-left:var(--rail)}
@media(max-width:760px){.contact-stage{padding-left:0}}
.contact-3d{
  position:relative;transform-style:preserve-3d;
  transform:rotateX(5deg) rotateY(-6deg);transition:transform var(--dur-3) var(--ease);
}
.contact-3d .layer{
  font-family:var(--disp);font-weight:600;font-size:var(--fs-900);line-height:.94;letter-spacing:-.035em;text-transform:uppercase;
}
.contact-3d .layer+.layer{position:absolute;left:0;top:0;right:0}
.contact-3d .thin{color:var(--accent-2)}

.contact-open{margin-top:var(--s6);font-size:var(--fs-600);line-height:var(--lh-snug);max-width:40ch;padding-left:var(--rail)}
.contact-open em{font-style:normal;color:var(--accent)}
.contact-actions{display:flex;flex-wrap:wrap;gap:var(--s3);margin-top:var(--s5);padding-left:var(--rail)}
@media(max-width:760px){.contact-open,.contact-actions{padding-left:0}}

.contact-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--s2);margin-top:var(--s7);perspective:1200px}
@media(max-width:900px){.contact-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.contact-grid{grid-template-columns:1fr}}
.cbox{
  padding:var(--s5) var(--s4);border:1px solid var(--rule);background:var(--paper);min-height:44px;
  display:flex;flex-direction:column;gap:var(--s2);text-align:left;
  transition:transform var(--dur-2) var(--ease),box-shadow var(--dur-2) var(--ease),background var(--dur-2) var(--ease);
}
.cbox:hover{transform:translateY(calc(var(--lift) * -1));box-shadow:0 16px 26px -20px rgba(22,21,18,.55);background:var(--paper-2)}
.cbox .k{display:flex;align-items:center;gap:var(--s2);font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.15em;text-transform:uppercase;color:var(--graphite)}
.cbox .v{font-size:var(--fs-400);word-break:break-word;line-height:var(--lh-snug)}
.foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--s3);padding:var(--s5) 0 var(--s7);margin-top:var(--s7);border-top:1px solid var(--rule);font-family:var(--disp);font-weight:500;font-size:var(--fs-100);letter-spacing:.15em;text-transform:uppercase;color:var(--graphite)}

/* ── reveal ── */
.rv{opacity:0;transform:translateY(8px);transition:opacity var(--dur-3) var(--ease),transform var(--dur-3) var(--ease)}
.rv.in{opacity:1;transform:none}

@media(prefers-reduced-motion:reduce){
  .ar *,.ar *::before,.ar *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
  .rv{opacity:1;transform:none}
  .sec-title{transform:none;opacity:1}
  .name3d>span+span{display:none}
  .fig3d .relief{display:none}
  .contact-3d{transform:none}
  .contact-3d .layer+.layer{display:none}
  .marq-row{animation:none!important}
  .dot::after{display:none}
  .floor{display:none}
}
`;

/* ═══════════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */

function Rv({ children, delay = 0, className = "", style, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (el.classList.add("in"), io.unobserve(el)),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </div>
  );
}

function SectionHead({ idx, title, note }) {
  return (
    <Rv className="sec-head">
      <span className="sec-idx">{idx}</span>
      <h2 className="sec-title">{title}</h2>
      {note && <p className="sec-note">{note}</p>}
    </Rv>
  );
}

/** Wraps a row so it tilts toward the cursor and lifts on Z. */
function Row3D({ children, className = "", as: Tag = "div", maxTilt = 4, ...rest }) {
  const ref = useRef(null);
  const [lift, setLift] = useState(false);

  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translateZ(26px) rotateX(${-py * maxTilt * 2}deg) rotateY(${px * maxTilt}deg)`;
  };
  const leave = () => {
    setLift(false);
    if (ref.current) ref.current.style.transform = "translateZ(0px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="row-persp">
      <Tag
        ref={ref}
        onMouseEnter={() => setLift(true)}
        onMouseMove={move}
        onMouseLeave={leave}
        className={`row ${lift ? "lift" : ""} ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    </div>
  );
}

function Panel({ open, children }) {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => setH(el.scrollHeight);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);
  return (
    <div className="panel" style={{ height: open ? h : 0, opacity: open ? 1 : 0 }} aria-hidden={!open}>
      <div ref={ref}>{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════════════════════════ */

function Floor() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.setProperty("--fy", `${(window.scrollY * 0.28) % 74}px`);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => (window.removeEventListener("scroll", onScroll), cancelAnimationFrame(raf));
  }, []);
  return <div className="floor" aria-hidden="true"><i ref={ref} /></div>;
}

function Bar({ active, go }) {
  return (
    <header className="bar">
      <div className="bar-status"><span className="dot" /> Available for new project</div>
      <div className="bar-brand d">A. Riaz</div>
      <nav className="bar-nav">
        {NAV.map((n) => (
          <button key={n.id} className={active === n.id ? "on" : ""} onClick={() => go(n.id)}>
            {n.label}{n.meta && <sup>[{n.meta}]</sup>}
          </button>
        ))}
      </nav>
      <a className="bar-resume" href={RESUME} download>Résumé</a>
      <a className="talk" href={`mailto:${PROFILE.email}`}>Let's talk <ArrowUpRight size={12} /></a>
    </header>
  );
}

function Hero({ go }) {
  const stage = useRef(null);
  const fig = useRef(null);

  useEffect(() => {
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        if (stage.current) stage.current.style.transform = `rotateX(${2 - y * 9}deg) rotateY(${x * 16}deg)`;
        if (fig.current) fig.current.style.transform = `translateZ(40px) translateX(${x * -16}px)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => (window.removeEventListener("mousemove", onMove), cancelAnimationFrame(raf));
  }, []);

  /* one <span> per Z step; the extrusion is real geometry, not a shadow */
  const nameLayers = Array.from({ length: NAME_LAYERS }, (_, i) => {
    const t = i / (NAME_LAYERS - 1);
    return (
      <span
        key={i}
        style={{
          transform: `translateZ(${-i * 9}px)`,
          color: i === 0 ? "var(--accent)" : `rgba(22,21,18,${(0.11 * (1 - t) + 0.02).toFixed(3)})`,
        }}
      >
        {PROFILE.first}&nbsp;<span className="surname" style={i === 0 ? undefined : { color: "inherit" }}>{PROFILE.last}</span>
      </span>
    );
  });

  const reliefLayers = Array.from({ length: FIG_LAYERS }, (_, i) => (
    <div className="relief" key={i} style={{ transform: `translateZ(${-(i + 1) * 6}px)`, opacity: 0.1 }} />
  ));

  return (
    <section id="home" className="hero">
      <div className="hero-hint">Product Design · Prototyping · Design Systems</div>

      <div className="stage">
        <div className="stage-in" ref={stage}>
          <div className="name3d d">{nameLayers}</div>

          <div className="fig3d" ref={fig} style={{ transform: "translateZ(40px)" }}>
            {reliefLayers}
            <picture>
              <source srcSet={PORTRAIT_WEBP} type="image/webp" />
              <img src={PORTRAIT} alt="Ahmad Riaz" draggable="false" decoding="async" />
            </picture>
            <div className="ground" />
            <div className="marks">
              <span className="mark tl" /><span className="mark tr" />
              <span className="mark bl" /><span className="mark br" />
              <span className="mark-lbl">AR / LHR / PK / MMXXVI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ width: "100%" }}>
        <div className="hero-foot">
          <Rv delay={120}>
            <h1 className="hero-role">{PROFILE.role}</h1>
            <p className="hero-tag">{PROFILE.tagline}</p>
            <span className="cta-persp">
              <button className="cta" onClick={() => go("work")}>
                <span>Let's collaborate <ArrowUpRight size={13} /></span>
              </button>
            </span>
          </Rv>

          <Rv delay={220} className="hero-links">
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={14} /> LinkedIn <ArrowUpRight size={12} className="ar-arrow" />
            </a>
            <a href={`mailto:${PROFILE.email}`}>
              <Mail size={14} /> Email <ArrowUpRight size={12} className="ar-arrow" />
            </a>
            <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>
              <Phone size={14} /> Phone <ArrowUpRight size={12} className="ar-arrow" />
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }}>
              <MapPin size={14} /> Lahore, PK <ArrowUpRight size={12} className="ar-arrow" />
            </a>
          </Rv>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marq" aria-hidden="true">
      <div className="marq-plane">
        <div className="marq-row a">{items.map((t, i) => <span className="marq-item" key={i}>{t}</span>)}</div>
        <div className="marq-row b">{items.map((t, i) => <span className="marq-item" key={i}>{t}</span>)}</div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <section id="profile" className="sec">
      <div className="wrap">
        <SectionHead idx="01 /" title="Profile" note="Design-led practice, computer science foundation, production delivery." />
        <div className="profile-grid">
          <Rv>
            <p className="statement">
              I design the product: <em>flows, wireframes, prototypes, design systems</em>. Then I build the front end, so what I drew is what ships.
            </p>
            <p className="bio">{PROFILE.bio}</p>
          </Rv>
          <Rv delay={140} className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.l} tabIndex={0}>
                <div className="stat-in">
                  <div className="stat-face">
                    <div className="n d">{s.n}</div>
                    <div className="l">{s.l}</div>
                  </div>
                  <div className="stat-face back">
                    <p>{s.back}</p>
                    <div className="l">{s.l}</div>
                  </div>
                </div>
              </div>
            ))}
          </Rv>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="sec">
      <div className="wrap">
        <SectionHead idx="06 /" title="Experience" note="From owning UI components to owning the whole product experience." />
        {EXPERIENCE.map((j, i) => (
          <Rv key={j.company} delay={i * 90}>
            <Row3D className="exp-row">
              <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="row-title">{j.company}</h3>
                <span className="row-sub">{j.role}: {j.points[0]}</span>
                <div className="chips" style={{ marginTop: 14 }}>
                  {j.stack.map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
              </div>
              <div className="row-meta">
                {j.period}
                {j.current && <div style={{ marginTop: 8, color: "var(--accent)" }}>● Current</div>}
              </div>
            </Row3D>
          </Rv>
        ))}
      </div>
    </section>
  );
}

function Work() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(0);

  const counts = useMemo(() => {
    const c = { All: PROJECTS.length };
    FILTERS.slice(1).forEach((f) => (c[f] = PROJECTS.filter((p) => p.discipline === f).length));
    return c;
  }, []);

  const list = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.discipline === filter)),
    [filter]
  );

  useEffect(() => setOpen(0), [filter]);

  return (
    <section id="work" className="sec">
      <div className="wrap">
        <SectionHead idx="02 /" title="Selected Work" note="Compliance SaaS, PropTech, security training and logistics. Filter by what I did, not by the stack." />

        <Rv className="filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}<sup>[{String(counts[f]).padStart(2, "0")}]</sup>
            </button>
          ))}
        </Rv>

        {list.map((p, i) => {
          const isOpen = open === i;
          return (
            <Rv key={p.title} delay={Math.min(i, 4) * 60}>
              <Row3D
                as="button"
                className="work-row"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="row-title">{p.title}</span>
                  <span className="row-sub">{p.sub}</span>
                </span>
                <span className="row-meta">{p.role}<br />{p.year}</span>
                <span className={`plus ${isOpen ? "open" : ""}`}><Plus size={13} /></span>
              </Row3D>

              <Panel open={isOpen}>
                <div className="panel-in">
                  <div className="bullets">
                    {p.points.map((b) => (
                      <span className={`bullet ${b.startsWith("TODO:") ? "is-todo" : ""}`} key={b}>{b}</span>
                    ))}
                    {p.links.length > 0 && (
                      <div style={{ marginTop: 16 }}>
                        {p.links.map((l) => (
                          <a className="extlink" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                            <span>{l.label}</span> <ArrowUpRight size={11} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="lbl" style={{ marginBottom: 13 }}>Stack</div>
                    <div className="chips">
                      {p.stack.map((t) => <span className="chip" key={t}>{t}</span>)}
                    </div>
                  </div>
                  {WORK_SHOTS[p.title] && <Shots items={WORK_SHOTS[p.title]} />}
                </div>
              </Panel>
            </Rv>
          );
        })}
      </div>
    </section>
  );
}

/** A labelled placeholder for a Figma artefact. Renders the real image
 *  once CASE_SLOTS[key].src is filled in — never a drawn stand-in. */
function Slot({ id }) {
  const s = CASE_SLOTS[id];
  if (!s) return null;
  if (s.items) return <Shots items={s.items} />;
  if (!s.src) return null;   // nothing real yet: show nothing rather than an empty box
  return (
    <figure className="slot" style={{ aspectRatio: s.src ? undefined : s.ratio }}>
      {s.src && <img src={s.src} alt={s.note} loading="lazy" decoding="async" />}
      <figcaption className="slot-cap">
        <b>{s.label}</b> {s.note} <span>{s.ratio.replace(/\s/g, "")}{s.src ? "" : " · empty"}</span>
      </figcaption>
    </figure>
  );
}

/** Real screenshots only. Phones get a centred row; desktops a 2-up grid. */
function Shots({ items }) {
  const phones = items.every((i) => i.phone);
  return (
    <div className={phones ? "phone-row" : "work-shots"}>
      {items.map((sh) => (
        <figure className={`shot${sh.phone ? " phone" : ""}${sh.wide ? " wide" : ""}`} key={sh.src}>
          <img src={sh.src} alt={sh.alt} loading="lazy" decoding="async" width={sh.w} height={sh.h} />
        </figure>
      ))}
    </div>
  );
}

function CaseStudy() {
  const c = CASE_STUDY;
  const facts = [
    { k: "Role", v: c.role },
    { k: "Year", v: c.year },
    { k: "Market", v: c.market },
    { k: "Platforms", v: c.platforms.join(" · ") },
    { k: "Tools", v: c.tools.join(" · ") },
  ];

  return (
    <section id="case-study" className="sec">
      <div className="wrap">
        <SectionHead
          idx="03 /"
          title="Case Study"
          note="One project, start to finish — what I explored, what I decided, and why."
        />

        <Rv className="cs-top">
          <div>
            <h3 className="cs-name">{c.project}</h3>
            <p className="cs-sub">{c.sub}</p>
          </div>
          <div className="cs-facts">
            {facts.map((f) => (
              <div className="cs-fact" key={f.k}>
                <span className="k">{f.k}</span>
                <span className="v">{f.v}</span>
              </div>
            ))}
          </div>
        </Rv>

        {c.sections.map((s, i) => (
          <Rv key={s.k} delay={Math.min(i, 4) * 50}>
            <div className="cs-block">
              <span className="cs-n">{String(i + 1).padStart(2, "0")} /</span>
              <div className="cs-body">
                <h4 className="cs-k">{s.k}</h4>
                {s.body.map((p) => (
                  <p key={p} className={p.startsWith("TODO:") ? "todo" : undefined}>{p}</p>
                ))}
                {s.slots && s.slots.some((id) => CASE_SLOTS[id]?.src || CASE_SLOTS[id]?.items) && (
                  <div className="slots">
                    {s.slots.map((id) => <Slot key={id} id={id} />)}
                  </div>
                )}
              </div>
            </div>
          </Rv>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="sec">
      <div className="wrap">
        <SectionHead
          idx="04 /"
          title="Process"
          note="The same four steps on every product, whether I am handing off or building it myself."
        />
        <Rv className="proc">
          {PROCESS.map((p, i) => (
            <div className="proc-step" key={p.step}>
              <span className="proc-n">{String(i + 1).padStart(2, "0")} /</span>
              <h3 className="proc-t">{p.step}</h3>
              <p className="proc-l">{p.line}</p>
              <div className="proc-tools">
                {p.tools.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </Rv>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools" className="sec">
      <div className="wrap">
        <SectionHead
          idx="05 /"
          title="Tools"
          note="What I can do, and what I do it with. No proficiency bars — ask me to open a file instead."
        />
        <Rv className="cap-row">
          <div className="lbl">Capabilities</div>
          <div className="cap-list">
            {CAPABILITIES.map((c) => <span className="cap" key={c}>{c}</span>)}
          </div>
        </Rv>
        <Rv delay={100} className="tool-grid">
          {TOOLS.map((g) => (
            <div className="tool-col" key={g.group}>
              <div className="tool-g">{g.group}</div>
              <ul>
                {g.items.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </Rv>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let raf = 0;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `rotateX(${6 - y * 10}deg) rotateY(${-7 + x * 16}deg)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => (window.removeEventListener("mousemove", onMove), cancelAnimationFrame(raf));
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.email; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch { /* unavailable */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const LAYERS = 12;

  return (
    <section id="contact" className="sec" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <SectionHead idx="07 /" title="Contact" note="Open to UI/UX and product design roles. Replies within a day." />

        <Rv className="contact-stage">
          <div className="contact-3d" ref={ref}>
            {Array.from({ length: LAYERS }, (_, i) => {
              const t = i / (LAYERS - 1);
              return (
                <div
                  className="layer"
                  key={i}
                  style={{
                    transform: `translateZ(${-i * 8}px)`,
                    color: i === 0 ? undefined : `rgba(22,21,18,${(0.14 * (1 - t) + 0.02).toFixed(3)})`,
                  }}
                  aria-hidden={i > 0}
                >
                  Let's design<br />
                  <span className="thin" style={i === 0 ? undefined : { color: "inherit" }}>something</span> real
                </div>
              );
            })}
          </div>
        </Rv>

        <Rv delay={90}>
          <p className="contact-open">
            I'm open to <em>UI/UX and product design roles</em> — full-time or contract, remote.
            Bring me a product that has to work for people who never asked to learn it.
          </p>
          <div className="contact-actions">
            <a className="btn btn-primary" href={RESUME} download>
              Download résumé (PDF) <ArrowUpRight size={12} />
            </a>
            <a className="btn btn-quiet" href={`mailto:${PROFILE.email}`}>
              Email me <Mail size={12} />
            </a>
          </div>
        </Rv>

        <Rv delay={120} className="contact-grid">
          <button className="cbox" onClick={copy}>
            <span className="k">{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Email: tap to copy"}</span>
            <span className="v">{PROFILE.email}</span>
          </button>
          <a className="cbox" href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>
            <span className="k"><Phone size={12} /> Phone</span>
            <span className="v">{PROFILE.phone}</span>
          </a>
          <a className="cbox" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="k"><Linkedin size={12} /> LinkedIn</span>
            <span className="v">ahmad-riaz-a3ab22310</span>
          </a>
          <div className="cbox">
            <span className="k"><MapPin size={12} /> Based in</span>
            <span className="v">{PROFILE.location}</span>
          </div>
        </Rv>

        <div className="foot">
          <span>© {new Date().getFullYear()} Ahmad Riaz</span>
          <span>Space Grotesk / Inter</span>
          <span>Available for new project</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function Portfolio() {
  const [active, setActive] = useState("home");

  const go = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const ids = ["home", "profile", "work", "case-study", "process", "tools", "experience", "contact"];
    const els = ids.map((i) => document.getElementById(i)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { threshold: [0.15, 0.4], rootMargin: "-20% 0px -50% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ar">
      <style>{CSS}</style>
      <a className="skip" href="#main">Skip to content</a>
      <Floor />
      <Bar active={active} go={go} />
      <Hero go={go} />
      <Marquee />
      <main id="main">
        <Profile />
        <Work />
        <CaseStudy />
        <Process />
        <Tools />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
