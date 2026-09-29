// Every claim here was verified in the project's repository. Do not add numbers from memory.

export type Fact = { value: string; label: string };
export type Note = { title: string; body: string };
export type FlowNode = { title: string; note: string; check?: boolean };
export type Img = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  // Short line for the home card.
  summary: string;
  images: { card: Img; hero: Img; gallery: Img[] };
  url: string;
  urlLabel: string;
  role: string;
  timeline: string;
  stackSummary: string;
  // Card tags on the home page.
  stack: string[];
  // Versions come from each repo's lockfile.
  techStack: { layer: string; items: string[] }[];
  features: { audience: string; items: string[] }[];
  facts: Fact[];
  // null = owed by Antonio (client problem and business result); the UI hides the block.
  clientStory: string | null;
  scope: string;
  architecture: { title: string; flow: FlowNode[]; inputs: FlowNode[] };
  // null = do not present access control for this project yet.
  access: { title: string; body: string[]; items: { name: string; note: string }[] } | null;
  agents: { title: string; notes: Note[] };
  decisions: Note[];
  // Empty = do not present security for this project yet.
  security: Note[];
  // What happens before a change reaches production.
  release: string[];
  openItems: string[];
};

export const projects: Project[] = [
  {
    slug: "calzado-blade",
    name: "Calzado Blade",
    kind: "E-commerce",
    tagline: "White-label store for footwear brands. One codebase serves five brands.",
    summary: "White-label footwear store. Five brands, one codebase.",
    images: {
      card: { src: "/projects/calzado-blade/card.jpg", alt: "Calzado Blade storefront home page", width: 1440, height: 900 },
      hero: { src: "/projects/calzado-blade/hero.jpg", alt: "Calzado Blade Thunder collection banner", width: 1800, height: 1013 },
      gallery: [
        { src: "/projects/calzado-blade/styles.jpg", alt: "Calzado Blade styles banner", width: 1800, height: 1012 },
      ],
    },
    url: "https://calzadoblade.com",
    urlLabel: "calzadoblade.com",
    role: "Sole engineer, directing agents",
    timeline: "June to September 2026",
    stackSummary: "Next.js 16.3, Supabase, AI SDK, Vercel",
    stack: ["Next.js 16.3", "Supabase", "AI SDK", "MCP", "Conekta"],
    techStack: [
      { layer: "Frontend", items: ["Next.js 16.3", "React 19.2", "TypeScript 5.9", "Tailwind CSS 4.3", "shadcn and Base UI", "Motion", "Recharts", "Zustand 5", "Zod 4"] },
      { layer: "Rendering", items: ["Cache Components", "Partial Prefetching", "use cache with 14 cache tags", "updateTag after mutations", "Server Actions", "loading.tsx skeletons"] },
      { layer: "Data and access", items: ["Supabase Postgres", "Plain SQL, no ORM", "67 migrations", "Row-level security per permission", "Security definer RPCs with row locks", "pg_cron"] },
      { layer: "AI", items: ["AI SDK 7", "Vercel AI Gateway", "Anthropic and OpenAI models", "MCP server with mcp-handler", "WhatsApp sales agent on OpenRouter"] },
      { layer: "Payments and operations", items: ["Conekta", "MercadoPago", "Aplazo", "Facturama CFDI 4.0 invoices", "Skydropx shipping labels", "Resend email"] },
      { layer: "Marketing and messaging", items: ["Meta Pixel", "Meta Conversions API", "Meta Catalog feed", "Kapso WhatsApp", "Web Push", "Google Places"] },
      { layer: "Infrastructure", items: ["Vercel", "5 Vercel cron jobs", "One Supabase and Vercel project per brand", "Supabase Storage", "AVIF and WebP images"] },
    ],
    features: [
      { audience: "For shoppers", items: ["Catalog with size and colour variants", "Combo builder with pricing tiers", "Checkout by card, OXXO, SPEI, MercadoPago and Aplazo", "Order tracking", "Reviews by private link", "Favorites, account and Google sign-in", "CFDI invoices and warranties", "WhatsApp sales agent"] },
      { audience: "For the business", items: ["Product and photo editor", "Inventory by colourway", "Orders and fulfillment with shipping labels", "Discounts, promotions and combos", "Metrics dashboards and commissions", "Users, roles and 14 permissions", "Abandoned cart and payment reminders", "AI business chat over sales and inventory"] },
    ],
    facts: [
      { value: "294", label: "commits in about three months" },
      { value: "255", label: "of them co-authored with Claude" },
      { value: "67", label: "database migrations" },
      { value: "14", label: "permission keys for admin roles" },
      { value: "5", label: "brands on one codebase" },
    ],
    clientStory: null,
    scope:
      "The store covers the full path to a sale: catalog with size and colour variants, a combo builder with pricing tiers, checkout by card, OXXO, SPEI, MercadoPago and Aplazo, order tracking, reviews, invoices and warranties. Admins manage inventory, orders, shipping labels, promotions, roles and dashboards.",
    architecture: {
      title: "Every request passes two checks",
      flow: [
        { title: "Storefront and admin", note: "browser" },
        { title: "Next.js 16.3", note: "cached reads, server actions" },
        { title: "Server guards", note: "check 1: role and permission", check: true },
        { title: "Supabase Postgres", note: "check 2: row-level security", check: true },
      ],
      inputs: [
        { title: "Webhooks and crons", note: "signed payment and WhatsApp events, 5 schedules" },
        { title: "AI clients", note: "MCP server and admin chat, read-only tools" },
      ],
    },
    access: {
      title: "Hiding a button is not access control",
      body: [
        "Permissions are enforced twice. The server action checks the role before it runs. The database checks again on every row, so a bug in one layer cannot leak data through the other.",
        "Stock is reserved inside a database transaction that locks the inventory rows, so two buyers cannot take the last pair. Money and identity tables stay admin-only.",
      ],
      items: [
        { name: "cat_read_products", note: "public catalog read" },
        { name: "own_orders", note: "owner only" },
        { name: "own_payments", note: "owner only" },
        { name: "adm_write_inventory", note: "admin write" },
        { name: "reserve_stock", note: "locks inventory rows" },
        { name: "create_order", note: "locks the cart" },
        { name: "has_permiso(...)", note: "per-permission check" },
      ],
    },
    agents: {
      title: "Agents write, I decide",
      notes: [
        {
          title: "Memory that outlives a session",
          body: "30 notes carry rules and lessons between sessions. One is the post-mortem of a function rename that broke the deployed site.",
        },
        {
          title: "A person confirms AI edits",
          body: "The admin chat can read sales and inventory. It can propose a change to a combo, and the change runs only after a person confirms it.",
        },
        {
          title: "Business data for AI clients",
          body: "An MCP server exposes about 12 sales and inventory tools, so the owner can ask questions from any AI client.",
        },
      ],
    },
    decisions: [
      {
        title: "Webhook signatures compared in constant time",
        body: "Payment and messaging webhooks verify an HMAC signature, and requests are rate-limited in the database.",
      },
      {
        title: "Each sale counted once",
        body: "Server-side conversion events share an event ID with the browser pixel, so the ad platform does not double count.",
      },
      {
        title: "Image cost kept low",
        body: "Images cache for 30 days and ship as AVIF and WebP to limit storage egress.",
      },
    ],
    security: [
      {
        title: "Every webhook is signed",
        body: "One shared HMAC-SHA256 check, compared in constant time, guards every inbound webhook. The module is server-only.",
      },
      {
        title: "Limits enforced by the database",
        body: "Rate limits live in Postgres, and each session has a cap on pending orders, so abuse cannot hold stock hostage.",
      },
      {
        title: "Scheduled jobs need a secret",
        body: "Cron endpoints reject any request without the bearer secret, so nobody can trigger reminders or expirations from outside.",
      },
      {
        title: "AI cannot write on its own",
        body: "The admin chat and MCP tools only read. A proposed change runs after a person confirms it.",
      },
    ],
    release: [
      "A written runbook per brand: new Supabase project, migrations pushed with supabase db push, cron jobs confirmed in SQL",
      "Demo seed data is skipped on real launches; the client loads real products through the admin",
      "Production build before every deploy",
      "Smoke checks with curl against the live domain after deploy",
    ],
    openItems: [
      "This repository has no automated tests yet. Correctness rests on database constraints, row locks and review.",
    ],
  },
  {
    slug: "auto-toon",
    name: "Auto-Toon",
    kind: "AI SaaS",
    tagline: "AI ad-campaign production. Web app, iOS app, developer API and MCP server.",
    summary: "AI ad production. Web, iOS, API and MCP.",
    images: {
      card: { src: "/projects/auto-toon/card.jpg", alt: "Auto-Toon home page", width: 1440, height: 900 },
      hero: { src: "/projects/auto-toon/hero.jpg", alt: "Auto-Toon workflow canvas generating an editorial campaign", width: 1600, height: 934 },
      gallery: [
        { src: "/projects/auto-toon/ios-models.jpg", alt: "Auto-Toon iOS app, choosing a model", width: 647, height: 1400 },
        { src: "/projects/auto-toon/ios-editorial.jpg", alt: "Auto-Toon iOS app, editorial result", width: 647, height: 1400 },
        { src: "/projects/auto-toon/ios-plan.jpg", alt: "Auto-Toon iOS app, AI video plan for a product", width: 647, height: 1400 },
      ],
    },
    url: "https://auto-toon.com",
    urlLabel: "auto-toon.com",
    role: "Founder and engineer, directing agents",
    timeline: "November 2025 to present",
    stackSummary: "Next.js 16, Expo, Prisma, Clerk, Stripe",
    stack: ["Next.js 16", "Expo", "Prisma", "Stripe", "gpt-image-2", "Gemini"],
    techStack: [
      { layer: "Web", items: ["Next.js 16", "React 19.2", "TypeScript 5.9", "Tailwind CSS 4.2", "HeroUI 3", "Radix and shadcn", "React Flow", "Zustand 5", "Zod 4"] },
      { layer: "Mobile", items: ["Expo 55", "React Native 0.83", "Expo Router", "TanStack Query", "Reanimated 4", "In-app purchases", "EAS builds"] },
      { layer: "Data", items: ["PostgreSQL", "Prisma 7 with the pg adapter", "14 migrations", "Job queue on Postgres rows", "Upstash Redis rate limits", "Cloudflare R2 and Supabase Storage"] },
      { layer: "AI models", items: ["gpt-image-2", "Gemini 3 Pro Image", "Kling video 3.0", "Seedance 2.0", "Flux 2 Pro", "Ideogram 3", "GPT-5 mini and nano"] },
      { layer: "AI providers", items: ["OpenAI", "Google GenAI", "Higgsfield", "Fal", "Replicate"] },
      { layer: "Auth and billing", items: ["Clerk on web and mobile", "Stripe authorize and capture", "Apple App Store purchases", "API keys hashed with argon2"] },
      { layer: "Platform", items: ["Vercel", "Cron every minute for jobs", "Resend with React Email", "PostHog", "Expo push notifications", "MCP server with 6 tools"] },
    ],
    features: [
      { audience: "For brands", items: ["Product photography from one phone photo", "Relight, restore and upscale", "Multi-angle product sets", "Fitting room and fashion editorials", "AI models and UGC characters", "Video ads with Kling and Seedance", "Storyboards and campaigns", "Library and public gallery"] },
      { audience: "For developers and billing", items: ["Public API with per-plan limits", "CLI and MCP server", "Pay per use with a monthly spend cap", "Card authorized first, only delivered work captured", "iOS app with in-app purchases", "Background generation that resumes on reopen"] },
    ],
    facts: [
      { value: "711", label: "commits on the web app" },
      { value: "130", label: "API routes behind one job queue" },
      { value: "23", label: "active check scripts" },
      { value: "14", label: "recorded decisions in the rewrite plan" },
      { value: "2", label: "clients on one API: web and iOS" },
    ],
    clientStory: null,
    scope:
      "Users produce ad campaigns from a product photo: product photography, relight, multi-angle, upscale, fitting room, fashion editorial, AI personas, UGC characters, video and storyboards. Billing is pay per use. Developers reach the same features through an API, a CLI and an MCP server.",
    architecture: {
      title: "Every generation is a job",
      flow: [
        { title: "Web and iOS apps", note: "Next.js and Expo" },
        { title: "API routes", note: "Clerk session or API key" },
        { title: "Job queue", note: "rows in Postgres, claimed by status", check: true },
        { title: "AI providers", note: "image and video models" },
      ],
      inputs: [
        { title: "Cron, every minute", note: "dispatch, settle and recover jobs" },
        { title: "Payments", note: "authorize first, capture what arrived" },
      ],
    },
    access: {
      title: "Access enforced in application code",
      body: [
        "This product does not use row-level security. Sign-in middleware guards every route that is not on a public list. Admin routes check an allowlist of user IDs and return 403 otherwise.",
        "API keys are stored as argon2 hashes with limits per plan. Publishing to the public gallery is opt-in.",
      ],
      items: [
        { name: "middleware.ts", note: "public-route allowlist" },
        { name: "ADMIN_USER_IDS", note: "admin routes, 403 otherwise" },
        { name: "lib/api-key.ts", note: "argon2 hashes, plan limits" },
        { name: "isPublic", note: "defaults to false" },
      ],
    },
    agents: {
      title: "Rules the agents must follow",
      notes: [
        {
          title: "A written plan with decisions",
          body: "The rewrite plan records decisions D1 to D14 and the phases. It freezes the list of API routes the mobile app depends on.",
        },
        {
          title: "AGENTS.md as the contract",
          body: "It covers generated UI, pricing, the job-queue rule, error codes and a warning that the local environment points to production.",
        },
        {
          title: "Checks written after incidents",
          body: "A secret-leak check exists because a provider token was once logged. An aspect-ratio check exists because the same 422 error shipped twice.",
        },
      ],
    },
    decisions: [
      {
        title: "No generation inside a request",
        body: "Serverless functions share no memory, so the database row is the only lock. There is a concurrency limit per account.",
      },
      {
        title: "Charge only for what arrived",
        body: "The card is authorized when a job is requested. Only delivered results are captured.",
      },
      {
        title: "Web and mobile cannot drift",
        body: "A parity check fails if files copied into the mobile app differ from the web source.",
      },
      {
        title: "Quality gates by majority vote",
        body: "Four gates decide if an image is publishable. Each gate is a majority vote over three vision calls.",
      },
    ],
    security: [
      {
        title: "No server-side request forgery",
        body: "Before the server fetches any outside URL, a guard resolves it and checks the IP address, not the hostname.",
      },
      {
        title: "Secrets never reach the logs",
        body: "A provider token was once logged. Now a check fails if a secret can reach a log line.",
      },
      {
        title: "Webhooks are verified or distrusted",
        body: "Stripe and Clerk signatures are verified. An unsigned provider callback is only a hint; the job status is read from the provider.",
      },
      {
        title: "API access with limits",
        body: "Developer keys are stored as argon2 hashes with limits per plan, and requests are rate-limited with Upstash Redis.",
      },
    ],
    release: [
      "Migrations are written by hand and applied by the build with prisma migrate deploy",
      "Development runs against a local Postgres; the production database is off-limits to scripts",
      "Checks that touch the database refuse to run unless the database is local, and clean up their own rows",
      "Payments are tested end to end in Stripe test mode before live keys",
      "Type check plus the check scripts listed in AGENTS.md",
      "A frozen list of API routes the iOS app depends on, and a parity check between web and mobile code",
    ],
    openItems: [
      "Checks are plain scripts run with node:assert. There is no test framework or CI gate yet.",
    ],
  },
  {
    slug: "grupo-barro-y-cantera",
    name: "Grupo Barro y Cantera",
    kind: "Catalog and quoting",
    tagline:
      "Catalog and quote builder for a stone and clay supplier. Quotes keep working offline.",
    summary: "Catalog and quotes that keep working offline.",
    images: {
      card: { src: "/projects/grupo-barro-y-cantera/card.jpg", alt: "Grupo Barro y Cantera home page", width: 1440, height: 900 },
      hero: { src: "/projects/grupo-barro-y-cantera/hero.jpg", alt: "Stone wall clad in Galarza stone from the catalog", width: 1800, height: 1800 },
      gallery: [
        { src: "/projects/grupo-barro-y-cantera/catalog.jpg", alt: "Grupo Barro y Cantera catalog page", width: 1440, height: 900 },
        { src: "/projects/grupo-barro-y-cantera/porfido.jpg", alt: "Porfido stone applied in a room", width: 1800, height: 1800 },
      ],
    },
    url: "https://www.grupobarroycantera.com.mx",
    urlLabel: "grupobarroycantera.com.mx",
    role: "Sole engineer, directing agents",
    timeline: "November 2025 to August 2026",
    stackSummary: "Next.js 16, InsForge, Clerk, Vercel Blob",
    stack: ["Next.js 16", "InsForge", "Clerk", "Vercel Blob"],
    techStack: [
      { layer: "Frontend", items: ["Next.js 16", "React 19.2", "React Compiler", "TypeScript 5.9", "Tailwind CSS 4.1", "shadcn and Radix", "Motion", "React Hook Form with Zod"] },
      { layer: "Rendering", items: ["App Router", "Catalog regenerated every 60 seconds", "revalidatePath after admin writes", "Route handlers for the API"] },
      { layer: "Data", items: ["InsForge Postgres", "SDK queries, no ORM", "9 migrations", "Generated columns for folios and search", "Offline outbox with idempotent saves"] },
      { layer: "Auth and storage", items: ["Clerk", "Fail-closed admin email allowlist", "Vercel Blob with content-hashed URLs", "Migration run with Vercel OIDC"] },
      { layer: "Documents", items: ["jsPDF quotes and catalogs", "QR codes per product", "HEIC to JPEG conversion", "Flip-book catalogs"] },
      { layer: "Marketing", items: ["GA4", "Google Ads", "Meta Pixel and Conversions API", "Resend lead emails", "Vercel Analytics", "Google Maps"] },
    ],
    features: [
      { audience: "For customers", items: ["Catalogs by family, as a flip book", "PDF download per family", "Prices per size and spec sheets", "Shareable link to a single material", "Contact form and WhatsApp quotes"] },
      { audience: "For the sales team", items: ["Quote builder with folio, tax and deposit", "Quotes that keep working offline", "Customer search that ignores accents", "Catalog editor with photo uploads", "QR downloads and categories", "Metrics dashboard"] },
    ],
    facts: [
      { value: "95", label: "commits, shipped as small pull requests" },
      { value: "8", label: "tests on offline quotes and admin access" },
      { value: "9", label: "database migrations" },
    ],
    clientStory: null,
    scope:
      "The public site is a catalog with flip-book views, PDF export per family, prices per size and spec sheets. Staff build quotes as PDFs with folio, tax and deposit, manage the catalog with photo uploads, and read a metrics dashboard.",
    architecture: {
      title: "Quotes that survive an outage",
      flow: [
        { title: "Quote builder", note: "drafts mirrored on the device" },
        { title: "Outbox", note: "idempotent save with a client ID", check: true },
        { title: "API routes", note: "Next.js 16" },
        { title: "Postgres", note: "folio from a generated column", check: true },
      ],
      inputs: [
        { title: "Catalog pages", note: "regenerated every 60 seconds" },
        { title: "Images", note: "Vercel Blob, cached for a year" },
      ],
    },
    // Hidden until the /api allowlist fix ships in that repo.
    access: null,
    agents: {
      title: "Small changes, explained",
      notes: [
        {
          title: "One pull request per change",
          body: "Work landed as small pull requests, numbered #3 to #89.",
        },
        {
          title: "Comments explain why",
          body: "Code comments record the reason for each decision, so the next agent session starts with context.",
        },
        {
          title: "Rules for the backend",
          body: "AGENTS.md points agents to the backend skills and bans hardcoded keys.",
        },
      ],
    },
    decisions: [
      {
        title: "Quote numbers without races",
        body: "The folio comes from a generated column in the database, not from a counter in the app.",
      },
      {
        title: "Images moved after a quota incident",
        body: "Storage egress used up the backend quota and paused the project. Images moved to Vercel Blob with content-hashed URLs.",
      },
      {
        title: "Spec data is never inferred",
        body: "Spec columns stay empty unless the manufacturer publishes the value.",
      },
      {
        title: "Search ignores accents",
        body: "Customer search uses a generated column that folds Spanish accents.",
      },
    ],
    // Hidden until the /api allowlist fix ships in that repo.
    security: [],
    release: [
      "8 tests with the Node test runner cover the admin allowlist and the offline quote outbox",
      "Each change ships as its own small pull request",
      "Leads are never lost: without the email key, they fall back to the function logs",
      "The image migration to Vercel Blob ran with short-lived Vercel OIDC credentials, not a stored token",
    ],
    openItems: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
