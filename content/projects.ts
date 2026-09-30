// Every claim here was verified in the project's repository. Do not add numbers from memory.

export type Fact = { value: string; label: string };
// next = only in an unreleased branch; the UI marks it "In the rewrite".
export type Note = { title: string; body: string; tech?: string[]; next?: boolean };
export type FlowNode = { title: string; note: string; check?: boolean };
export type Img = { src: string; alt: string; width: number; height: number };
export type Shot = Img & { caption: string };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  // Short line for the home card.
  summary: string;
  // hero = social preview; sections = the mosaic at the top of the case study.
  images: { card: Img; hero: Img; sections: Shot[] };
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
  // Dark highlight panel for the project's defining idea.
  spotlight?: { eyebrow: string; title: string; intro: string; notes: Note[] };
  // Before and after: raw input to finished output.
  pipeline?: { title: string; intro: string; examples: { material: string; steps: Shot[] }[] };
  integrations: { name: string; what: string; next?: boolean }[];
  // Set when part of the story lives in a branch that is not deployed yet.
  rewrite?: { branch: string; ahead: number; note: string };
  agents: { title: string; notes: Note[] };
  decisions: Note[];
  // Empty = do not present security for this project yet.
  security: Note[];
  // What happens before a change reaches production.
  release: { text: string; next?: boolean }[];
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
      sections: [
        { src: "/projects/calzado-blade/hero.jpg", alt: "Calzado Blade Thunder collection banner", caption: "Home: collection banner", width: 1800, height: 1013 },
        { src: "/projects/calzado-blade/pdp.jpg", alt: "Product page with colours, sizes and combo offer", caption: "Product page: colour, size and combo upsell", width: 1440, height: 900 },
        { src: "/projects/calzado-blade/combo.jpg", alt: "Combo builder choosing the first pair", caption: "Combo builder: pick two pairs, tiered price", width: 1440, height: 900 },
        { src: "/projects/calzado-blade/store.jpg", alt: "Store page with the combo banner", caption: "Store: filters and the combo entry point", width: 1440, height: 900 },
        { src: "/projects/calzado-blade/bestsellers.jpg", alt: "Best sellers row on the home page", caption: "Home: best sellers and trust badges", width: 1440, height: 900 },
        { src: "/projects/calzado-blade/styles.jpg", alt: "Calzado Blade styles banner", caption: "Campaign banner", width: 1800, height: 1012 },
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
    spotlight: {
      eyebrow: "Build, not buy",
      title: "Why a custom store instead of Shopify",
      intro:
        "The client sells in Mexico, to Mexican buyers, with rules a template does not hold. Building on Next.js and Supabase put payments, invoicing, shipping and pricing logic in code the business owns.",
      notes: [
        { title: "Mexican payments, natively", body: "Card with 3-D Secure, OXXO cash vouchers, SPEI transfers and Aplazo installments go through one Conekta wrapper, with the buyer-facing error shown in Spanish.", tech: ["Conekta", "Aplazo"] },
        { title: "Invoices the SAT accepts", body: "CFDI 4.0 invoices are stamped through Facturama straight from the order and the buyer's fiscal data.", tech: ["Facturama CFDI 4.0 invoices"] },
        { title: "Labels from the admin", body: "Staff quote carriers, print the Skydropx label and file the carta porte in one step. A cron pulls tracking status back into each order.", tech: ["Skydropx shipping labels", "Vercel Cron"] },
        { title: "Rules that are the business", body: "Shoes are made to order, combos have pricing tiers and staff get 14 separate permissions. All of it lives in the database, not in plugin settings.", tech: ["PostgreSQL", "Row-level security"] },
        { title: "Five brands, one codebase", body: "Each brand is a preset: name, colours, logo, warehouse and sender. Each gets its own database and deployment, so catalogs and orders never mix.", tech: ["Vercel", "Supabase"] },
        { title: "Data it can talk to", body: "An MCP server and an admin AI chat read sales and inventory straight from Postgres. Writes wait for a person.", tech: ["MCP server", "AI SDK 7"] },
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
      { title: "SQL-native data layer, no ORM", body: "Prisma was rejected because it connects with a pooled service-role connection and would bypass row-level security. Migrations, RPCs and policies are plain SQL, so RLS stays the security backbone.", tech: ["Supabase", "Plain SQL, no ORM"] },
      { title: "Stock math lives in the database", body: "Reserve, commit and release are RPCs that lock rows with FOR UPDATE. When the client went made-to-order, only those three primitives changed; the order code did not.", tech: ["PostgreSQL", "Security definer RPCs with row locks"] },
      { title: "A payment webhook proves nothing", body: "The Conekta webhook needs a shared secret, then the order is fetched again from Conekta before stock is committed. Card events that fire twice are idempotent.", tech: ["Conekta"] },
      { title: "Shipping as background work", body: "Skydropx quotes are asynchronous, so the app polls, caches the OAuth token and offers carrier pickup points. The carta porte product code comes from the brand, after one brand declared an e-bike as shoes.", tech: ["Skydropx shipping labels", "Vercel Cron"] },
      { title: "Static pages that stay correct", body: "Catalog reads are cached with tags, and every admin write expires the exact tags it touched. Pages load from cache, and a price change shows up as soon as staff save it.", tech: ["Cache Components", "updateTag after mutations"] },
      { title: "Sign-in that fits each user", body: "Customers sign in with Google through Supabase Auth; staff use email and password and pass an is_admin() check in the database.", tech: ["Supabase", "Google sign-in"] },
      { title: "Each sale counted once", body: "Server-side conversion events share an event ID with the browser pixel, so ad reporting does not double count.", tech: ["Meta Conversions API"] },
      { title: "Image cost kept low", body: "Images cache for 30 days and ship as AVIF and WebP to limit storage egress.", tech: ["AVIF and WebP images"] },
    ],
    integrations: [
      { name: "Conekta", what: "Card with 3-D Secure, OXXO vouchers with barcode and expiry, SPEI transfers." },
      { name: "Aplazo", what: "Buy now, pay later: the buyer approves installments and returns to the order." },
      { name: "Skydropx", what: "Rate quotes, pickup points, labels, cancellations and tracking status." },
      { name: "Facturama CFDI 4.0", what: "Tax invoices stamped from order and fiscal data." },
      { name: "Supabase Auth with Google", what: "Customer sign-in; staff accounts gated in the database." },
      { name: "Resend", what: "Order, payment reminder and review request emails." },
      { name: "Meta Pixel and Conversions API", what: "Browser and server events that share one event ID." },
      { name: "Kapso WhatsApp", what: "A sales agent that answers customers on WhatsApp." },
      { name: "Web Push", what: "Notifies staff the moment an order is paid." },
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
      { text: "A written runbook per brand: new Supabase project, migrations pushed with supabase db push, cron jobs confirmed in SQL" },
      { text: "Demo seed data is skipped on real launches; the client loads real products through the admin" },
      { text: "Production build before every deploy" },
      { text: "Smoke checks with curl against the live domain after deploy" },
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
      sections: [
        { src: "/projects/auto-toon/hero.jpg", alt: "Auto-Toon workflow canvas generating an editorial campaign", caption: "Studio canvas: model, clothing, generation and multi-angle nodes", width: 1600, height: 934 },
        { src: "/projects/auto-toon/pricing.jpg", alt: "Auto-Toon pricing page", caption: "Pay-per-use pricing", width: 1440, height: 900 },
        { src: "/projects/auto-toon/docs.jpg", alt: "Auto-Toon API documentation", caption: "Developer API docs", width: 1440, height: 900 },
        { src: "/projects/auto-toon/ios-models.jpg", alt: "Auto-Toon iOS app, choosing a model", caption: "iOS: pick or generate a model", width: 647, height: 1400 },
        { src: "/projects/auto-toon/ios-editorial.jpg", alt: "Auto-Toon iOS app, editorial result", caption: "iOS: editorial result", width: 647, height: 1400 },
        { src: "/projects/auto-toon/ios-plan.jpg", alt: "Auto-Toon iOS app, AI video plan", caption: "iOS: AI video plan", width: 647, height: 1400 },
      ],
    },
    url: "https://auto-toon.com",
    urlLabel: "auto-toon.com",
    role: "Founder and engineer, directing agents",
    timeline: "November 2025 to present",
    stackSummary: "Next.js 16, Expo, Prisma, Clerk, Stripe",
    stack: ["Next.js 16", "Expo", "Prisma", "Stripe", "gpt-image-2", "Kling video 3.0"],
    techStack: [
      { layer: "Web", items: ["Next.js 16", "React 19.2", "TypeScript 5.9", "Tailwind CSS 4", "HeroUI 3", "Radix and shadcn", "React Flow", "Zustand 5", "Zod 4"] },
      { layer: "Mobile", items: ["Expo 55", "React Native 0.83", "Expo Router", "TanStack Query", "Reanimated 4", "In-app purchases", "EAS builds"] },
      { layer: "Data", items: ["PostgreSQL", "Prisma 7 with the pg adapter", "Upstash Redis rate limits", "Cloudflare R2 and Supabase Storage"] },
      { layer: "AI models", items: ["gpt-image-2", "Gemini 3 Pro Image", "Kling video 3.0", "Seedance 2 Pro", "Seedream 4.5", "Ideogram 3", "GPT-4o mini vision"] },
      { layer: "AI providers", items: ["OpenAI", "Google GenAI", "Kling API", "Replicate", "Fal"] },
      { layer: "Auth and billing", items: ["Clerk on web and mobile", "Stripe pay-per-use billing", "Apple App Store purchases", "API keys hashed with argon2"] },
      { layer: "Platform", items: ["Vercel", "Vercel Cron for emails and cleanup", "Resend with React Email", "PostHog", "Expo push notifications", "MCP server"] },
      { layer: "In the rewrite, not deployed yet", items: ["Higgsfield", "Job queue on Postgres rows", "Stripe authorize and capture", "SSRF guard", "Secret-leak check", "23 check scripts"] },
    ],
    features: [
      { audience: "For brands", items: ["Product photography from one phone photo", "Relight, restore and upscale", "Multi-angle product sets", "Wardrobe and fashion editorials", "AI model factory and UGC characters", "Video ads with Kling and Seedance", "Storyboards", "Asset library"] },
      { audience: "For developers and billing", items: ["Public API with per-plan limits", "CLI and MCP server", "Pay-per-use billing", "iOS app with in-app purchases", "Background generation that resumes on reopen"] },
    ],
    facts: [
      { value: "615", label: "commits on the live web app" },
      { value: "109", label: "API routes in production" },
      { value: "108", label: "commits in a rewrite, not deployed yet" },
      { value: "2", label: "clients on one API: web and iOS" },
    ],
    rewrite: {
      branch: "feat/rewrite-espina",
      ahead: 108,
      note: "auto-toon.com runs the main branch. A rewrite that moves every generation onto one job queue with Higgsfield is 108 commits ahead and not deployed yet. Items marked In the rewrite come from that branch.",
    },
    clientStory: null,
    scope:
      "Users produce ad campaigns from a product photo: product photography, relight, multi-angle, upscale, fitting room, fashion editorial, AI personas, UGC characters, video and storyboards. Billing is pay per use. Developers reach the same features through an API, a CLI and an MCP server.",
    architecture: {
      title: "How a generation runs today",
      flow: [
        { title: "Web and iOS apps", note: "Next.js and Expo" },
        { title: "API routes", note: "Clerk session or API key", check: true },
        { title: "AI providers", note: "OpenAI, Gemini, Kling, Replicate" },
        { title: "Storage", note: "Cloudflare R2 and Supabase", check: true },
      ],
      inputs: [
        { title: "Stripe", note: "pay-per-use, metered usage" },
        { title: "Gemini fallback", note: "retries, circuit breaker, Replicate" },
      ],
    },
    access: {
      title: "Access enforced in application code",
      body: [
        "This product does not use row-level security. Sign-in middleware guards every route that is not on a public list. Admin routes check an allowlist of user IDs and return 403 otherwise.",
        "Developer API keys are stored as argon2 hashes, with limits per plan.",
      ],
      items: [
        { name: "middleware.ts", note: "public-route allowlist" },
        { name: "ADMIN_USER_IDS", note: "admin routes, 403 otherwise" },
        { name: "lib/api-key.ts", note: "argon2 hashes, plan limits" },
      ],
    },
    spotlight: {
      eyebrow: "Generative AI",
      title: "The right model for each job",
      intro:
        "In production, each feature calls the model that fits it and reads the product before writing a prompt. A rewrite, not deployed yet, moves every generation onto one job queue with Higgsfield.",
      notes: [
        { title: "Reads the image before it writes", body: "A vision model returns a structured brief of the upload: product family, materials, brand colours as hex, the logo, and any label text transcribed word for word. Prompts keep labels legible and colours on brand.", tech: ["GPT-4o mini vision"] },
        { title: "Same person, every photo", body: "GPT Image 2 runs through the OpenAI API with the model's references, so character sheets, try-ons and campaign frames keep one face.", tech: ["gpt-image-2"] },
        { title: "Edits that survive outages", body: "Upscale, relight and retouch call Gemini 3 Pro Image with retries and a circuit breaker, and fall back to Nano Banana Pro on Replicate when Google is at capacity.", tech: ["Gemini 3 Pro Image", "Replicate"] },
        { title: "Video from a brief", body: "A small model writes the cut list for a video against a strict schema. The clips render with Kling 3.0 through the Kling API or with Seedance 2 Pro.", tech: ["GPT-5 mini and nano", "Kling video 3.0", "Seedance 2 Pro"] },
        { title: "Higgsfield for shots and video", body: "The rewrite sends product key visuals to Marketing Studio, new personas to Soul 2.0, and image-to-video to Kling 3.0 and Seedance 2.0 and 2.5 through Higgsfield's API.", tech: ["Higgsfield"], next: true },
        { title: "Suggests the next shot", body: "After each image, the rewrite offers the next step in the order a real shoot runs: scene, model, light, 4K, motion. A model only writes the idea; steps already done are not offered.", tech: ["GPT-5 mini and nano"], next: true },
      ],
    },
    agents: {
      title: "Rules the agents must follow",
      notes: [
        { title: "A written plan with decisions", body: "The rewrite plan records decisions D1 to D14 and the phases, and freezes the list of API routes the mobile app depends on.", next: true },
        { title: "AGENTS.md as the contract", body: "It covers generated UI, pricing, the job-queue rule, error codes and a warning that the local environment points to production.", next: true },
        { title: "Checks written after incidents", body: "A secret-leak check exists because a provider token was once logged. An aspect-ratio check exists because the same 422 error shipped twice.", next: true },
      ],
    },
    decisions: [
      { title: "A fallback for every image edit", body: "Gemini capacity errors are common, so edits retry, trip a circuit breaker when Google is saturated, and continue on Nano Banana Pro through Replicate.", tech: ["Gemini 3 Pro Image", "Replicate"] },
      { title: "Pay per use, metered", body: "Usage is reported to a metered Stripe price instead of selling credit packs, so a brand pays for what it generates.", tech: ["Stripe pay-per-use billing"] },
      { title: "No generation inside a request", body: "Serverless functions share no memory, so a Postgres row is the only lock. Jobs are claimed by status and a cron dispatches, settles and recovers them every minute.", tech: ["Job queue on Postgres rows"], next: true },
      { title: "Respect the provider's limits", body: "Higgsfield allows four concurrent requests per account and rejects the fifth. The queue hands out four slots and retries when one frees up.", tech: ["Higgsfield"], next: true },
      { title: "Unsigned webhooks are only a hint", body: "Each job's callback URL carries its own token, and the real status is read from the provider. The work runs after the reply, because copying a video out takes longer than the 10 seconds the provider waits.", tech: ["Higgsfield"], next: true },
      { title: "Charge only for what arrived", body: "The card is authorized when a job is requested and only delivered results are captured. Jobs the provider fails or blocks are not charged.", tech: ["Stripe authorize and capture"], next: true },
      { title: "Web and mobile cannot drift", body: "The iOS app depends on a frozen list of API routes, and a parity check fails if shared code differs between web and mobile.", tech: ["Expo 55", "Next.js 16"], next: true },
      { title: "Quality gates by majority vote", body: "Four gates decide if an image is publishable. Each gate is a majority vote over three vision calls.", tech: ["GPT-4o mini vision"], next: true },
    ],
    integrations: [
      { name: "OpenAI", what: "GPT Image 2 for consistent people; vision and small models for briefs." },
      { name: "Google Gemini", what: "Nano Banana Pro for upscale, relight and retouch." },
      { name: "Kling API", what: "Kling 3.0 image-to-video." },
      { name: "Replicate", what: "Fallback for Gemini edits, plus Seedream and Qwen image models." },
      { name: "Stripe", what: "Pay-per-use billing with metered usage." },
      { name: "Apple App Store", what: "In-app purchases on iOS." },
      { name: "Clerk", what: "One sign-in for web and mobile." },
      { name: "Cloudflare R2", what: "Storage for generated files." },
      { name: "Upstash Redis", what: "Rate limits." },
      { name: "Resend", what: "Lifecycle emails with React Email." },
      { name: "PostHog", what: "Product analytics." },
      { name: "Higgsfield", what: "Product shots, personas, and image-to-video through one API.", next: true },
    ],
    security: [
      { title: "Webhooks are verified", body: "Stripe and Clerk webhook signatures are checked before any event is acted on." },
      { title: "API access with limits", body: "Developer keys are stored as argon2 hashes with limits per plan, and requests are rate-limited with Upstash Redis." },
      { title: "No server-side request forgery", body: "Before the server fetches any outside URL, a guard resolves it and checks the IP address, not the hostname.", next: true },
      { title: "Secrets never reach the logs", body: "A provider token was once logged. Now a check fails if a secret can reach a log line.", next: true },
    ],
    release: [
      { text: "Migrations are applied by the build with prisma migrate deploy" },
      { text: "Development runs against a local Postgres; the production database is off-limits to scripts", next: true },
      { text: "Checks that touch the database refuse to run unless the database is local, and clean up their own rows", next: true },
      { text: "Payments are tested end to end in Stripe test mode before live keys", next: true },
      { text: "Type check plus the check scripts listed in AGENTS.md", next: true },
      { text: "A frozen list of API routes the iOS app depends on, and a parity check between web and mobile code", next: true },
    ],
    openItems: [
      "Production has no automated checks yet. The 23 check scripts, the job queue and the Higgsfield integration live in the rewrite branch, which is not deployed.",
    ],
  },
  {
    slug: "fiable",
    name: "Fiable",
    kind: "Point of sale and inventory",
    tagline:
      "Point of sale, inventory and credit notes for a phone parts shop, with its own online store and a WhatsApp sales agent. One codebase serves two businesses.",
    summary: "POS, inventory and a WhatsApp sales agent for a phone parts shop.",
    images: {
      card: { src: "/projects/fiable/card.jpg", alt: "Lead Displays online store", width: 1440, height: 900 },
      hero: { src: "/projects/fiable/hero.jpg", alt: "Phone screens and batteries floating on a blue background", width: 1200, height: 670 },
      sections: [
        { src: "/projects/fiable/store.jpg", alt: "Lead Displays storefront with model search and brand filters", caption: "Store: search by phone model, filter by brand and quality", width: 1440, height: 900 },
        { src: "/projects/fiable/product.jpg", alt: "Product page for a battery with price and pickup options", caption: "Product page: warranty, pickup or shipping", width: 1440, height: 900 },
        { src: "/projects/fiable/app.jpg", alt: "Fiable landing page", caption: "Fiable: load products from a photo or a spreadsheet", width: 1440, height: 900 },
        { src: "/projects/fiable/catalog.jpg", alt: "Catalog grid with stock and screen qualities", caption: "Catalog: qualities and stock per model", width: 1440, height: 900 },
        { src: "/projects/fiable/mobile.jpg", alt: "Lead Displays store on a phone", caption: "Store on a phone", width: 390, height: 844 },
        { src: "/projects/fiable/hero.jpg", alt: "Phone screens and batteries floating on a blue background", caption: "Storefront hero", width: 1200, height: 670 },
      ],
    },
    url: "https://fiable.vercel.app",
    urlLabel: "fiable.vercel.app",
    role: "Sole engineer, directing agents",
    timeline: "June 2026 to present",
    stackSummary: "Next.js 16.3, InsForge, Clerk, AI SDK",
    stack: ["Next.js 16.3", "InsForge", "Clerk", "AI SDK", "Kapso WhatsApp", "MCP"],
    techStack: [
      { layer: "Frontend", items: ["Next.js 16.3", "React 19", "TypeScript", "Tailwind CSS 4", "Base UI", "Recharts", "Zod 4", "PWA install"] },
      { layer: "Rendering", items: ["Cache Components", "Partial Prefetching", "Server Actions"] },
      { layer: "Data and access", items: ["InsForge Postgres", "143 migrations", "Row-level security", "FIFO cost layers", "Inventory ledger per SKU", "Clerk"] },
      { layer: "AI", items: ["AI SDK 6", "OpenAI agent", "Whisper voice notes", "OpenRouter vision", "MCP server with 12 tools"] },
      { layer: "Store and operations", items: ["Conekta", "Aplazo", "Skydropx shipping quotes", "AliExpress import", "Kapso WhatsApp", "Web Push"] },
      { layer: "Hardware and documents", items: ["ESC/POS over WebUSB", "80 mm tickets and cash cut", "QR labels", "PDF purchase orders", "Excel import"] },
      { layer: "Infrastructure", items: ["Vercel", "Vercel Cron", "Two deploys, two databases"] },
    ],
    features: [
      { audience: "At the counter", items: ["Point of sale with ticket printing", "Credit notes and customer advances", "Layaways that expire on their own", "Cash cut with a printed summary", "Quotes at the counter or on WhatsApp", "Compatible parts when a model is missing", "A log of what customers asked for and the shop lacked"] },
      { audience: "In the back office", items: ["Suppliers, purchase invoices and accounts payable", "Real profit per sale with FIFO costing", "SKU history from purchase to sale", "Warranties and returns to suppliers", "Branches and stock transfers", "Custom dashboards", "Roles built from 21 permissions"] },
    ],
    facts: [
      { value: "417", label: "commits in about three months" },
      { value: "390", label: "of them co-authored with Claude" },
      { value: "143", label: "database migrations" },
      { value: "53", label: "tables with row-level security" },
      { value: "12", label: "tools in its MCP server" },
    ],
    clientStory: null,
    scope:
      "Fiable runs the counter of a phone parts shop: sales, credit notes, advances, layaways and the cash cut, with every sale costed by FIFO layers. Purchasing covers suppliers, invoices, accounts payable and supplier warranties. The public store, Lead Displays, sells the same stock online, and a WhatsApp agent answers customers and builds quotes.",
    architecture: {
      title: "One ledger behind the counter, the store and WhatsApp",
      flow: [
        { title: "Counter, store, WhatsApp", note: "POS, Lead Displays, Kapso" },
        { title: "Server actions", note: "21 permission keys", check: true },
        { title: "InsForge Postgres", note: "row-level security", check: true },
        { title: "Inventory ledger", note: "every movement, per SKU" },
      ],
      inputs: [
        { title: "WhatsApp agent", note: "quotes behind a lock per phone" },
        { title: "Crons", note: "layaway expiry, AliExpress refresh" },
      ],
    },
    access: {
      title: "Roles built from permissions the code honors",
      body: [
        "Permission keys are defined in code, and each one gates a real capability. An admin composes roles out of them but cannot invent a key the app does not check.",
        "Clerk signs staff in on every route, and 53 tables have row-level security enabled in InsForge.",
      ],
      items: [
        { name: "lib/permissions.ts", note: "21 code-defined keys" },
        { name: "proxy.ts", note: "Clerk on every route" },
        { name: "auth.uid()", note: "row-level security policies" },
        { name: "MCP_BEARER_TOKEN", note: "MCP server access" },
      ],
    },
    spotlight: {
      eyebrow: "AI at the counter",
      title: "A sales agent that knows the stock",
      intro:
        "Customers write to the shop on WhatsApp. An agent searches the real inventory, answers in the shop's voice, builds the quote, and hands the chat to a person when it should.",
      notes: [
        { title: "Quotes without duplicates", body: "The model adds products in parallel, so creating and editing a quote lives in SQL behind an advisory lock per phone. Parallel calls edit one quote instead of opening several.", tech: ["PostgreSQL", "OpenAI agent"] },
        { title: "Voice notes understood", body: "WhatsApp voice notes are transcribed with Whisper before the agent reads them, so customers can talk instead of type.", tech: ["Whisper voice notes"] },
        { title: "Knows who is writing", body: "Meta now sends a business-scoped user ID and drops the phone number once a user takes a username. The agent matches whatever identifiers arrive, across several phones per customer.", tech: ["Kapso WhatsApp"] },
        { title: "A person can take over", body: "Any chat can be handed to a human advisor, and staff get a push notification when a quote has nobody assigned.", tech: ["Web Push"] },
        { title: "Finds compatible parts", body: "When a phone model is not in the catalog, a model says which models share the same panel, and the catalog is searched again with those names.", tech: ["OpenAI"] },
        { title: "Catalog from a photo or a spreadsheet", body: "A vision model reads a photo or a price list into products. Spreadsheets are parsed in the browser, including pivoted layouts where each cell is a product.", tech: ["OpenRouter vision", "Excel import"] },
      ],
    },
    integrations: [
      { name: "Kapso WhatsApp", what: "The channel for the sales agent and advisors." },
      { name: "OpenAI", what: "The agent, Whisper transcription and part compatibility." },
      { name: "OpenRouter", what: "Vision model that reads product photos and lists." },
      { name: "Conekta", what: "Store checkout: card, OXXO, SPEI and Aplazo." },
      { name: "Skydropx", what: "Shipping quotes at checkout." },
      { name: "AliExpress", what: "Dropship import from a listing URL, refreshed daily." },
      { name: "Clerk", what: "Staff sign-in." },
      { name: "InsForge", what: "Postgres, storage and row-level security." },
      { name: "Web Push", what: "Alerts for staff on new quotes and orders." },
      { name: "ESC/POS printer", what: "Tickets and cash cuts printed straight from the browser." },
    ],
    agents: {
      title: "Built with agents, decided in writing",
      notes: [
        { title: "The history shows the split", body: "390 of the 417 commits carry a Claude co-author line." },
        { title: "Decisions written down first", body: "Design docs record each decision with its date, like one repo, two databases and two deploys, before any code." },
        { title: "Comments that explain why", body: "Code comments carry the reason behind each choice, from FIFO costing to image caching, so the next session starts with context." },
      ],
    },
    decisions: [
      { title: "FIFO layers, not a catalog cost", body: "Editing a product's cost used to rewrite the profit of every past sale. Now each purchase line is a layer, sales consume the oldest first, and each sale records what those pieces actually cost.", tech: ["PostgreSQL", "FIFO cost layers"] },
      { title: "Two businesses, no tenant IDs", body: "One repo, two InsForge databases and two deploys. The brand resolves at build time from one variable, so the manifest, metadata and theme stay static; anything that changes without a redeploy lives in each business's own database.", tech: ["InsForge Postgres", "Two deploys, two databases"] },
      { title: "Two names on purpose", body: "Staff use Fiable; customers only know the store, Lead Displays. Names and colour ramps are separate so a customer never sees the back-office brand.", tech: ["PWA install"] },
      { title: "Images that stopped burning egress", body: "Thumbnails were served full size from signed URLs that changed on every request, so no cache could hit: 5.99 GB of egress in one period against a 37 MB bucket. They now go through the image optimizer, keyed on a content-hashed URL.", tech: ["AVIF and WebP images"] },
      { title: "Old tabs cannot call dead actions", body: "The build's commit is baked into the client and compared with a health endpoint, so an open tab notices a new deploy before calling server actions that no longer exist.", tech: ["Server Actions"] },
      { title: "Layaways release themselves", body: "A cron every 15 minutes returns expired holds to the catalog, and every new hold sweeps too, so stock frees on time even if a run is missed.", tech: ["Vercel Cron"] },
      { title: "Printing without a dialog", body: "Tickets print over WebUSB in ESC/POS with auto-cut in one tap. The browser print dialog stays as the reliable fallback.", tech: ["ESC/POS over WebUSB"] },
      { title: "An import that degrades gracefully", body: "AliExpress products come from the official API when the shop has connected it, and from the listing's own metadata when not. The supplier price is the cost; the sale price is the shop's call.", tech: ["AliExpress import"] },
    ],
    security: [
      { title: "Permissions defined in code", body: "Roles are built only from permission keys the server actually checks." },
      { title: "Row-level security", body: "53 tables have row-level security enabled in the database." },
      { title: "The MCP server needs a token", body: "Business data is only served to a client that presents the owner's bearer token." },
      { title: "Scheduled jobs need a secret", body: "Cron endpoints require the bearer secret Vercel sends." },
    ],
    release: [
      { text: "Type check with tsc before a change ships" },
      { text: "17 test scripts replay real inputs: WhatsApp payloads, searches, spreadsheets and postal codes" },
      { text: "Migrations applied by a script to each business's database" },
      { text: "A new deploy is detected by build commit, so open tabs reload before calling stale actions" },
    ],
    openItems: [],
  },
  {
    slug: "grupo-barro-y-cantera",
    name: "Grupo Barro y Cantera",
    kind: "Catalog and quoting",
    tagline:
      "Catalog and quote builder for a stone and clay supplier. Every material is shown in an AI-generated setting, and quotes keep working offline.",
    summary: "Stone catalog with AI-generated scenes, and quotes that work offline.",
    images: {
      card: { src: "/projects/grupo-barro-y-cantera/card.jpg", alt: "Grupo Barro y Cantera home page", width: 1440, height: 900 },
      hero: { src: "/projects/grupo-barro-y-cantera/hero.jpg", alt: "Stone wall clad in Galarza stone from the catalog", width: 1800, height: 1800 },
      sections: [
        { src: "/projects/grupo-barro-y-cantera/floors.jpg", alt: "Floors catalog with generated room scenes", caption: "Floors: every tile shown installed", width: 1440, height: 900 },
        { src: "/projects/grupo-barro-y-cantera/catalogs.jpg", alt: "Catalog covers with flip book and PDF", caption: "Catalogs: flip book and PDF per family", width: 1440, height: 900 },
        { src: "/projects/grupo-barro-y-cantera/materials.jpg", alt: "Stone materials grid with application scenes", caption: "Stone: material cards lead with the scene", width: 1440, height: 900 },
        { src: "/projects/grupo-barro-y-cantera/collections.jpg", alt: "Home page collections", caption: "Home: collections", width: 1440, height: 900 },
        { src: "/projects/grupo-barro-y-cantera/hero.jpg", alt: "Stone wall clad in Galarza stone", caption: "Material scene", width: 1800, height: 1800 },
        { src: "/projects/grupo-barro-y-cantera/porfido.jpg", alt: "Porfido stone applied in a room", caption: "Material scene", width: 1800, height: 1800 },
      ],
    },
    url: "https://www.grupobarroycantera.com.mx",
    urlLabel: "grupobarroycantera.com.mx",
    role: "Sole engineer, directing agents",
    timeline: "November 2025 to August 2026",
    stackSummary: "Next.js 16, InsForge, Clerk, Vercel Blob",
    stack: ["Next.js 16", "Gemini 3 Pro Image", "InsForge", "Vercel Blob"],
    techStack: [
      { layer: "Frontend", items: ["Next.js 16", "React 19.2", "React Compiler", "TypeScript 5.9", "Tailwind CSS 4.1", "shadcn and Radix", "Motion", "React Hook Form with Zod"] },
      { layer: "Rendering", items: ["App Router", "Catalog regenerated every 60 seconds", "revalidatePath after admin writes", "Route handlers for the API"] },
      { layer: "Data", items: ["InsForge Postgres", "SDK queries, no ORM", "9 migrations", "Generated columns for folios and search", "Offline outbox with idempotent saves"] },
      { layer: "Auth and storage", items: ["Clerk", "Vercel Blob with content-hashed URLs", "Migration run with Vercel OIDC"] },
      { layer: "Generative AI", items: ["Gemini 3 Pro Image", "gpt-image-2", "Auto-Toon image pipeline", "Swatches cropped from real photos", "Watermark and text removal", "Perspective correction", "Per-size renders"] },
      { layer: "Documents", items: ["jsPDF quotes and catalogs", "QR codes per product", "HEIC to JPEG conversion", "Flip-book catalogs"] },
      { layer: "Marketing", items: ["GA4", "Google Ads", "Meta Pixel and Conversions API", "Resend lead emails", "Vercel Analytics", "Google Maps"] },
    ],
    features: [
      { audience: "For customers", items: ["Materials shown in generated rooms, floors, pools, gardens and façades", "Renders per size, next to each price", "Catalogs by family, as a flip book", "PDF download per family", "Prices per size and spec sheets", "Shareable link to a single material", "Contact form and WhatsApp quotes"] },
      { audience: "For the sales team", items: ["Quote builder with folio, tax and deposit", "Quotes that keep working offline", "Customer search that ignores accents", "Catalog editor with photo uploads", "QR downloads and categories", "Metrics dashboard"] },
    ],
    facts: [
      { value: "2", label: "AI scenes per material: 3:4 for phones, 16:9 for desktop" },
      { value: "20", label: "garden scenes generated for Granos de Mármol alone" },
      { value: "95", label: "commits, shipped as small pull requests" },
      { value: "8", label: "tests on offline quotes and admin access" },
      { value: "9", label: "database migrations" },
    ],
    clientStory: null,
    scope:
      "A stone yard sells by look and texture, but supplier photos are close-ups. Generative AI turns each material into the finished space: a floor, a wall, a pool deck or a garden. The public site is a catalog with flip-book views, PDF export per family, prices per size and spec sheets. Staff build quotes as PDFs with folio, tax and deposit, manage the catalog with photo uploads, and read a metrics dashboard.",
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
    pipeline: {
      title: "From a phone photo to a catalog page",
      intro:
        "The yard's products were photographed with a phone, right at the yard. Each photo becomes a clean swatch, and the swatch becomes the reference for a phone scene and a desktop scene.",
      examples: [
        {
          material: "Grano de mármol rosa",
          steps: [
            { src: "/projects/grupo-barro-y-cantera/pipeline/rosa-raw.jpg", alt: "Phone photo of a pile of pink marble gravel", caption: "Phone photo", width: 1200, height: 900 },
            { src: "/projects/grupo-barro-y-cantera/pipeline/rosa-material.jpg", alt: "Clean square swatch of the gravel", caption: "Clean swatch", width: 1200, height: 1200 },
            { src: "/projects/grupo-barro-y-cantera/pipeline/rosa-aplicacion.jpg", alt: "Generated garden path with the gravel, portrait", caption: "Phone scene, 3:4", width: 896, height: 1200 },
            { src: "/projects/grupo-barro-y-cantera/pipeline/rosa-panoramica.jpg", alt: "Generated garden with the gravel, wide", caption: "Desktop scene, 16:9", width: 1400, height: 781 },
          ],
        },
        {
          material: "Cantera Rosa Bader",
          steps: [
            { src: "/projects/grupo-barro-y-cantera/pipeline/bader-raw.jpg", alt: "Phone photo of a pink cantera slab with the photographer's shadow", caption: "Phone photo", width: 1200, height: 900 },
            { src: "/projects/grupo-barro-y-cantera/pipeline/bader-material.jpg", alt: "Clean square swatch of the cantera", caption: "Clean swatch", width: 1400, height: 1400 },
            { src: "/projects/grupo-barro-y-cantera/pipeline/bader-aplicacion.jpg", alt: "Generated garden walkway paved with the cantera, with the swatch inset", caption: "Phone scene, 3:4", width: 1045, height: 1400 },
            { src: "/projects/grupo-barro-y-cantera/pipeline/bader-panoramica.jpg", alt: "Generated patio paved with the cantera, wide", caption: "Desktop scene, 16:9", width: 1400, height: 788 },
          ],
        },
      ],
    },
    spotlight: {
      eyebrow: "Generative AI",
      title: "Generative AI for every page of the catalog",
      intro:
        "Materials across the catalog, the flip books and the PDFs are shown in scenes generated with Gemini 3 Pro Image through the Auto-Toon image pipeline. The real product stays the reference, so the stone keeps its true colour and texture.",
      notes: [
        {
          title: "Real swatch in, generated scene out",
          body: "Swatches are cropped from real product photos. The model gets that swatch as its reference and builds the room, floor, pool or garden around it.",
        },
        {
          title: "Two formats per material",
          body: "A 3:4 scene for phones and a 16:9 scene for desktop, stored separately so each screen gets a composed image, not a crop.",
        },
        {
          title: "Clean inputs",
          body: "Supplier images arrive with watermarks, text and skewed angles. Those are removed and straightened before a scene is generated.",
        },
        {
          title: "Output is checked",
          body: "The batch script confirms each image came from Gemini 3 Pro and not a fallback model before it is kept.",
        },
        {
          title: "No scene, no listing",
          body: "A product stays hidden until its generated scene exists. When an admin save once wiped the scenes, the form stopped sending those fields.",
        },
        {
          title: "Renders per size",
          body: "Materials like Pórfido Rojo carry a render for each size, shown next to that size's price.",
        },
      ],
    },
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
      { title: "Quote numbers without races", body: "The folio comes from a generated column on a sequence, not from a counter in the app, so two salespeople can never get the same number.", tech: ["Generated columns for folios and search"] },
      { title: "Quotes that survive the backend", body: "Folios are reserved ahead of time, saves go to an outbox with an idempotent client ID, and drafts stay on the device.", tech: ["Offline outbox with idempotent saves"] },
      { title: "Images moved after a quota incident", body: "Storage egress used up the backend quota and paused the project. Images moved to Vercel Blob with content-hashed URLs cached for a year.", tech: ["Vercel Blob with content-hashed URLs"] },
      { title: "Scenes stored per screen", body: "Each material keeps a 3:4 scene for phones and a 16:9 scene for desktop, so no screen shows a crop of the other.", tech: ["Gemini 3 Pro Image"] },
      { title: "Spec data is never inferred", body: "Spec columns stay empty unless the manufacturer publishes the value.", tech: ["InsForge Postgres"] },
      { title: "Search ignores accents", body: "Customer search uses a generated column that folds Spanish accents.", tech: ["Generated columns for folios and search"] },
    ],
    // Hidden until the /api allowlist fix ships in that repo.
    integrations: [
      { name: "Gemini 3 Pro Image", what: "Application scenes generated from real swatches." },
      { name: "InsForge Postgres", what: "Products, quotes, customers and analytics events." },
      { name: "Clerk", what: "Sign-in for the internal tools." },
      { name: "Vercel Blob", what: "Product images with content-hashed URLs." },
      { name: "Resend", what: "Lead emails from the contact form." },
      { name: "Google Analytics and Google Ads", what: "Traffic and lead conversions." },
      { name: "Meta Pixel and Conversions API", what: "Lead events deduplicated across browser and server." },
      { name: "WhatsApp", what: "Quotes and contact in one tap." },
    ],
    security: [],
    release: [
      { text: "8 tests with the Node test runner cover the admin allowlist and the offline quote outbox" },
      { text: "Each change ships as its own small pull request" },
      { text: "Leads are never lost: without the email key, they fall back to the function logs" },
      { text: "The image migration to Vercel Blob ran with short-lived Vercel OIDC credentials, not a stored token" },
    ],
    openItems: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
