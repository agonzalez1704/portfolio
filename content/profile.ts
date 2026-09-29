export type RoleCheck = {
  requirement: string;
  // null = evidence still owed by Antonio; the UI hides the row.
  evidence: string | null;
};

export const profile = {
  name: "Juan Antonio González Torres",
  shortName: "Antonio González",
  handle: "antonio.gonzalez",
  title: "Principal Engineer",
  location: "León, Guanajuato, MX",
  headline: "I direct AI coding agents. I own what ships.",
  summary:
    "Full-stack for 12+ years. I write the spec, set the checks, review every change and design the data layer. Three products live in production.",
  contact: {
    email: "agonzalez.nrn02@gmail.com",
    linkedin: "https://www.linkedin.com/in/juan-antonio-gonzalez-torres",
    linkedinLabel: "juan-antonio-gonzalez-torres",
    whatsapp: "https://wa.me/524777442427",
    phoneLabel: "+52 477 744 24 27",
  },
  cvPath: "/cv.pdf",
  skills: {
    Frontend: "React, Next.js, TypeScript, micro-frontends, Tailwind CSS, Radix UI, WebSockets",
    Backend: "Node.js, NestJS, PostgreSQL, Prisma, Supabase, REST and GraphQL APIs, BullMQ",
    "AI and automation":
      "OpenAI, Anthropic and Google Gemini integration, MCP servers, AI SDK, n8n, Trigger.dev, multi-agent orchestration",
    "Cloud and DevOps": "Vercel, AWS S3, Docker, GitHub Actions, Sentry, Stripe",
  },
} as const;

export const roleChecks: RoleCheck[] = [
  {
    requirement: "Directs AI coding agents",
    evidence: "255 of 294 commits on Calzado Blade co-authored with Claude",
  },
  {
    requirement: "Writes the specs",
    evidence: "Auto-Toon rewrite plan records 14 decisions before any code",
  },
  {
    requirement: "Writes the tests",
    evidence: "23 active check scripts on Auto-Toon, written after real incidents",
  },
  {
    requirement: "Reviews every change",
    evidence: "Small numbered pull requests, #3 to #89, on Grupo Barro y Cantera",
  },
  {
    requirement: "Designs the database and access rules",
    evidence: "67 migrations and row-level security per permission on Calzado Blade",
  },
  { requirement: "Talks to the client", evidence: null },
];

// What runs in production today, and where. Only tools verified in the three repos.
export const toolbox = [
  {
    layer: "Frontend",
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "shadcn and Radix", "Expo and React Native"],
    usedIn: "All three products",
  },
  {
    layer: "Data",
    items: ["PostgreSQL", "Supabase", "Prisma 7", "InsForge", "Row-level security", "Postgres job queues"],
    usedIn: "Supabase on Calzado Blade, Prisma on Auto-Toon, InsForge on Barro y Cantera",
  },
  {
    layer: "AI",
    items: ["AI SDK 7", "Vercel AI Gateway", "MCP servers", "OpenAI", "Gemini", "Kling and Seedance"],
    usedIn: "Admin chat and MCP on Calzado Blade, image and video pipeline on Auto-Toon",
  },
  {
    layer: "Payments",
    items: ["Stripe", "Conekta", "MercadoPago", "Aplazo", "Apple in-app purchases", "CFDI invoicing"],
    usedIn: "Checkout on Calzado Blade, pay per use on Auto-Toon",
  },
  {
    layer: "Platform",
    items: ["Vercel", "Vercel Cron", "Vercel Blob", "Clerk", "Resend", "Upstash Redis"],
    usedIn: "All three products deploy on Vercel",
  },
];

export const method = [
  {
    step: "Spec",
    body: "Decisions are written before code. An AGENTS.md file sets the rules every agent follows.",
  },
  {
    step: "Check",
    body: "Every incident becomes a check. A token once reached the logs, so a check now blocks that.",
  },
  {
    step: "Review",
    body: "Agents propose, I approve. Work lands in small pull requests, and AI edits in the admin wait for a person.",
  },
  {
    step: "Remember",
    body: "Lessons become agent memory, including the post-mortem of a rename that broke production.",
  },
];

export const experience = [
  {
    years: "2024 to 2026",
    role: "Principal Engineer",
    company: "Bluumly",
    body: "Rebuilt a social media platform in 30 days. Shipped three MCP servers for multi-agent workflows.",
  },
  {
    years: "2021 to 2024",
    role: "Senior Software Engineer",
    company: "Zignal Labs",
    body: "Real-time media intelligence. Cut P99 latency by about 35%. Shipped geo-mapping across three teams.",
  },
  {
    years: "2019 to 2021",
    role: "Senior Software Engineer",
    company: "Svitla Systems",
    body: "Automated hiring and onboarding workflows. Rated in the top 5% across review cycles.",
  },
  {
    years: "2015 to 2019",
    role: "Lead Software Engineer",
    company: "Brain Display",
    body: "Led five engineers on a ticket e-commerce platform built with micro-frontends.",
  },
  {
    years: "2013 to 2015",
    role: "Junior Software Engineer",
    company: "Grupo Camrey",
    body: "Full-stack features across several web platforms.",
  },
];

export const sideProjects = [
  {
    name: "Shopify MCP Server",
    body: "Exposes Shopify APIs to AI agents.",
    stack: "Python · Modal · MCP SDK",
  },
  {
    name: "Komanda",
    body: "Order app for restaurant waiters. Works offline.",
    stack: "Expo · TanStack Query · InsForge",
  },
  {
    name: "Images AI SaaS",
    body: "Image transformations with paid plans.",
    stack: "Next.js · Cloudinary · Stripe",
  },
  {
    name: "CRM POS",
    body: "Point of sale with roles and transaction tracking.",
    stack: "Next.js · Prisma · NextAuth",
  },
];
