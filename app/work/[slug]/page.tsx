import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechChip, TechIcon } from "@/components/tech-icon";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { getProject, projects, type FlowNode, type Note as NoteData, type Project, type Shot } from "@/content/projects";

const wrap = "mx-auto w-full max-w-[1440px] px-5 md:px-12 xl:px-24";
const h2 = "text-[32px] leading-9 tracking-[-0.03em] md:text-[40px] md:leading-11";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.tagline,
    openGraph: { images: [{ url: p.images.hero.src, width: p.images.hero.width, height: p.images.hero.height }] },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <>
      <SiteHeader active="Work" />
      <main>
        <section className={`${wrap} flex flex-col gap-10 pt-8 pb-12 md:pt-14 md:pb-16`}>
          <Link href="/#work" className="flex h-11 items-center gap-2 self-start text-sm text-muted hover:text-ink">
            <ArrowLeft />
            All work
          </Link>
          <div className="flex flex-col gap-6">
            <h1 className="-ml-1 text-[56px] leading-[56px] font-light tracking-[-0.05em] text-balance md:text-[96px] md:leading-[92px] lg:text-[128px] lg:leading-[120px]">
              {p.name}
            </h1>
            <p className="max-w-[640px] text-lg leading-7 text-[#444] text-pretty md:text-[22px] md:leading-8">
              {p.tagline}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-8 pt-2 lg:grid-cols-4">
            <Meta label="Role" value={p.role} />
            <Meta label="Timeline" value={p.timeline} />
            <Meta label="Stack" value={p.stackSummary} />
            <div className="flex flex-col gap-1.5">
              <dt className="text-[13px] text-muted">Live site</dt>
              <dd>
                <a href={p.url} className="flex items-center gap-1.5 text-base leading-6 underline underline-offset-4">
                  <span className="min-w-0 break-all">{p.urlLabel}</span>
                  <ArrowUpRight className="size-3.5 shrink-0" />
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <Mosaic shots={p.images.sections} />

        <section
          className={`${wrap} grid grid-cols-2 gap-8 py-16 md:grid-cols-3 md:py-24 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]`}
          style={{ "--n": p.facts.length } as React.CSSProperties}
        >
          {p.facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-2">
              <div className="text-5xl leading-12 font-light tracking-[-0.05em] md:text-[64px] md:leading-16">
                {f.value}
              </div>
              <div className="text-sm leading-[22px] text-muted">{f.label}</div>
            </div>
          ))}
        </section>

        <section className={`${wrap} flex flex-col gap-6 pb-16 md:pb-30`}>
          <h2 className={h2}>What it does</h2>
          <div className="flex max-w-[760px] flex-col gap-5 text-lg leading-[30px] text-[#444]">
            {p.clientStory && <p className="text-pretty">{p.clientStory}</p>}
            <p className="text-pretty">{p.scope}</p>
          </div>
          <div className="grid gap-10 pt-6 md:grid-cols-2 md:gap-12">
            {p.features.map((f) => (
              <div key={f.audience} className="flex flex-col gap-4 border-t border-rule pt-6">
                <h3 className="text-lg leading-[26px] font-medium">{f.audience}</h3>
                <ul className="flex flex-col gap-2.5 text-[15px] leading-6 text-body">
                  {f.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-muted" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {p.spotlight && (
          // Integrations below bring their own top padding; only the white pipeline band needs a gap.
          <section className={`${wrap} ${p.pipeline ? "pb-16 md:pb-30" : ""}`}>
            <div className="flex flex-col gap-10 rounded-3xl bg-ink p-7 text-paper md:gap-14 md:p-12 lg:p-18">
              <div className="flex max-w-[760px] flex-col gap-5">
                <span className="flex items-center gap-2 text-sm text-[#bdbdbd]">
                  <Sparkle aria-hidden="true" className="size-4" />
                  {p.spotlight.eyebrow}
                </span>
                <h2 className="text-[32px] leading-9 font-light tracking-[-0.03em] text-balance md:text-[44px] md:leading-12">
                  {p.spotlight.title}
                </h2>
                <p className="text-base leading-[26px] text-[#d4d4d4] text-pretty md:text-lg md:leading-[30px]">
                  {p.spotlight.intro}
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
                {p.spotlight.notes.map((n) => (
                  <div key={n.title} className="flex flex-col gap-3 border-t border-[#454545] pt-6">
                    <h3 className="text-lg leading-[26px] font-medium">{n.title}</h3>
                    <p className="text-[15px] leading-[25px] text-[#bdbdbd] text-pretty">{n.body}</p>
                    {n.tech && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {n.tech.map((t) => (
                          <TechChip key={t} label={t} className="bg-[#2f2f2f] text-[#e0e0e0]" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {p.pipeline && <Pipeline pipeline={p.pipeline} />}

        <section className={`${wrap} flex flex-col gap-10 py-16 md:gap-12 md:py-30`}>
          <h2 className={h2}>Integrations</h2>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {p.integrations.map((i) => (
              <li key={i.name} className="flex gap-4 rounded-2xl bg-white p-5 md:p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper">
                  <TechIcon label={i.name} className="size-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base leading-6 font-medium">{i.name}</h3>
                  <p className="text-sm leading-[22px] text-body">{i.what}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white">
          <div className={`${wrap} flex flex-col gap-10 py-16 md:gap-12 md:py-30`}>
            <h2 className={h2}>Stack in production</h2>
            <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
              {p.techStack.map((t) => (
                <div key={t.layer} className="flex flex-col gap-3">
                  <dt className="text-[13px] text-muted">{t.layer}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {t.items.map((i) => (
                      <TechChip key={i} label={i} />
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Architecture p={p} />

        <section className={`${wrap} flex flex-col gap-12 pb-16 md:pb-30`}>
          <h2 className={h2}>Architecture decisions, and why</h2>
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-12">
            {p.decisions.map((n) => (
              <Note key={n.title} {...n} />
            ))}
          </div>
        </section>

        {p.access && (
          <section className="bg-white">
          <div className={`${wrap} grid gap-10 py-16 md:py-30 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-24`}>
            <div className="flex flex-col gap-6">
              <h2 className={h2}>{p.access.title}</h2>
              {p.access.body.map((b) => (
                <p key={b} className="text-[17px] leading-7 text-body text-pretty">
                  {b}
                </p>
              ))}
            </div>
            <ul className="flex flex-col gap-3.5 self-start rounded-2xl bg-paper p-6 text-sm leading-[22px] md:p-8">
              {p.access.items.map((i) => (
                <li key={i.name} className="flex justify-between gap-4">
                  <span className="font-mono text-[13px] break-all">{i.name}</span>
                  <span className="shrink-0 text-muted">{i.note}</span>
                </li>
              ))}
            </ul>
          </div>
          </section>
        )}

        <section className={`${wrap} flex flex-col gap-12 pb-16 md:pb-30 ${p.access ? "pt-16 md:pt-30" : ""}`}>
          <h2 className={h2}>{p.agents.title}</h2>
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {p.agents.notes.map((n) => (
              <Note key={n.title} {...n} />
            ))}
          </div>
        </section>


        <section className="bg-white">
          <div className={`${wrap} grid gap-14 py-16 md:py-30 ${p.security.length ? "lg:grid-cols-2 lg:gap-24" : ""}`}>
            {p.security.length > 0 && (
              <div className="flex flex-col gap-10">
                <h2 className={h2}>Security</h2>
                <div className="flex flex-col gap-8">
                  {p.security.map((n) => (
                    <Note key={n.title} {...n} />
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-10">
              <h2 className={h2}>Before it reaches production</h2>
              <ol className={`grid gap-6 ${p.security.length ? "" : "md:grid-cols-2 md:gap-x-12"}`}>
                {p.release.map((r, i) => (
                  <li key={r} className="grid grid-cols-[40px_minmax(0,1fr)] gap-4">
                    <span className="text-[28px] leading-8 font-light tracking-[-0.02em] text-muted tabular-nums">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-[15px] leading-6 text-body text-pretty">{r}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {p.openItems.length > 0 && (
          <section className={`${wrap} flex flex-col gap-6 pb-16 md:pb-30`}>
            <h2 className={h2}>What is not done yet</h2>
            {p.openItems.map((o) => (
              <p key={o} className="max-w-[760px] text-lg leading-[30px] text-[#444]">
                {o}
              </p>
            ))}
          </section>
        )}

        <div className={wrap}>
          <Link
            href={`/work/${next.slug}`}
            prefetch={true}
            className="group flex items-center justify-between gap-6 border-t border-rule pt-12 pb-24 md:pb-30"
          >
            <span className="flex flex-col gap-2">
              <span className="text-sm text-muted">Next project</span>
              <span className="text-[40px] leading-11 font-light tracking-[-0.05em] md:text-7xl md:leading-[76px]">
                {next.name}
              </span>
            </span>
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:scale-105 md:size-20">
              <ArrowUpRight className="size-6" />
            </span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd className="text-base leading-6">{value}</dd>
    </div>
  );
}

function Note({ title, body, tech }: NoteData) {
  return (
    <div className="flex flex-col gap-3 border-t border-rule pt-6">
      <h3 className="text-lg leading-[26px] font-medium">{title}</h3>
      <p className="text-[15px] leading-[25px] text-body text-pretty">{body}</p>
      {tech && (
        <div className="flex flex-wrap gap-2 pt-1">
          {tech.map((t) => (
            <TechChip key={t} label={t} className="bg-white" />
          ))}
        </div>
      )}
    </div>
  );
}

function Node({ n }: { n: FlowNode }) {
  return (
    <div
      className={`flex min-h-20 flex-col items-center justify-center rounded-[14px] px-4 py-2 text-center text-[15px] leading-[22px] ${
        n.check ? "border-[1.5px] border-ink bg-white" : "bg-white"
      }`}
    >
      <span className="font-medium">{n.title}</span>
      <span className="text-muted">{n.note}</span>
    </div>
  );
}

function Architecture({ p }: { p: Project }) {
  const { flow, inputs, title } = p.architecture;
  return (
    <section>
      <div className={`${wrap} flex flex-col gap-12 py-16 md:gap-14 md:py-30`}>
        <div className="flex flex-col gap-4">
          <h2 className={h2}>{title}</h2>
          <p className="max-w-[640px] text-base leading-[26px] text-body">
            Outlined boxes are where the system protects itself. The lower row shows what else enters the flow.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[repeat(4,minmax(0,1fr))] lg:gap-x-24 lg:gap-y-0">
          {flow.map((n, i) => (
            <div key={n.title} className="relative flex flex-col gap-3 lg:block">
              <Node n={n} />
              {i < flow.length - 1 && (
                <>
                  <ArrowDown className="size-5 self-center text-[#a0a0a0] lg:hidden" />
                  <ArrowRight className="absolute top-1/2 -right-15 hidden size-6 -translate-y-1/2 text-[#a0a0a0] lg:block" />
                </>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col gap-3 lg:col-span-2 lg:col-start-2 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-x-24">
            {inputs.map((n) => (
              <div key={n.title} className="flex flex-col items-stretch gap-3 lg:pt-3">
                <ArrowUp className="hidden size-5 self-center text-[#a0a0a0] lg:block lg:h-16 lg:w-6" />
                <Node n={n} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Several screens of the live product instead of one oversized hero image.
function Mosaic({ shots }: { shots: Shot[] }) {
  const [lead, ...rest] = shots;
  return (
    <div className={`${wrap} grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-6`}>
      <Figure shot={lead} lead priority className="md:col-span-2 lg:row-span-2" />
      {rest.map((s) => (
        <Figure key={s.src} shot={s} />
      ))}
    </div>
  );
}

function Figure({ shot, lead, priority, className = "" }: { shot: Shot; lead?: boolean; priority?: boolean; className?: string }) {
  const portrait = shot.height > shot.width;
  return (
    <figure className={`flex flex-col gap-2.5 ${className}`}>
      <div
        className={`relative overflow-hidden rounded-2xl bg-well ${
          lead ? "aspect-[16/10] lg:aspect-auto lg:min-h-[420px] lg:flex-1" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          priority={priority}
          sizes={lead ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className={portrait ? "object-contain py-3" : "object-cover object-top"}
        />
      </div>
      <figcaption className="text-[13px] leading-5 text-muted">{shot.caption}</figcaption>
    </figure>
  );
}

function Pipeline({ pipeline }: { pipeline: NonNullable<Project["pipeline"]> }) {
  return (
    <section className="bg-white">
      <div className={`${wrap} flex flex-col gap-12 py-16 md:gap-14 md:py-30`}>
        <div className="flex max-w-[760px] flex-col gap-4">
          <h2 className={h2}>{pipeline.title}</h2>
          <p className="text-base leading-[26px] text-body text-pretty md:text-lg md:leading-[30px]">{pipeline.intro}</p>
        </div>
        {pipeline.examples.map((ex) => (
          <div key={ex.material} className="flex flex-col gap-4">
            <h3 className="text-lg leading-[26px] font-medium">{ex.material}</h3>
            {/* Row height stays equal on desktop: each image grows by its own aspect ratio. */}
            <ol className="grid grid-cols-2 gap-3 md:flex md:gap-4">
              {ex.steps.map((st, i) => (
                <li key={st.src} className="flex flex-col gap-2" style={{ flex: `${st.width / st.height} 1 0` }}>
                  <div
                    className="relative overflow-hidden rounded-xl bg-well"
                    style={{ aspectRatio: `${st.width} / ${st.height}` }}
                  >
                    <Image src={st.src} alt={st.alt} fill sizes="(min-width: 768px) 30vw, 50vw" className="object-cover" />
                  </div>
                  <span className="flex items-baseline gap-2 text-[13px] leading-5">
                    <span className="text-muted tabular-nums">{i + 1}</span>
                    {st.caption}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
