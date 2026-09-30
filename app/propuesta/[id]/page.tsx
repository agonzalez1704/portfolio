import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, Check } from "@/components/icons";
import { Monogram } from "@/components/site-header";
import { profile } from "@/content/profile";
import { getPropuesta, propuestas, type Formato, type Pieza, type Propuesta } from "@/content/propuestas";
import { Aceptar, AvisoApertura } from "./aviso";

const wrap = "mx-auto w-full max-w-[1440px] px-5 md:px-12 xl:px-24";
const h2 = "text-[32px] leading-9 tracking-[-0.03em] md:text-[40px] md:leading-11";
const tint = "bg-[color-mix(in_oklab,var(--marca)_8%,white)]";

const formatos: Record<Formato, { aspect: string; grid: string; sizes: string }> = {
  "Historia 9:16": { aspect: "aspect-[9/16]", grid: "grid-cols-2 md:grid-cols-4", sizes: "(min-width: 768px) 25vw, 50vw" },
  "Feed 4:5": { aspect: "aspect-[4/5]", grid: "grid-cols-2 md:grid-cols-4", sizes: "(min-width: 768px) 25vw, 50vw" },
  "Cuadrado 1:1": { aspect: "aspect-square", grid: "grid-cols-2 md:grid-cols-4", sizes: "(min-width: 768px) 25vw, 50vw" },
  "Horizontal 16:9": { aspect: "aspect-video", grid: "md:grid-cols-2", sizes: "(min-width: 768px) 50vw, 100vw" },
};

const fecha = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
const mxn = (n: number) =>
  `${n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 })} MXN`;

export function generateStaticParams() {
  return propuestas.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/propuesta/[id]">): Promise<Metadata> {
  const p = getPropuesta((await params).id);
  if (!p) return {};
  return {
    title: `Propuesta para ${p.cliente}`,
    description: `${p.campana}: contenido generado con IA para ${p.cliente}.`,
    robots: { index: false, follow: false },
    openGraph: { images: [{ url: p.portada.src, alt: p.portada.alt }] },
  };
}

export default async function PropuestaPage({ params }: PageProps<"/propuesta/[id]">) {
  const p = getPropuesta((await params).id);
  if (!p) notFound();

  return (
    <div lang="es" style={{ "--marca": p.color } as CSSProperties} className="flex flex-1 flex-col">
      <AvisoApertura id={p.id} />
      <header className={`${wrap} flex h-16 items-center justify-between md:h-[88px]`}>
        <span className="text-[15px] font-medium">Propuesta para {p.cliente}</span>
        <span className="flex items-center gap-3 text-sm text-muted">
          <span className="hidden sm:inline">Preparada por {profile.shortName}</span>
          <Monogram />
        </span>
      </header>

      <main>
        <section className={`${wrap} grid gap-10 pt-6 pb-16 md:pt-10 md:pb-24 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-end lg:gap-16`}>
          <div className="flex flex-col gap-8">
            <p className="flex items-center gap-2 text-sm text-(--marca)">
              <span className="size-2 rounded-full bg-(--marca)" />
              Propuesta de contenido generado con IA
            </p>
            <h1 className="-ml-1 text-[56px] leading-[56px] font-light tracking-[-0.05em] text-balance md:text-[96px] md:leading-[92px]">
              {p.campana}
            </h1>
            <p className="max-w-[560px] text-lg leading-7 text-[#444] text-pretty md:text-[22px] md:leading-8">
              {p.resumen}
            </p>
            <dl className="grid grid-cols-2 gap-6 sm:max-w-[520px]">
              <Meta label="Fecha" value={fecha(p.fecha)} />
              <Meta label="Vigente hasta" value={fecha(p.vigencia)} />
            </dl>
            <a
              href="#paquetes"
              className="flex h-[52px] items-center gap-2 self-start rounded-full bg-(--marca) px-7 text-[15px] font-medium text-white hover:opacity-90"
            >
              Ver paquetes y precios
              <ArrowDown />
            </a>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-well">
            <Image src={p.portada.src} alt={p.portada.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </div>
        </section>

        <Concepto p={p} />
        <Piezas piezas={p.piezas} />
        <Paquetes p={p} />
      </main>

      <footer className="mt-auto bg-ink text-paper">
        <div className={`${wrap} flex flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between`}>
          <div className="flex flex-col gap-2">
            <p className="text-[13px] text-[#9a9a9a]">¿Dudas o cambios?</p>
            <a href={`mailto:${profile.contact.email}`} className="text-[22px] font-light tracking-tight break-all hover:text-accent-tint md:text-3xl">
              {profile.contact.email}
            </a>
          </div>
          <a href={profile.contact.whatsapp} className="flex h-11 items-center gap-1.5 text-sm text-[#bdbdbd] hover:text-paper">
            WhatsApp {profile.contact.phoneLabel}
            <ArrowUpRight />
          </a>
        </div>
      </footer>
    </div>
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

function Concepto({ p }: { p: Propuesta }) {
  const { idea, publico, tono, paleta } = p.concepto;
  return (
    <section className={tint}>
      <div className={`${wrap} flex flex-col gap-12 py-16 md:py-24`}>
        <div className="flex flex-col gap-6">
          <h2 className={h2}>El concepto</h2>
          <p className="max-w-[900px] text-[22px] leading-8 font-light tracking-tight text-pretty md:text-[32px] md:leading-10">
            {idea}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-3xl bg-white p-6">
            <h3 className="text-[13px] text-muted">Para quién</h3>
            <p className="text-base leading-6 text-pretty">{publico}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl bg-white p-6">
            <h3 className="text-[13px] text-muted">Tono</h3>
            <ul className="flex flex-wrap gap-2">
              {tono.map((t) => (
                <li key={t} className="rounded-full border border-line px-3.5 py-1.5 text-sm">{t}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl bg-white p-6">
            <h3 className="text-[13px] text-muted">Paleta</h3>
            <ul className="flex gap-2">
              {paleta.map((c) => (
                <li key={c} className="flex flex-1 flex-col gap-2">
                  <span className="h-14 rounded-xl border border-black/5" style={{ background: c }} />
                  <span className="font-mono text-[11px] text-muted uppercase">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Piezas({ piezas }: { piezas: Pieza[] }) {
  const grupos = (Object.keys(formatos) as Formato[])
    .map((f) => ({ formato: f, items: piezas.filter((x) => x.formato === f) }))
    .filter((g) => g.items.length);
  return (
    <section className={`${wrap} flex flex-col gap-12 py-16 md:py-24`}>
      <div className="flex flex-col gap-3">
        <h2 className={h2}>Las piezas</h2>
        <p className="max-w-[640px] text-base leading-6 text-body text-pretty">
          Una muestra de cómo se vería la campaña. Todo se genera con IA; en la versión final partimos de fotos reales de tus productos.
        </p>
      </div>
      {grupos.map(({ formato, items }) => {
        const f = formatos[formato];
        return (
          <div key={formato} className="flex flex-col gap-4">
            <h3 className="flex items-center gap-3 text-sm font-medium">
              {formato}
              <span className="text-muted">{items.length}</span>
            </h3>
            <ul className={`grid gap-3 md:gap-4 ${f.grid}`}>
              {items.map((x) => (
                <li key={x.src + x.titulo} className="flex flex-col gap-2">
                  <div className={`relative overflow-hidden rounded-2xl bg-well ${f.aspect}`}>
                    {x.video ? (
                      <video src={x.video} poster={x.src} muted loop playsInline autoPlay aria-label={x.alt} className="size-full object-cover" />
                    ) : (
                      <Image src={x.src} alt={x.alt} fill sizes={f.sizes} className="object-cover" />
                    )}
                  </div>
                  <p className="text-[13px] leading-5 text-body">{x.titulo}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

function Paquetes({ p }: { p: Propuesta }) {
  return (
    <section id="paquetes" className="bg-well">
      <div className={`${wrap} flex flex-col gap-10 py-16 md:py-24`}>
        <div className="flex flex-col gap-3">
          <h2 className={h2}>Entregables y precio</h2>
          <p className="max-w-[640px] text-base leading-6 text-body">
            Elige un paquete. Al aceptar se abre WhatsApp con tu elección y acordamos la fecha de arranque.
          </p>
        </div>
        <ul className="grid gap-4 lg:grid-cols-3">
          {p.paquetes.map((q) => {
            const texto = `Hola Antonio, quiero aceptar el paquete ${q.nombre} de la propuesta "${p.campana}" para ${p.cliente}.`;
            const dark = q.destacado;
            return (
              <li
                key={q.nombre}
                className={`flex flex-col gap-6 rounded-3xl p-6 md:p-8 ${dark ? "bg-(--marca) text-white" : "bg-white"}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl tracking-tight">{q.nombre}</h3>
                  {dark && <span className="rounded-full bg-white/20 px-3 py-1 text-[13px]">Recomendado</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[40px] leading-11 font-light tracking-[-0.03em]">{mxn(q.precio)}</p>
                  <p className={`text-sm ${dark ? "text-white/80" : "text-muted"}`}>Entrega: {q.entrega}</p>
                </div>
                <ul className="flex flex-1 flex-col gap-3">
                  {q.incluye.map((i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-6">
                      <Check className={`mt-1 size-4 shrink-0 ${dark ? "" : "text-(--marca)"}`} />
                      {i}
                    </li>
                  ))}
                </ul>
                <Aceptar
                  id={p.id}
                  paquete={q.nombre}
                  href={`${profile.contact.whatsapp}?text=${encodeURIComponent(texto)}`}
                  className={`flex h-[52px] items-center justify-center gap-2 rounded-full text-[15px] font-medium ${
                    dark ? "bg-white text-ink hover:bg-white/90" : "bg-ink text-paper hover:bg-black"
                  }`}
                >
                  Aceptar por WhatsApp
                  <ArrowUpRight />
                </Aceptar>
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col gap-2 text-sm leading-6 text-body">
          {p.notas.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
