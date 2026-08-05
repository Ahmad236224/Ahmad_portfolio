"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  ArrowUpRight, Copy, Check, Mail, Phone, MapPin, Linkedin, Plus,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ASSETS — served from /public (see public/fonts and public/portrait)
   ═══════════════════════════════════════════════════════════════ */
const F_TEXAR = "/fonts/texar.woff2";
const F_LIGHT = "/fonts/lakes-light.woff2";
const F_REG = "/fonts/lakes-regular.woff2";
const F_MED = "/fonts/lakes-medium.woff2";
const F_BOLD = "/fonts/lakes-bold.woff2";
const PORTRAIT = "/portrait.webp";

/* depth of the extruded type + portrait relief */
const NAME_LAYERS = 14;
const FIG_LAYERS = 10;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const PROFILE = {
  first: "AHMAD",
  last: "RIAZ",
  role: "Full-Stack Developer",
  tagline: "Building production web, mobile and AI systems that ship — and keep shipping.",
  location: "Lahore, Pakistan",
  email: "ahmi2662@gmail.com",
  phone: "+92 323 7277228",
  linkedin: "https://linkedin.com/in/ahmad-riaz-a3ab22310",
  bio:
    "I'm a full-stack developer and hands-on AI builder with professional experience shipping production web and mobile products. I work daily with agentic AI workflows — Claude, Cursor, Lovable, ChatGPT, Gemini — on top of a solid computer science foundation (BSCS, University of Lahore).",
};

const STATS = [
  { n: "09", l: "Products shipped", back: "Web, mobile, admin and data platforms" },
  { n: "02", l: "Years in production", back: "Shipping for real users since 2023" },
  { n: "04", l: "Platforms covered", back: "Web · iOS · Android · Admin" },
  { n: "05", l: "Agentic tools, daily", back: "Claude · Cursor · Lovable · ChatGPT · Gemini" },
];

const MARQUEE = [
  "React", "Next.js", "TypeScript", "React Native", "Flutter", "Node.js",
  "PostgreSQL", "Prisma", "Firebase", "AWS", "Claude", "Cursor", "OpenAI",
];

const EXPERIENCE = [
  {
    period: "Dec 2025 — Present",
    company: "QuisHub",
    role: "Full Stack Developer",
    current: true,
    points: [
      "Delivering end-to-end web and mobile products for client accounts at an AI product studio.",
      "Owning frontend, backend, database and deployment, with agentic AI tools embedded in the daily workflow.",
    ],
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "Claude", "Cursor"],
  },
  {
    period: "Mar 2023 — Aug 2023",
    company: "Cloud Service Group",
    role: "Front-End Developer",
    current: false,
    points: [
      "Engineered interactive, responsive web interfaces with JavaScript, HTML and CSS.",
      "Owned UI components from design hand-off to production in an agile, Git-based workflow.",
    ],
    stack: ["JavaScript", "HTML", "CSS", "Git", "Agile"],
  },
];

const FILTERS = ["All", "Full-Stack Web", "Mobile Apps", "SaaS & AI"];

const PROJECTS = [
  {
    title: "QuisHub Messaging",
    sub: "Outbound messaging & calling platform",
    role: "Full Stack Developer",
    year: "2026",
    tags: ["Full-Stack Web", "SaaS & AI"],
    links: [{ label: "quishub.com", href: "https://quishub.com/" }],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Telnyx API", "GCP", "Render", "Vercel"],
    points: [
      "Scalable outbound telephony platform with real-time webhook processing.",
      "Automated call and SMS dispatching across client accounts.",
      "Ed25519-verified webhooks and a hardened API surface.",
    ],
  },
  {
    title: "Digitales",
    sub: "Premium agency platform",
    role: "Full Stack Developer",
    year: "2025",
    tags: ["Full-Stack Web"],
    links: [
      { label: "digitales.pk", href: "https://www.digitales.pk/" },
      { label: "digitalesusa.org", href: "https://www.digitalesusa.org/" },
    ],
    stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "API Routes", "Firebase", "Resend", "PageSpeed API", "Vercel"],
    points: [
      "Architected the core full-stack feature set across two regional sites.",
      "Automated CI/CD pipelines and cut page-load times.",
      "Dynamic structured-data schemas for search visibility.",
    ],
  },
  {
    title: "Nimdio",
    sub: "SaaS platform",
    role: "Designer & Front-End Developer",
    year: "2025",
    tags: ["SaaS & AI", "Full-Stack Web"],
    links: [{ label: "nimdi.ai", href: "https://nimdi.ai/" }],
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "REST APIs"],
    points: [
      "Led responsive UI design and the frontend architecture.",
      "Optimized state management for real-time data sync.",
      "Tuned rendering paths for low-latency interaction.",
    ],
  },
  {
    title: "Postal Solutions",
    sub: "Postal forwarding platform",
    role: "Designer & Front-End Developer",
    year: "2025",
    tags: ["Full-Stack Web"],
    links: [],
    stack: ["Next.js", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "n8n", "Puppeteer", "IPP Printing", "AWS EC2/S3/SES", "Stripe", "Google Places"],
    points: [
      "Designed the mail-forwarding UI flows end to end.",
      "Automated label and print workflows with Puppeteer and n8n.",
      "Integrated Stripe payments and Google Places address capture.",
    ],
  },
  {
    title: "Leasy Link",
    sub: "Leasing suite — mobile + admin",
    role: "Full Stack Developer",
    year: "2025",
    tags: ["Mobile Apps", "Full-Stack Web"],
    links: [],
    stack: ["Flutter", "Riverpod", "Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL 16", "Next.js Admin", "pdf-lib"],
    points: [
      "Cross-platform mobile app paired with a Next.js admin portal.",
      "Row-level security in PostgreSQL 16 for strict tenant isolation.",
      "Automated PDF signature stamping via Puppeteer and pdf-lib.",
    ],
  },
  {
    title: "LawPortal",
    sub: "Legal services platform",
    role: "Full Stack & Mobile Developer",
    year: "2024",
    tags: ["Mobile Apps", "Full-Stack Web"],
    links: [],
    stack: ["React", "React Native", "Expo", "TypeScript", "Firebase", "Expo Router", "Recharts", "AsyncStorage"],
    points: [
      "Cross-platform app matching clients with lawyers.",
      "Real-time chat and appointment scheduling.",
      "Web admin dashboard with live analytics.",
    ],
  },
  {
    title: "Futter",
    sub: "Cross-platform mobile app",
    role: "Full Stack Developer",
    year: "2024",
    tags: ["Mobile Apps"],
    links: [],
    stack: ["React Native", "Node.js", "Express", "Cloud Storage", "OAuth", "JWT", "Microservices"],
    points: [
      "Fluid, animation-led mobile experience.",
      "Microservice backend with independent deploy paths.",
      "Secure JWT and OAuth authentication.",
    ],
  },
  {
    title: "AI BookLoop",
    sub: "Book reselling marketplace",
    role: "Full Stack Mobile Developer",
    year: "2024",
    tags: ["Mobile Apps", "SaaS & AI"],
    links: [],
    stack: ["React Native", "Expo", "Node.js", "Firebase", "OpenAI API", "REST APIs"],
    points: [
      "Cover-photo recognition auto-fills book metadata on listing.",
      "Real-time chat between buyers and sellers.",
      "Order tracking through to handover.",
    ],
  },
  {
    title: "Education System Database",
    sub: "Institutional data model",
    role: "Core Data Engineer",
    year: "2023",
    tags: ["Full-Stack Web"],
    links: [],
    stack: ["MySQL", "SQL (DDL/DML)", "ER/EER Modeling", "Normalization"],
    points: [
      "Relational schema for administration, scheduling and assessments.",
      "Normalized to 3NF with enforced referential integrity.",
      "Query paths tuned for reporting workloads.",
    ],
  },
];

const SKILLS = [
  {
    category: "AI & Agentic Workflows",
    items: [
      { name: "Claude", level: 95 }, { name: "ChatGPT", level: 95 },
      { name: "Prompt Engineering", level: 93 }, { name: "Cursor", level: 92 },
      { name: "OpenAI LLM APIs", level: 90 }, { name: "Lovable", level: 88 },
      { name: "Gemini", level: 85 },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "HTML", level: 96 }, { name: "JavaScript", level: 95 },
      { name: "CSS", level: 94 }, { name: "TypeScript", level: 92 },
      { name: "SQL", level: 88 }, { name: "Python", level: 85 },
      { name: "C++", level: 75 },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React.js", level: 95 }, { name: "Tailwind CSS", level: 95 },
      { name: "Next.js", level: 92 }, { name: "Node.js", level: 90 },
      { name: "Express", level: 90 }, { name: "React Native", level: 88 },
      { name: "Expo", level: 86 }, { name: "Flutter", level: 80 },
      { name: "Riverpod", level: 78 },
    ],
  },
  {
    category: "Databases & Cloud",
    items: [
      { name: "Vercel", level: 92 }, { name: "PostgreSQL", level: 88 },
      { name: "Firebase", level: 87 }, { name: "MySQL", level: 85 },
      { name: "Prisma", level: 85 }, { name: "Render", level: 85 },
      { name: "AWS EC2/S3/SES", level: 80 }, { name: "GCP", level: 78 },
    ],
  },
];

const NAV = [
  { id: "work", label: "Work", meta: "09" },
  { id: "stack", label: "Stack", meta: "04" },
  { id: "experience", label: "Experience", meta: "2Y" },
  { id: "contact", label: "Contact", meta: "" },
];

/* ═══════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════ */

const CSS = `
@font-face{font-family:'TEXAR';src:url(${F_TEXAR}) format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:'Lakes';src:url(${F_LIGHT}) format('woff2');font-weight:300;font-display:swap}
@font-face{font-family:'Lakes';src:url(${F_REG}) format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:'Lakes';src:url(${F_MED}) format('woff2');font-weight:500;font-display:swap}
@font-face{font-family:'Lakes';src:url(${F_BOLD}) format('woff2');font-weight:700;font-display:swap}

.ar{
  --paper:#EDEBE7;
  --paper-2:#E5E2DC;
  --paper-3:#DCD8D1;
  --ink:#101010;
  --graphite:#6E6B66;
  --ghost:#D8D4CD;
  --rule:rgba(16,16,16,.13);
  --rule-2:rgba(16,16,16,.07);
  --signal:#C0432E;
  --ease:cubic-bezier(.16,1,.3,1);

  --disp:'TEXAR',ui-sans-serif,system-ui,sans-serif;
  --body:'Lakes',ui-sans-serif,system-ui,-apple-system,sans-serif;

  background:var(--paper);color:var(--ink);
  font-family:var(--body);font-weight:300;
  -webkit-font-smoothing:antialiased;
  position:relative;overflow-x:clip;min-height:100vh;
}
.ar *{box-sizing:border-box;margin:0;padding:0}
.ar ::selection{background:var(--ink);color:var(--paper)}
.ar button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
.ar a{color:inherit;text-decoration:none}
.ar :focus-visible{outline:1.5px solid var(--signal);outline-offset:4px}

.ar::before{
  content:"";position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;
  background-image:radial-gradient(rgba(16,16,16,.055) .6px,transparent .7px);
  background-size:3px 3px;
}

/* ─────────────────────────────────────────────
   3D ground plane — a real receding wireframe
   ───────────────────────────────────────────── */
.floor{position:fixed;inset:auto 0 0 0;height:52vh;z-index:0;pointer-events:none;perspective:420px;perspective-origin:50% 0%;overflow:hidden;opacity:.5}
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
.d{font-family:var(--disp);font-weight:400;text-transform:uppercase}
.lbl{font-family:var(--disp);font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--graphite)}

.wrap{position:relative;z-index:1;max-width:1340px;margin:0 auto;padding:0 32px}
@media(max-width:760px){.wrap{padding:0 18px}}
.sec{padding:110px 0;position:relative;z-index:1}
@media(max-width:760px){.sec{padding:68px 0}}

.sec-head{display:flex;align-items:baseline;gap:18px;padding-bottom:20px;border-bottom:1px solid var(--rule);margin-bottom:52px;flex-wrap:wrap;perspective:900px}
.sec-idx{font-family:var(--disp);font-size:11px;letter-spacing:.18em;color:var(--signal)}
.sec-title{
  font-family:var(--disp);font-size:clamp(26px,4.4vw,44px);letter-spacing:-.01em;text-transform:uppercase;line-height:1;
  transform-origin:50% 100%;transform:rotateX(-88deg);opacity:0;
  transition:transform 1s var(--ease) .1s,opacity .7s ease .1s;
}
.rv.in .sec-title{transform:rotateX(0deg);opacity:1}
.sec-note{margin-left:auto;font-size:13.5px;color:var(--graphite);max-width:38ch;line-height:1.6}
@media(max-width:760px){.sec-note{margin-left:0;flex-basis:100%;margin-top:10px}}

/* ── top bar ── */
.bar{
  position:fixed;top:0;left:0;right:0;z-index:60;
  display:flex;align-items:center;gap:24px;padding:16px 32px;
  background:rgba(237,235,231,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border-bottom:1px solid var(--rule-2);perspective:700px;
}
@media(max-width:760px){.bar{padding:12px 18px;gap:12px}}
.bar-status{display:flex;align-items:center;gap:9px;font-family:var(--disp);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--graphite)}
.dot{width:6px;height:6px;border-radius:50%;background:var(--signal);position:relative;flex:none}
.dot::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:1px solid var(--signal);animation:ping 2.6s ease-out infinite}
@keyframes ping{0%{transform:scale(.6);opacity:.8}100%{transform:scale(2);opacity:0}}
.bar-nav{display:flex;gap:26px;margin:0 auto;transform-style:preserve-3d}
.bar-nav button{
  font-family:var(--disp);font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--graphite);
  position:relative;padding-bottom:2px;transform-style:preserve-3d;
  transition:color .3s,transform .5s var(--ease);
}
.bar-nav button sup{font-size:8.5px;color:var(--signal);margin-left:1px;vertical-align:super}
.bar-nav button::after{content:"";position:absolute;left:0;bottom:0;height:1px;width:0;background:var(--ink);transition:width .35s var(--ease)}
.bar-nav button:hover,.bar-nav button.on{color:var(--ink)}
.bar-nav button:hover{transform:translateZ(26px) rotateX(-12deg)}
.bar-nav button:hover::after,.bar-nav button.on::after{width:100%}
.ar .talk{
  display:inline-flex;align-items:center;gap:7px;background:var(--ink);color:var(--paper);
  font-family:var(--disp);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;
  padding:11px 18px;border-radius:999px;transform-style:preserve-3d;
  transition:transform .5s var(--ease),background .3s,box-shadow .5s var(--ease);
}
.ar .talk:hover{background:var(--signal);color:var(--paper);transform:translateZ(34px) rotateX(-10deg);box-shadow:0 16px 30px -14px rgba(16,16,16,.6)}
@media(max-width:900px){.bar-status,.bar-nav{display:none}.bar{justify-content:space-between}.bar-brand{display:block!important}}
.bar-brand{display:none;font-family:var(--disp);font-size:13px;letter-spacing:.1em}

/* ─────────────────────────────────────────────
   HERO — a single 3D stage
   ───────────────────────────────────────────── */
.hero{position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:flex-end;padding-top:96px;z-index:1}
.hero-hint{
  position:absolute;left:0;right:0;top:clamp(84px,14vh,160px);text-align:center;z-index:3;
  font-family:var(--disp);font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:var(--graphite);
  opacity:.55;pointer-events:none;
}

.stage{position:relative;flex:1;display:flex;align-items:flex-end;justify-content:center;perspective:1500px;perspective-origin:50% 42%}
.stage-in{
  position:relative;width:100%;display:flex;align-items:flex-end;justify-content:center;
  transform-style:preserve-3d;transform:rotateX(2deg) rotateY(0deg);
  transition:transform 1s var(--ease);will-change:transform;
}

/* extruded name: real geometry, one layer per Z step */
.name3d{
  position:absolute;left:0;right:0;top:clamp(24px,7vh,90px);
  transform-style:preserve-3d;transform:translateZ(-190px) scale(1.16);
  pointer-events:none;
}
.name3d>span{
  display:block;text-align:center;white-space:nowrap;
  font-family:var(--disp);text-transform:uppercase;
  font-size:clamp(52px,13.5vw,196px);line-height:.86;letter-spacing:-.015em;
}
.name3d>span+span{position:absolute;left:0;right:0;top:0}
.name3d .surname{color:var(--ink)}

/* portrait relief: front photo + stacked silhouettes behind it */
.fig3d{
  position:relative;z-index:2;width:min(54vw,540px);transform-style:preserve-3d;
  transition:transform 1s var(--ease);will-change:transform;
}
.fig3d img{
  width:100%;height:auto;display:block;
  -webkit-mask-image:linear-gradient(180deg,#000 88%,transparent 100%);
  mask-image:linear-gradient(180deg,#000 88%,transparent 100%);
}
.fig3d .relief{position:absolute;inset:0;pointer-events:none}
.fig3d .relief img{filter:brightness(0)}
@media(max-width:760px){.fig3d{width:min(84vw,420px)}}

/* ground shadow on a rotated plane */
.ground{
  position:absolute;bottom:2px;left:50%;width:64%;height:70px;
  transform:translateX(-50%) rotateX(84deg);transform-origin:50% 100%;
  background:radial-gradient(ellipse at center,rgba(16,16,16,.34),transparent 68%);
  filter:blur(14px);pointer-events:none;
}

/* crop marks float in front of the figure */
.marks{position:absolute;inset:-4% -7% 5% -7%;pointer-events:none;transform:translateZ(70px)}
.mark{position:absolute;width:16px;height:16px;border:1px solid var(--rule)}
.mark.tl{top:0;left:0;border-right:0;border-bottom:0}
.mark.tr{top:0;right:0;border-left:0;border-bottom:0}
.mark.bl{bottom:0;left:0;border-right:0;border-top:0}
.mark.br{bottom:0;right:0;border-left:0;border-top:0}
.mark-lbl{position:absolute;bottom:-3px;left:50%;transform:translateX(-50%);font-family:var(--disp);font-size:8.5px;letter-spacing:.22em;color:var(--graphite);opacity:.7;white-space:nowrap}

.hero-foot{position:relative;z-index:5;display:flex;justify-content:space-between;align-items:flex-end;gap:30px;padding-bottom:38px;margin-top:-118px}
@media(max-width:900px){.hero-foot{margin-top:-30px;flex-direction:column;align-items:flex-start;padding-bottom:28px}}
.hero-role{font-family:var(--body);font-weight:700;font-size:clamp(24px,3.2vw,36px);letter-spacing:-.02em;line-height:1.05}
.hero-tag{margin-top:12px;max-width:30ch;font-size:14px;line-height:1.65;color:var(--graphite)}
.hero-links{display:flex;flex-direction:column;gap:2px;min-width:200px;perspective:800px}
.hero-links a{
  display:flex;align-items:center;gap:11px;padding:9px 0;font-size:13px;color:var(--graphite);
  border-bottom:1px solid var(--rule-2);transform-style:preserve-3d;
  transition:color .3s,transform .55s var(--ease);
}
.hero-links a:hover{color:var(--ink);transform:translateZ(30px) translateX(8px) rotateY(-9deg)}
.hero-links a .ar-arrow{margin-left:auto;opacity:0;transition:opacity .3s}
.hero-links a:hover .ar-arrow{opacity:1}

.cta{
  display:inline-flex;align-items:center;gap:9px;margin-top:22px;
  border:1px solid var(--ink);border-radius:999px;padding:13px 22px;
  font-family:var(--disp);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;
  position:relative;overflow:hidden;transform-style:preserve-3d;
  transition:color .4s,transform .55s var(--ease),box-shadow .55s var(--ease);
}
.cta span{position:relative;z-index:1;display:inline-flex;align-items:center;gap:9px}
.cta::before{content:"";position:absolute;inset:0;background:var(--ink);transform:translateY(101%);transition:transform .45s var(--ease)}
.cta:hover{color:var(--paper);transform:translateZ(26px) rotateX(-9deg);box-shadow:0 22px 34px -20px rgba(16,16,16,.75)}
.cta:hover::before{transform:translateY(0)}
.cta-persp{perspective:800px;display:inline-block}

/* ─────────────────────────────────────────────
   marquee as a tilted 3D band
   ───────────────────────────────────────────── */
.marq{
  position:relative;z-index:1;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);
  background:var(--paper-2);overflow:hidden;perspective:600px;padding:6px 0;
}
.marq-plane{transform:rotateX(26deg);transform-style:preserve-3d}
.marq-row{display:flex;width:max-content;padding:7px 0}
.marq-row.a{animation:slide 34s linear infinite}
.marq-row.b{animation:slide 46s linear infinite reverse;transform:translateZ(-46px);opacity:.4}
.marq-item{font-family:var(--disp);font-size:13px;letter-spacing:.16em;text-transform:uppercase;padding:0 26px;display:flex;align-items:center;gap:26px}
.marq-item::after{content:"";width:4px;height:4px;border-radius:50%;background:var(--signal);opacity:.7}
@keyframes slide{to{transform:translateX(-50%)}}
@keyframes slideB{to{transform:translateZ(-46px) translateX(-50%)}}
.marq-row.b{animation-name:slideB}
.marq:hover .marq-row{animation-play-state:paused}

/* ── profile ── */
.profile-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:70px;align-items:start}
@media(max-width:900px){.profile-grid{grid-template-columns:1fr;gap:40px}}
.statement{font-size:clamp(20px,2.5vw,30px);line-height:1.42;font-weight:400;letter-spacing:-.015em;max-width:22ch}
.statement em{font-style:normal;color:var(--signal)}
.bio{margin-top:26px;font-size:14.5px;line-height:1.75;color:var(--graphite);max-width:52ch}

/* stat tiles flip in 3D */
.stats{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.stat{perspective:900px;height:132px}
.stat-in{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .85s var(--ease)}
.stat:hover .stat-in,.stat:focus-within .stat-in{transform:rotateY(180deg)}
.stat-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:1px solid var(--rule);padding:20px 18px;display:flex;flex-direction:column;justify-content:space-between;background:var(--paper)}
.stat-face.back{transform:rotateY(180deg);background:var(--ink);color:var(--paper);border-color:var(--ink)}
.stat .n{font-family:var(--disp);font-size:40px;line-height:1;letter-spacing:-.02em}
.stat .l{font-family:var(--disp);font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--graphite)}
.stat-face.back .l{color:var(--paper);opacity:.55}
.stat-face.back p{font-size:13px;line-height:1.5}

/* ─────────────────────────────────────────────
   rows lift off the page in 3D
   ───────────────────────────────────────────── */
.row-persp{perspective:1400px}
.row{
  position:relative;display:grid;align-items:center;gap:22px;
  padding:26px 0;border-bottom:1px solid var(--rule);
  transform-style:preserve-3d;background:var(--paper);
  transition:transform .5s var(--ease),box-shadow .5s var(--ease),padding-left .5s var(--ease);
  will-change:transform;
}
.row.lift{padding-left:16px;box-shadow:0 34px 46px -34px rgba(16,16,16,.55)}
.row::before{content:"";position:absolute;left:0;top:0;bottom:0;width:0;background:var(--ink);transition:width .45s var(--ease)}
.row.lift::before{width:3px}
.row-num{font-family:var(--disp);font-size:11px;letter-spacing:.1em;color:var(--graphite);transition:color .3s,transform .5s var(--ease);transform-style:preserve-3d}
.row.lift .row-num{color:var(--signal);transform:translateZ(30px)}
.row-title{font-family:var(--disp);font-size:clamp(19px,2.6vw,30px);letter-spacing:-.005em;text-transform:uppercase;line-height:1.1;display:block;transition:transform .5s var(--ease);transform-style:preserve-3d}
.row.lift .row-title{transform:translateZ(46px)}
.row-sub{font-size:13.5px;color:var(--graphite);margin-top:7px;line-height:1.5;display:block;transition:transform .5s var(--ease)}
.row.lift .row-sub{transform:translateZ(22px)}
.row-meta{font-family:var(--disp);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--graphite);text-align:right;transition:transform .5s var(--ease)}
.row.lift .row-meta{transform:translateZ(18px)}

.exp-row{grid-template-columns:78px 1fr 250px}
@media(max-width:900px){.exp-row{grid-template-columns:1fr;gap:14px}.exp-row .row-meta{text-align:left}}
.work-row{grid-template-columns:44px 1fr auto 44px;cursor:pointer;text-align:left;width:100%}
@media(max-width:760px){.work-row{grid-template-columns:34px 1fr 30px}.work-row .row-meta{display:none}}

.plus{width:24px;height:24px;border:1px solid var(--rule);border-radius:50%;display:grid;place-items:center;color:var(--graphite);justify-self:end;transform-style:preserve-3d;transition:transform .55s var(--ease),background .3s,color .3s,border-color .3s}
.row.lift .plus{border-color:var(--ink);color:var(--ink);transform:translateZ(34px)}
.plus.open{transform:translateZ(34px) rotate(45deg);background:var(--ink);border-color:var(--ink);color:var(--paper)}

.panel{overflow:hidden;transition:height .6s var(--ease),opacity .45s ease}
.panel-in{padding:8px 0 34px 44px;display:grid;grid-template-columns:1.1fr 1fr;gap:44px;perspective:1000px}
@media(max-width:760px){.panel-in{grid-template-columns:1fr;gap:24px;padding-left:34px}}
.bullets{display:flex;flex-direction:column;gap:11px}
.bullet{display:flex;gap:12px;font-size:14px;line-height:1.6;color:var(--graphite)}
.bullet::before{content:"";flex:none;width:14px;height:1px;background:var(--ink);margin-top:11px;opacity:.4}
.chips{display:flex;flex-wrap:wrap;gap:7px;transform-style:preserve-3d}
.chip{
  font-family:var(--disp);font-size:9.5px;letter-spacing:.11em;text-transform:uppercase;color:var(--graphite);
  border:1px solid var(--rule);border-radius:3px;padding:6px 9px;transform-style:preserve-3d;
  transition:border-color .3s,color .3s,transform .45s var(--ease),box-shadow .45s var(--ease);
}
.chip:hover{border-color:var(--ink);color:var(--ink);transform:translateZ(24px) rotateX(-14deg);box-shadow:0 12px 18px -12px rgba(16,16,16,.6)}
.extlink{display:inline-flex;align-items:center;gap:6px;font-family:var(--disp);font-size:10px;letter-spacing:.13em;text-transform:uppercase;border-bottom:1px solid var(--ink);padding-bottom:3px;margin-right:20px;transition:color .3s,border-color .3s}
.extlink:hover{color:var(--signal);border-color:var(--signal)}

/* ── filters ── */
.filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;perspective:800px}
.filters button{
  font-family:var(--disp);font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;
  padding:10px 15px;border:1px solid var(--rule);border-radius:999px;color:var(--graphite);
  transform-style:preserve-3d;transition:background .35s,color .35s,border-color .35s,transform .5s var(--ease),box-shadow .5s var(--ease);
}
.filters button sup{font-size:8px;margin-left:3px;vertical-align:super;opacity:.7}
.filters button:hover{border-color:var(--ink);color:var(--ink);transform:translateZ(22px) rotateX(-10deg)}
.filters button.on{background:var(--ink);border-color:var(--ink);color:var(--paper);transform:translateZ(30px);box-shadow:0 18px 26px -18px rgba(16,16,16,.8)}

/* ─────────────────────────────────────────────
   stack as four folded panels
   ───────────────────────────────────────────── */
.stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;perspective:1800px}
@media(max-width:1000px){.stack-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.stack-grid{grid-template-columns:1fr}}
.stack-col{
  padding:26px 22px;border:1px solid var(--rule);margin:0 -.5px;background:var(--paper);
  transform-style:preserve-3d;transition:transform .8s var(--ease),box-shadow .8s var(--ease),background .5s;
}
.stack-col:nth-child(1){transform:rotateY(9deg)}
.stack-col:nth-child(2){transform:rotateY(3deg)}
.stack-col:nth-child(3){transform:rotateY(-3deg)}
.stack-col:nth-child(4){transform:rotateY(-9deg)}
.stack-col:hover{transform:rotateY(0deg) translateZ(56px);box-shadow:0 44px 60px -44px rgba(16,16,16,.7);z-index:2;background:var(--paper)}
@media(max-width:1000px){.stack-col:nth-child(n){transform:none}.stack-col:hover{transform:translateZ(40px)}}
.stack-cat{font-family:var(--disp);font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding-bottom:16px;margin-bottom:18px;border-bottom:1px solid var(--rule)}
.sk{margin-bottom:15px}
.sk-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.sk-nm{font-size:13px;color:var(--ink)}
.sk-pc{font-family:var(--disp);font-size:9.5px;letter-spacing:.1em;color:var(--graphite)}
.sk-bar{height:1px;background:var(--rule);margin-top:7px;position:relative}
.sk-bar i{position:absolute;left:0;top:-1px;height:3px;width:0;background:var(--ink);transition:width 1s var(--ease)}

/* ─────────────────────────────────────────────
   contact — extruded headline
   ───────────────────────────────────────────── */
.contact-stage{perspective:1400px}
.contact-3d{
  position:relative;transform-style:preserve-3d;
  transform:rotateX(6deg) rotateY(-7deg);transition:transform 1s var(--ease);
}
.contact-3d .layer{
  font-family:var(--disp);font-size:clamp(38px,8.6vw,128px);line-height:.92;letter-spacing:-.02em;text-transform:uppercase;
}
.contact-3d .layer+.layer{position:absolute;left:0;top:0;right:0}
.contact-3d .thin{color:var(--ghost)}

.contact-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:56px;perspective:1200px}
@media(max-width:900px){.contact-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.contact-grid{grid-template-columns:1fr}}
.cbox{
  padding:22px 20px;border:1px solid var(--rule);background:var(--paper);
  display:flex;flex-direction:column;gap:9px;text-align:left;transform-style:preserve-3d;
  transition:transform .55s var(--ease),box-shadow .55s var(--ease),background .35s;
}
.cbox:hover{transform:translateZ(40px) rotateX(-7deg);box-shadow:0 34px 44px -32px rgba(16,16,16,.65);background:var(--paper-2)}
.cbox .k{display:flex;align-items:center;gap:8px;font-family:var(--disp);font-size:9.5px;letter-spacing:.17em;text-transform:uppercase;color:var(--graphite)}
.cbox .v{font-size:14.5px;word-break:break-word;line-height:1.4}
.foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;padding:26px 0 40px;font-family:var(--disp);font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--graphite)}

/* ── reveal ── */
.rv{opacity:0;transform:translateY(26px);transition:opacity .9s var(--ease),transform .9s var(--ease)}
.rv.in{opacity:1;transform:none}

@media(prefers-reduced-motion:reduce){
  .ar *,.ar *::before,.ar *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
  .rv{opacity:1;transform:none}
  .sec-title{transform:none;opacity:1}
  .name3d>span+span{display:none}
  .fig3d .relief{display:none}
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

  /* one <span> per Z step — the extrusion is real geometry, not a shadow */
  const nameLayers = Array.from({ length: NAME_LAYERS }, (_, i) => {
    const t = i / (NAME_LAYERS - 1);
    return (
      <span
        key={i}
        style={{
          transform: `translateZ(${-i * 9}px)`,
          color: i === 0 ? "var(--ghost)" : `rgba(16,16,16,${(0.13 * (1 - t) + 0.02).toFixed(3)})`,
        }}
      >
        {PROFILE.first}&nbsp;<span className="surname" style={i === 0 ? undefined : { color: "inherit" }}>{PROFILE.last}</span>
      </span>
    );
  });

  const reliefLayers = Array.from({ length: FIG_LAYERS }, (_, i) => (
    <div className="relief" key={i} style={{ transform: `translateZ(${-(i + 1) * 6}px)`, opacity: 0.075 }}>
      <img src={PORTRAIT} alt="" aria-hidden="true" draggable="false" />
    </div>
  ));

  return (
    <section id="home" className="hero">
      <div className="hero-hint">Full-Stack · Mobile · AI Engineering</div>

      <div className="stage">
        <div className="stage-in" ref={stage}>
          <div className="name3d d">{nameLayers}</div>

          <div className="fig3d" ref={fig} style={{ transform: "translateZ(40px)" }}>
            {reliefLayers}
            <img src={PORTRAIT} alt="Ahmad Riaz" draggable="false" />
            <div className="ground" />
            <div className="marks">
              <span className="mark tl" /><span className="mark tr" />
              <span className="mark bl" /><span className="mark br" />
              <span className="mark-lbl">AR — LHR / PK — MMXXVI</span>
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
        <SectionHead idx="01 /" title="Profile" note="Computer science foundation, agentic AI workflow, production delivery." />
        <div className="profile-grid">
          <Rv>
            <p className="statement">
              I build the whole thing — <em>frontend, backend, database, deployment</em> — and I build it fast, because AI agents are part of my daily workflow, not a demo.
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
        <SectionHead idx="02 /" title="Experience" note="From owning UI components to owning the whole product surface." />
        {EXPERIENCE.map((j, i) => (
          <Rv key={j.company} delay={i * 90}>
            <Row3D className="exp-row">
              <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="row-title">{j.company}</h3>
                <span className="row-sub">{j.role} — {j.points[0]}</span>
                <div className="chips" style={{ marginTop: 14 }}>
                  {j.stack.map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
              </div>
              <div className="row-meta">
                {j.period}
                {j.current && <div style={{ marginTop: 8, color: "var(--signal)" }}>● Current</div>}
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
    FILTERS.slice(1).forEach((f) => (c[f] = PROJECTS.filter((p) => p.tags.includes(f)).length));
    return c;
  }, []);

  const list = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter))),
    [filter]
  );

  useEffect(() => setOpen(0), [filter]);

  return (
    <section id="work" className="sec">
      <div className="wrap">
        <SectionHead idx="03 /" title="Selected Work" note="Telephony, marketplaces, legal tech and logistics — each shipped end to end." />

        <Rv className="filters">
          {FILTERS.map((f) => (
            <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
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
                    {p.points.map((b) => <span className="bullet" key={b}>{b}</span>)}
                    {p.links.length > 0 && (
                      <div style={{ marginTop: 16 }}>
                        {p.links.map((l) => (
                          <a className="extlink" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                            {l.label} <ArrowUpRight size={11} />
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
                </div>
              </Panel>
            </Rv>
          );
        })}
      </div>
    </section>
  );
}

function Stack() {
  const [shown, setShown] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.unobserve(el)), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="stack" className="sec">
      <div className="wrap">
        <SectionHead idx="04 /" title="Tech Stack" note="Four folded panels — hover one to bring it forward." />
        <div className="stack-grid" ref={ref}>
          {SKILLS.map((g, gi) => (
            <div className="stack-col" key={g.category}>
              <div className="stack-cat">{g.category}</div>
              {g.items.map((s, i) => (
                <div className="sk" key={s.name}>
                  <div className="sk-top">
                    <span className="sk-nm">{s.name}</span>
                    <span className="sk-pc">{s.level}</span>
                  </div>
                  <div className="sk-bar">
                    <i style={{ width: shown ? `${s.level}%` : 0, transitionDelay: `${gi * 90 + i * 55}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
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
        <SectionHead idx="05 /" title="Contact" note="Open to full-stack, mobile and AI engineering work. Replies within a day." />

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
                    color: i === 0 ? undefined : `rgba(16,16,16,${(0.16 * (1 - t) + 0.02).toFixed(3)})`,
                  }}
                  aria-hidden={i > 0}
                >
                  Let's build<br />
                  <span className="thin" style={i === 0 ? undefined : { color: "inherit" }}>something</span> real
                </div>
              );
            })}
          </div>
        </Rv>

        <Rv delay={120} className="contact-grid">
          <button className="cbox" onClick={copy}>
            <span className="k">{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Email — tap to copy"}</span>
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
          <span>TEXAR / TT Lakes Neue</span>
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
    const ids = ["home", "profile", "experience", "work", "stack", "contact"];
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
      <Floor />
      <Bar active={active} go={go} />
      <Hero go={go} />
      <Marquee />
      <Profile />
      <Experience />
      <Work />
      <Stack />
      <Contact />
    </div>
  );
}
