import Image from "next/image";
import Link from "next/link";
import { AskBanner, AskLink } from "@/components/chat";
import { ContactForm } from "@/components/contact-form";
import { ArrowUpRight, Check } from "@/components/icons";
import { CashRegister, MagicWand, Mountains, Sneaker } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechChip } from "@/components/tech-icon";
import { experience, method, profile, releaseChecks, roleChecks, security, sideProjects, toolbox } from "@/content/profile";
import { getProject } from "@/content/projects";

const wrap = "mx-auto w-full max-w-[1440px] px-5 md:px-12 xl:px-24";
const h2 = "text-[32px] leading-9 tracking-[-0.03em] md:text-[40px] md:leading-11";

// Two rows, wide and narrow alternating, so no row repeats the same rhythm.
const work = ["calzado-blade", "auto-toon", "fiable", "grupo-barro-y-cantera"].map((s) => getProject(s)!);
const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LiveProducts />
        <About />
        <Work />
        <Method />
        <Toolbox />
        <SecurityAndRelease />
        <Experience />
        <section className={wrap}>
          <div className="flex flex-col gap-8 rounded-3xl bg-gradient-to-br from-accent-strong to-accent p-7 text-white md:p-12 lg:p-18 xl:flex-row xl:items-center xl:gap-18">
            <div className="flex flex-col gap-4 lg:gap-5 xl:w-[480px] xl:shrink-0">
              <h2 className="text-[30px] leading-[34px] font-light tracking-[-0.03em] md:text-[44px] md:leading-12">
                Ask my AI about my work
              </h2>
              <p className="text-[15px] leading-6 text-white/85 md:text-base md:leading-[26px]">
                It answers from my CV and project notes, and says so when it does not know.
              </p>
            </div>
            <AskBanner />
          </div>
        </section>
        <SideProjects />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section id="top" className={`${wrap} flex flex-col gap-10 lg:h-[800px] lg:flex-row lg:gap-12`}>
      <div aria-hidden="true" className="hidden w-8 flex-col items-center gap-5 pt-14 pb-18 text-xs text-muted lg:flex">
        <span className="[writing-mode:vertical-rl] rotate-180">{profile.title}</span>
        <span className="w-px flex-1 bg-rule" />
        <span className="[writing-mode:vertical-rl] rotate-180">2026</span>
      </div>
      <div className="flex flex-col gap-8 pt-6 lg:w-[640px] lg:shrink-0 lg:pt-16 lg:pb-22">
        <div className="flex gap-10 md:gap-14">
          <Stat value="12" label="Years shipping software" />
          <Stat value="1,500" label="Commits on four live products" />
        </div>
        <div className="flex flex-col gap-6 lg:mt-auto lg:gap-7">
          <h1 className="-ml-1 text-[84px] leading-[84px] font-light tracking-[-0.055em] md:text-[128px] md:leading-[120px] lg:-ml-2 lg:text-[160px] lg:leading-[150px]">
            Antonio
          </h1>
          <p className="max-w-[460px] text-lg leading-7 text-[#444] text-pretty md:text-xl md:leading-[30px]">
            {profile.title}. I direct AI coding agents, and I own what they ship.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium">
            <a href="#contact" className="group flex items-center gap-1.5">
              <span className="flex h-12 items-center rounded-full bg-accent px-6 text-[15px] text-white transition-colors group-hover:bg-accent-strong">
                Get in touch
              </span>
              <span className="flex size-12 items-center justify-center rounded-full bg-accent-tint text-accent-strong transition-transform group-hover:rotate-45 motion-reduce:transition-none">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
            <AskLink className="flex h-11 cursor-pointer items-center gap-1.5 text-muted hover:text-accent">
              Ask my AI about me
            </AskLink>
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 items-end">
        <div className="relative h-[440px] w-full overflow-hidden rounded-t-2xl bg-well md:h-[600px] lg:h-[720px]">
          <Image
            src="/portrait-color.jpg"
            alt={`Portrait of ${profile.shortName}`}
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-[center_20%]"
          />
          <RoleBadge />
        </div>
      </div>
    </section>
  );
}

// Slow-turning seal over the portrait; static when the visitor prefers less motion.
function RoleBadge() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-5 left-5 flex size-28 items-center justify-center rounded-full bg-white/90 shadow-[0_8px_24px_rgb(34_34_34/0.12)] md:top-6 md:left-6 md:size-32"
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 animate-spin-slow motion-reduce:animate-none">
        <defs>
          <path id="role-badge" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-ink text-[10px] font-medium tracking-[0.18em] uppercase">
          <textPath href="#role-badge" textLength="272">
            Principal engineer · AI agents ·
          </textPath>
        </text>
      </svg>
      <span className="flex size-10 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">AG</span>
    </div>
  );
}

// The four live products, right under the hero, each linking to its case study.
const live = [
  { slug: "calzado-blade", name: "Calzado Blade", Icon: Sneaker },
  { slug: "auto-toon", name: "Auto-Toon", Icon: MagicWand },
  { slug: "fiable", name: "Fiable", Icon: CashRegister },
  { slug: "grupo-barro-y-cantera", name: "Barro y Cantera", Icon: Mountains },
];

function LiveProducts() {
  return (
    <section aria-label="Products in production" className="border-y border-line bg-white">
      <div className={`${wrap} flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:justify-between`}>
        <p className="text-sm text-muted">
          <span className="font-medium text-ink">Four products</span> running in production today
        </p>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-12">
          {live.map(({ slug, name, Icon }) => (
            <li key={slug}>
              <Link
                href={`/work/${slug}`}
                prefetch={true}
                className="flex h-11 items-center gap-2.5 text-[15px] font-medium text-[#8a8a8a] transition-colors hover:text-accent"
              >
                <Icon aria-hidden="true" className="size-5" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[32px] leading-9 font-light tracking-[-0.03em] md:text-[44px] md:leading-12">
        <span className="align-top text-base md:text-[22px]">+</span>
        {value}
      </div>
      <div className="text-xs text-muted md:text-[13px]">{label}</div>
    </div>
  );
}

function About() {
  const checks = roleChecks.filter((c) => c.evidence && c.requirement !== "Directs AI coding agents");
  return (
    <section id="about" className="bg-white">
      <div className={`${wrap} grid gap-10 py-16 md:py-30 lg:grid-cols-[380px_320px_minmax(0,1fr)] lg:gap-16`}>
        <div className="flex flex-col gap-6">
          <h2 className={h2}>About me</h2>
          <p className="text-base leading-[27px] text-body text-pretty">
            Twelve years building SaaS, e-commerce and AI products for teams in the US and Mexico. Today I write the
            spec, set the checks and review what the agents write. Four of those products run in production.
          </p>
        </div>
        <div className="flex flex-col gap-5 rounded-2xl bg-accent-soft p-7">
          <div className="text-[56px] leading-14 font-light tracking-[-0.05em] text-accent md:text-7xl md:leading-18">87%</div>
          <p className="text-sm leading-[22px] text-body">
            of Calzado Blade commits were co-authored with an AI agent. I reviewed every one.
          </p>
          <div className="relative h-[168px] overflow-hidden rounded-xl">
            <Image
              src="/projects/calzado-blade/hero.jpg"
              alt="Calzado Blade Thunder collection banner"
              fill
              sizes="264px"
              className="object-cover"
            />
          </div>
        </div>
        <ul className="flex flex-col gap-7">
          {checks.map((c) => (
            <li key={c.requirement} className="flex gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <Check />
              </span>
              <div className="flex flex-col gap-1">
                <div className="text-base leading-6 font-medium">{c.requirement}</div>
                <div className="text-sm leading-[22px] text-muted">{c.evidence}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="bg-accent-soft">
      <div className={`${wrap} flex flex-col gap-10 py-16 md:gap-12 md:py-30`}>
        <h2 className={h2}>Selected work</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-14">
          {work.map((p, i) => (
            <Link key={p.slug} href={`/work/${p.slug}`} prefetch={true} className={`group flex flex-col gap-4 ${span[i]}`}>
              <div className="relative h-[240px] overflow-hidden rounded-2xl bg-well md:h-[340px] lg:h-[420px]">
                <Image
                  src={p.images.card.src}
                  alt={p.images.card.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-left-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] motion-reduce:transition-none"
                />
                <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="rounded-full bg-white px-2.5 py-0.5 text-xs leading-5 font-medium text-accent-strong">{p.kind}</span>
                <h3 className="text-lg leading-[26px] font-medium">{p.name}</h3>
                <p className="text-sm leading-[22px] text-muted">{p.summary}</p>
              </div>
              <ul aria-label={`${p.name} stack`} className="flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li key={t} className="rounded-full bg-white px-3 py-1 text-xs leading-5">
                    {t}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section className="bg-white">
      <div className={`${wrap} flex flex-col gap-12 py-16 md:gap-14 md:py-30`}>
        <h2 className={h2}>How I work with agents</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {method.map((m) => (
            <div key={m.step} className="flex flex-col gap-4">
              <h3 className="text-[28px] leading-8 font-light tracking-[-0.02em]">{m.step}</h3>
              <p className="text-[15px] leading-[25px] text-body text-pretty">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Toolbox() {
  return (
    <section className={`${wrap} flex flex-col gap-10 py-16 md:gap-12 md:py-30`}>
      <h2 className={h2}>Stack in production</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {toolbox.map((t, i) => (
          <div
            key={t.layer}
            className={`flex flex-col gap-5 rounded-2xl bg-white p-6 md:p-7 ${i === 0 ? "lg:col-span-2" : ""}`}
          >
            <h3 className="text-[28px] leading-8 font-light tracking-[-0.02em]">{t.layer}</h3>
            <ul className="flex flex-wrap gap-2">
              {t.items.map((item) => (
                <li key={item}>
                  <TechChip label={item} />
                </li>
              ))}
            </ul>
            <p className="mt-auto text-[13px] leading-5 text-muted">{t.usedIn}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SecurityAndRelease() {
  return (
    <section className="bg-white">
      <div className={`${wrap} grid gap-14 py-16 md:py-30 lg:grid-cols-2 lg:gap-24`}>
        <div className="flex flex-col gap-10">
          <h2 className={h2}>Secure by default</h2>
          <ul className="flex flex-col divide-y divide-line">
            {security.map((s) => (
              <li key={s.title} className="flex flex-col gap-1.5 py-5 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base leading-6 font-medium">{s.title}</h3>
                  <span className="text-xs text-muted">{s.where}</span>
                </div>
                <p className="text-[15px] leading-6 text-body">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-10">
          <h2 className={h2}>Before anything ships</h2>
          <ol className="flex flex-col gap-6">
            {releaseChecks.map((r, i) => (
              <li key={r.step} className="grid grid-cols-[40px_minmax(0,1fr)] gap-4">
                <span className="text-[28px] leading-8 font-light tracking-[-0.02em] text-accent tabular-nums">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base leading-6 font-medium">{r.step}</h3>
                  <p className="text-[15px] leading-6 text-body">{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className={`${wrap} flex flex-col gap-10 py-16 md:py-30`}>
      <h2 className={h2}>Where I have worked</h2>
      <div className="flex flex-col divide-y divide-line">
        {experience.map((e) => (
          <div key={e.company} className="grid gap-3 py-7 md:grid-cols-[320px_minmax(0,1fr)] md:gap-12">
            <div className="flex flex-col gap-1">
              <div className="text-lg leading-[26px] font-medium">{e.company}</div>
              <div className="text-[13px] text-muted">
                {e.role}, {e.years}
              </div>
            </div>
            <p className="text-[15px] leading-[25px] text-body">{e.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SideProjects() {
  return (
    <section className={`${wrap} flex flex-col gap-10 pt-16 md:pt-30`}>
      <h2 className="text-[28px] leading-[34px] tracking-[-0.02em]">Smaller builds</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {sideProjects.map((s) => (
          <div key={s.name} className="flex flex-col gap-2 border-t border-rule pt-5">
            <h3 className="text-base leading-6 font-medium">{s.name}</h3>
            <p className="text-sm leading-[22px] text-muted">{s.body}</p>
            <p className="font-mono text-xs text-muted">{s.stack}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className={`${wrap} flex flex-col items-center gap-12 py-24 md:py-40`}>
      <h2 className="text-center text-4xl leading-10 font-light tracking-[-0.04em] text-balance md:text-[56px] md:leading-[60px]">
        Have a role in mind? Let&apos;s talk.
      </h2>
      <ContactForm />
    </section>
  );
}
