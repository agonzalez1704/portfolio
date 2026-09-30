import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight } from "@/components/icons";
import { profile } from "@/content/profile";
import { getPropuesta, propuestas, type Formato, type Img, type Pieza, type Propuesta } from "@/content/propuestas";
import { Aceptar, AvisoApertura } from "./aviso";

const bodoni = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-bodoni-moda" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken-grotesk" });

const pad = "px-5 md:px-12 xl:px-20";
const grid = "grid grid-cols-1 gap-x-6 lg:grid-cols-12";
const label = "text-[11px] font-medium tracking-[0.16em] uppercase";
const lead = "font-bodoni text-[32px] leading-10 tracking-[-0.015em] text-balance md:text-[44px] md:leading-[52px]";

const aspecto: Record<Formato, string> = {
  "Historia 9:16": "aspect-[9/16]",
  "Feed 4:5": "aspect-[4/5]",
  "Cuadrado 1:1": "aspect-square",
  "Horizontal 16:9": "aspect-video",
};

const pasos = [
  ["Me mandas tus prendas", "Fotos con tu celular, sobre cualquier fondo. Con eso basta para empezar."],
  ["Definimos la dirección", "Modelos, locaciones y luz. Te enseño pruebas antes de producir todo."],
  ["Producción", "Genero las piezas del paquete con la misma dirección de arte en todas."],
  ["Revisión y entrega", "Ajustamos en las rondas incluidas y te entrego los archivos listos para publicar."],
];

const capitulos = [
  ["concepto", "Concepto"],
  ["piezas", "Piezas"],
  ["feed", "En tu feed"],
  ["proceso", "Proceso"],
  ["inversion", "Inversión"],
];

const fecha = (iso: string, month: "long" | "short" = "long") =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-MX", { day: "numeric", month, year: "numeric" }).replace(".", "");
const precio = (n: number) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
const dos = (n: number) => String(n).padStart(2, "0");
const numeros = ["Cero", "Una", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez", "Once", "Doce"];
const cuantas = (n: number) => numeros[n] ?? String(n);

export function generateStaticParams() {
  return propuestas.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/propuesta/[id]">): Promise<Metadata> {
  const p = getPropuesta((await params).id);
  if (!p) return {};
  return {
    title: `${p.campana} · Propuesta para ${p.cliente}`,
    description: p.resumen,
    robots: { index: false, follow: false },
    openGraph: { images: [{ url: p.portada.src, alt: p.portada.alt }] },
  };
}

export default async function PropuestaPage({ params }: PageProps<"/propuesta/[id]">) {
  const p = getPropuesta((await params).id);
  if (!p) notFound();

  return (
    <div
      lang="es"
      style={{ "--marca": p.color } as CSSProperties}
      className={`${bodoni.variable} ${hanken.variable} flex flex-1 flex-col bg-crema font-hanken text-espresso`}
    >
      <AvisoApertura id={p.id} />
      <main>
        <Portada p={p} />
        <nav
          aria-label="Contenido"
          className={`${pad} flex gap-10 overflow-x-auto border-y border-filo lg:grid lg:grid-cols-5 lg:gap-6`}
        >
          {capitulos.map(([id, nombre], i) => (
            <a key={id} href={`#${id}`} className="flex h-16 shrink-0 items-center gap-3 text-[13px] tracking-[0.14em] uppercase hover:text-(--marca) lg:h-24">
              <span className="font-bodoni text-lg tracking-normal text-(--marca) italic">{dos(i + 1)}</span>
              {nombre}
            </a>
          ))}
        </nav>
        <Concepto p={p} />
        <Piezas p={p} />
        <Feed p={p} />
        <Proceso />
        <Inversion p={p} />
      </main>
      <Cierre p={p} />
    </div>
  );
}

function Capitulo({ n, titulo, claro }: { n: string; titulo: string; claro?: boolean }) {
  return (
    <div className="flex flex-col gap-3 lg:col-span-4 lg:gap-4">
      <span
        className={`font-bodoni text-[120px] leading-[96px] italic lg:text-[200px] lg:leading-[160px] ${
          claro ? "text-[color-mix(in_oklab,var(--marca)_55%,var(--color-crema))]" : "text-(--marca)"
        }`}
      >
        {n}
      </span>
      <h2 className={`${label} text-xs ${claro ? "text-filo" : ""}`}>{titulo}</h2>
    </div>
  );
}

function Portada({ p }: { p: Propuesta }) {
  const [primera, ...resto] = p.campana.split(" ");
  const i = p.piezas.findIndex((x) => x.src === p.portada.src);
  return (
    <section className="flex flex-col lg:grid lg:h-[920px] lg:grid-cols-[minmax(0,640px)_1fr]">
      <div className={`${pad} flex flex-col gap-12 pt-6 pb-10 lg:justify-between lg:gap-0 lg:pt-10 lg:pr-16 lg:pb-12`}>
        <div className="flex items-center justify-between gap-4">
          <span className="font-bodoni text-lg tracking-[0.32em] uppercase lg:text-xl">{p.cliente}</span>
          <span className={`${label} text-taupe`}>Propuesta Nº {p.numero}</span>
        </div>
        <div className="flex flex-col gap-7 lg:gap-8">
          <p className={`${label} text-taupe`}>{p.temporada} · Contenido generado con IA</p>
          <h1 className="flex flex-col font-bodoni font-normal">
            <span className="-ml-1 text-[104px] leading-[96px] tracking-[-0.03em] text-(--marca) italic md:text-[144px] md:leading-[132px] lg:-ml-2 lg:text-[184px] lg:leading-[164px]">
              {primera}
            </span>
            <span className="text-[52px] leading-[56px] tracking-[-0.02em] md:text-[72px] md:leading-[76px] lg:text-[88px] lg:leading-[92px]">
              {resto.join(" ")}
            </span>
          </h1>
          <p className="max-w-[440px] text-[17px] leading-7 text-cafe text-pretty lg:text-[19px] lg:leading-[30px]">{p.resumen}</p>
          <a
            href="#inversion"
            className="flex h-13 items-center gap-2.5 self-start rounded-full bg-(--marca) px-6 text-[15px] font-medium text-white hover:opacity-90 lg:hidden"
          >
            Ver inversión
            <ArrowDown />
          </a>
        </div>
        <dl className="grid grid-cols-3 gap-4 lg:gap-6">
          <Dato label="Para" value={p.cliente} />
          <Dato label="Por" value={profile.shortName} />
          <Dato label="Vigente hasta" value={fecha(p.vigencia, "short")} />
        </dl>
      </div>
      <figure className="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
        <Image src={p.portada.src} alt={p.portada.alt} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
        {i >= 0 && (
          <figcaption className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-[rgb(20_18_16/0.55)] px-4 py-2.5 text-[13px] text-crema backdrop-blur-md lg:bottom-8 lg:left-8">
            <span className="font-bodoni text-[15px] italic">{dos(i + 1)}</span>
            {p.piezas[i].titulo} · {p.piezas[i].formato}
          </figcaption>
        )}
        <span className="absolute top-6 right-4 text-[11px] tracking-[0.32em] text-white uppercase [writing-mode:vertical-rl] lg:top-10 lg:right-7">
          {p.temporada}
        </span>
      </figure>
    </section>
  );
}

function Dato({ label: l, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-espresso pt-4">
      <dt className={`${label} text-taupe`}>{l}</dt>
      <dd className="text-[15px] leading-[22px]">{value}</dd>
    </div>
  );
}

function Concepto({ p }: { p: Propuesta }) {
  const { frase, idea, publico, tono, paleta, moodboard } = p.concepto;
  const [a, b, c] = moodboard;
  return (
    <section id="concepto" className={`${pad} ${grid} gap-y-16 py-20 lg:gap-y-24 lg:py-30`}>
      <Capitulo n="01" titulo="El concepto" />
      <div className="flex flex-col gap-8 lg:col-span-7 lg:col-start-6">
        <p className="font-bodoni text-[34px] leading-[42px] tracking-[-0.015em] text-balance lg:text-[52px] lg:leading-[60px]">
          {frase[0]} <em className="text-(--marca)">{frase[1]}</em>
        </p>
        <p className="max-w-[560px] text-[17px] leading-7 text-cafe text-pretty lg:text-lg lg:leading-[30px]">{idea}</p>
      </div>

      <div className="grid grid-cols-2 items-start gap-x-3 gap-y-8 lg:col-span-12 lg:grid-cols-12 lg:gap-x-6">
        <Foto img={a} aspect="aspect-[4/5]" className="col-span-2 lg:col-span-4" sizes="(min-width: 1024px) 30vw, 100vw" />
        <Foto img={b} aspect="aspect-[3/4]" className="lg:col-span-3 lg:mt-[150px]" sizes="(min-width: 1024px) 22vw, 50vw" />
        <Foto img={c} aspect="aspect-[26/27]" className="mt-16 lg:col-span-5 lg:mt-10" sizes="(min-width: 1024px) 38vw, 50vw" />
      </div>

      <div className="grid gap-12 md:grid-cols-3 md:gap-6 lg:col-span-12">
        <div className="flex flex-col gap-4 border-t border-espresso pt-6">
          <h3 className={`${label} text-taupe`}>Para quién</h3>
          <p className="text-[17px] leading-7 text-pretty">{publico}</p>
        </div>
        <div className="flex flex-col gap-4 border-t border-espresso pt-6">
          <h3 className={`${label} text-taupe`}>Tono</h3>
          <ul className="font-bodoni text-[30px] leading-[38px] italic">
            {tono.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 border-t border-espresso pt-6">
          <h3 className={`${label} text-taupe`}>Paleta</h3>
          <ul className="grid grid-cols-4 gap-2">
            {paleta.map((c) => (
              <li key={c.hex} className="flex flex-col gap-2.5">
                <span className="h-[132px] shadow-[inset_0_0_0_1px_rgb(28_25_22/0.08)]" style={{ background: c.hex }} />
                <span className="text-xs leading-4">
                  {c.nombre}
                  <br />
                  <span className="text-taupe uppercase">{c.hex}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Foto({ img, aspect, className, sizes }: { img: Img & { nota: string }; aspect: string; className: string; sizes: string }) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className={`relative overflow-hidden bg-crema-honda ${aspect}`}>
        <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover" />
      </div>
      <figcaption className="font-bodoni text-[17px] text-taupe italic">{img.nota}</figcaption>
    </figure>
  );
}

// Staggered like a magazine spread: three wide columns, then rows of four.
const desfase = ["", "lg:mt-40", "lg:mt-[60px]"];
function Piezas({ p }: { p: Propuesta }) {
  const galeria = p.piezas.map((x, i) => ({ ...x, n: i + 1 })).filter((x) => x.src !== p.portada.src);
  return (
    <section id="piezas" className={`${pad} ${grid} gap-y-16 bg-crema-honda py-20 lg:gap-y-20 lg:py-30`}>
      <Capitulo n="02" titulo="Las piezas" />
      <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
        <p className={lead}>
          {cuantas(p.piezas.length)} imágenes, un mismo día. Cada una lista para publicarse.
        </p>
        <p className="max-w-[520px] text-base leading-[26px] text-cafe">
          Muestra generada con IA para esta propuesta. En la campaña final partimos de fotos reales de tus productos.
        </p>
      </div>
      <ul className="grid grid-cols-2 items-start gap-x-3 gap-y-10 lg:col-span-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-20">
        {galeria.map((x, i) => (
          <li
            key={x.src + x.titulo}
            className={`${i % 2 ? "max-lg:mt-12" : ""} ${
              i < 3 ? `lg:col-span-4 ${desfase[i]}` : `lg:col-span-3 ${(i - 3) % 2 ? "lg:mt-20" : ""}`
            }`}
          >
            <PiezaFig x={x} n={x.n} grande={i < 3} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function PiezaFig({ x, n, grande }: { x: Pieza; n: number; grande: boolean }) {
  return (
    <figure className="flex flex-col gap-3.5">
      <div className={`relative overflow-hidden bg-crema ${aspecto[x.formato]}`}>
        {x.video ? (
          <video src={x.video} poster={x.src} muted loop playsInline autoPlay aria-label={x.alt} className="size-full object-cover" />
        ) : (
          <Image src={x.src} alt={x.alt} fill sizes={grande ? "(min-width: 1024px) 30vw, 50vw" : "(min-width: 1024px) 22vw, 50vw"} className="object-cover" />
        )}
      </div>
      <figcaption className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:justify-between lg:gap-3">
        <span className={`font-bodoni italic ${grande ? "text-lg lg:text-xl" : "text-lg"}`}>{x.titulo}</span>
        <span className={`${label} shrink-0 font-normal text-taupe`}>
          {dos(n)} · {x.formato.split(" ")[1]}
        </span>
      </figcaption>
    </figure>
  );
}

function Feed({ p }: { p: Propuesta }) {
  const { usuario, iniciales, bio, sello } = p.perfil;
  const tiles = p.piezas.slice(0, 8);
  const historia = p.piezas.find((x) => x.formato === "Historia 9:16" && x.src !== p.portada.src) ?? p.piezas[0];
  const tile = (x: Pieza) => (
    <div key={x.src + x.titulo} className="relative aspect-[4/5]">
      <Image src={x.src} alt="" fill sizes="120px" className="object-cover" />
    </div>
  );
  return (
    <section id="feed" className={`${pad} ${grid} items-center gap-y-16 bg-espresso py-20 text-crema lg:py-30`}>
      <div className="flex flex-col gap-8 lg:col-span-5">
        <Capitulo n="03" titulo="En tu feed" claro />
        <p className="font-bodoni text-[34px] leading-[42px] tracking-[-0.015em] text-balance lg:text-5xl lg:leading-14">
          Así se vería tu perfil la semana del lanzamiento.
        </p>
        <p className="max-w-[440px] text-[17px] leading-7 text-filo text-pretty">
          Las piezas están pensadas para convivir en la cuadrícula: la misma luz, la misma paleta y un ritmo entre producto, calle y detalle.
        </p>
      </div>
      <div className="relative h-[640px] w-full max-w-[640px] justify-self-center lg:col-span-6 lg:col-start-7 lg:h-[820px] lg:justify-self-stretch">
        <div className="absolute top-0 left-0 w-[270px] rounded-[44px] bg-[#0b0a09] p-2 shadow-[0_40px_80px_rgb(0_0_0/0.45)] sm:left-[8%] lg:left-10 lg:w-[360px] lg:rounded-[52px] lg:p-2.5">
          <div className="flex aspect-[34/74] flex-col gap-4 overflow-hidden rounded-[36px] bg-[#fbf8f3] pt-8 text-espresso lg:rounded-[42px] lg:pt-9">
            <div className="flex items-center gap-3 px-4 lg:gap-4 lg:px-[18px]">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-(--marca) font-bodoni text-xl text-white italic lg:size-[72px] lg:text-[26px]">
                {iniciales}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5 text-xs lg:text-[13px]">
                <span className="text-sm font-semibold lg:text-[15px]">{usuario}</span>
                <span className="text-taupe">{bio}</span>
                <span className="text-(--marca)">Nueva colección: {p.campana}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-0.5 border-t border-[#e4ddd2] pt-0.5">
              {tiles.slice(0, 2).map(tile)}
              <span className="flex aspect-[4/5] items-center justify-center bg-(--marca) font-bodoni text-lg text-white italic lg:text-2xl">
                {sello}
              </span>
              {tiles.slice(2).map(tile)}
            </div>
          </div>
        </div>
        <div className="absolute top-[170px] right-0 w-[190px] rounded-[36px] bg-[#0b0a09] p-[7px] shadow-[0_40px_80px_rgb(0_0_0/0.55)] sm:right-[8%] lg:top-[150px] lg:right-auto lg:left-[330px] lg:w-[300px] lg:rounded-[46px] lg:p-[9px]">
          <div className="relative aspect-[282/602] overflow-hidden rounded-[30px] lg:rounded-[38px]">
            <Image src={historia.src} alt={`Historia de la campaña: ${historia.alt}`} fill sizes="300px" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.35),transparent_22%,transparent_70%,rgb(0_0_0/0.45))]" />
            <div className="absolute inset-x-3 top-3.5 grid grid-cols-3 gap-1">
              <span className="h-0.5 rounded bg-white" />
              <span className="h-0.5 rounded bg-white/45" />
              <span className="h-0.5 rounded bg-white/45" />
            </div>
            <span className="absolute top-7 left-3 flex items-center gap-2 text-xs font-semibold text-white lg:text-[13px]">
              <span className="flex size-6 items-center justify-center rounded-full bg-(--marca) font-bodoni text-[10px] font-normal italic lg:size-7 lg:text-xs">
                {iniciales}
              </span>
              {usuario}
            </span>
            <div className="absolute inset-x-3 bottom-5 flex flex-col items-start gap-2 lg:inset-x-4 lg:bottom-6 lg:gap-2.5">
              <span className="bg-[#fbf8f3] px-3 py-1.5 font-bodoni text-sm text-espresso italic lg:px-3.5 lg:py-2 lg:text-xl">{historia.titulo}</span>
              <span className="bg-(--marca) px-2.5 py-1 text-[10px] tracking-[0.14em] text-white uppercase lg:px-3 lg:py-1.5 lg:text-xs">
                Ver colección
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Proceso() {
  const romanos = ["i.", "ii.", "iii.", "iv."];
  return (
    <section id="proceso" className={`${pad} ${grid} gap-y-16 py-20 lg:gap-y-20 lg:py-30`}>
      <Capitulo n="04" titulo="Proceso" />
      <p className={`${lead} lg:col-span-7 lg:col-start-6`}>De una foto con tu celular a una campaña completa.</p>
      <ol className="grid gap-10 sm:grid-cols-2 sm:gap-6 lg:col-span-12 lg:grid-cols-4">
        {pasos.map(([t, d], i) => (
          <li key={t} className="flex flex-col gap-3 border-t border-espresso pt-6">
            <span className="font-bodoni text-[44px] leading-[44px] text-(--marca) italic">{romanos[i]}</span>
            <h3 className="text-xl leading-7 font-medium">{t}</h3>
            <p className="text-[15px] leading-6 text-cafe">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Inversion({ p }: { p: Propuesta }) {
  return (
    <section id="inversion" className={`${pad} ${grid} gap-y-16 bg-crema-honda py-20 lg:gap-y-20 lg:py-30`}>
      <Capitulo n="05" titulo="Inversión" />
      <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
        <p className={lead}>
          {p.paquetes.length === 1 ? "Una forma de arrancar." : `${cuantas(p.paquetes.length)} formas de arrancar.`}
        </p>
        <p className="max-w-[520px] text-base leading-[26px] text-cafe">
          Al aceptar se abre WhatsApp con tu elección y acordamos la fecha de arranque.
        </p>
      </div>
      <ul className="grid gap-6 lg:col-span-12 lg:grid-cols-3">
        {p.paquetes.map((q) => {
          const d = q.destacado;
          const texto = `Hola Antonio, quiero aceptar el paquete ${q.nombre} de la propuesta "${p.campana}" para ${p.cliente}.`;
          return (
            <li
              key={q.nombre}
              className={`flex flex-col gap-7 border-t-2 px-6 py-8 lg:px-8 lg:py-10 ${
                d ? "border-(--marca) bg-espresso text-crema" : "border-espresso bg-crema"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-bodoni text-[40px] leading-[48px] font-normal italic lg:text-[44px] lg:leading-[52px]">{q.nombre}</h3>
                {d && (
                  <span className={`${label} text-[color-mix(in_oklab,var(--marca)_55%,var(--color-crema))]`}>Recomendado</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="flex items-baseline gap-2.5">
                  <span className="text-5xl leading-[56px] font-light tracking-[-0.03em] tabular-nums lg:text-[56px] lg:leading-[60px]">
                    {precio(q.precio)}
                  </span>
                  <span className={`text-[13px] ${d ? "text-filo" : "text-taupe"}`}>MXN + IVA</span>
                </p>
                <p className={`text-sm ${d ? "text-filo" : "text-taupe"}`}>{q.entrega}</p>
              </div>
              <ul className="flex flex-1 flex-col text-[15px] leading-[22px]">
                {q.incluye.map((i) => (
                  <li key={i} className={`border-b py-3.5 ${d ? "border-crema/20" : "border-filo"}`}>
                    {i}
                  </li>
                ))}
              </ul>
              <Aceptar
                id={p.id}
                paquete={q.nombre}
                href={`${profile.contact.whatsapp}?text=${encodeURIComponent(texto)}`}
                className={`flex h-14 items-center justify-center gap-2.5 rounded-full text-[15px] font-medium ${
                  d ? "bg-(--marca) text-white hover:opacity-90" : "border border-espresso hover:bg-espresso hover:text-crema"
                }`}
              >
                Aceptar por WhatsApp
                <ArrowUpRight />
              </Aceptar>
            </li>
          );
        })}
      </ul>
      <ul className="grid gap-2 border-t border-filo pt-6 text-[13px] leading-5 text-taupe md:grid-cols-3 md:gap-6 lg:col-span-12">
        {p.notas.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </section>
  );
}

function Cierre({ p }: { p: Propuesta }) {
  const texto = `Hola Antonio, vi la propuesta "${p.campana}" para ${p.cliente} y me gustaría platicarla.`;
  return (
    <footer className="relative flex min-h-[640px] flex-col justify-end overflow-hidden bg-espresso text-white lg:min-h-[760px]">
      <Image src={p.cierre.src} alt="" fill sizes="100vw" className="object-cover object-[50%_35%]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_10_9/0.88),rgb(12_10_9/0.2)_65%,rgb(12_10_9/0.1))]" />
      <div className={`${pad} relative flex flex-col gap-10 pb-10 lg:pb-16`}>
        <p className="max-w-[980px] font-bodoni text-5xl leading-[52px] tracking-[-0.02em] text-balance md:text-7xl md:leading-[76px] lg:text-8xl lg:leading-[100px]">
          Hagamos que tu temporada <em>se vea así.</em>
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <CierreLink href={`${profile.contact.whatsapp}?text=${encodeURIComponent(texto)}`} solid>
            Platicarlo por WhatsApp
            <ArrowUpRight />
          </CierreLink>
          <CierreLink href={`mailto:${profile.contact.email}`}>{profile.contact.email}</CierreLink>
        </div>
        <div className={`${label} flex flex-col gap-2 border-t border-white/30 pt-5 font-normal text-white/80 sm:flex-row sm:justify-between`}>
          <span>
            Preparada por {profile.shortName} para {p.cliente}
          </span>
          <span>Vigente hasta el {fecha(p.vigencia)}</span>
        </div>
      </div>
    </footer>
  );
}

function CierreLink({ href, solid, children }: { href: string; solid?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      className={`flex h-14 items-center justify-center gap-2.5 rounded-full px-7 text-[15px] ${
        solid ? "bg-white font-medium text-espresso hover:bg-crema" : "border border-white/60 break-all hover:bg-white/10"
      }`}
    >
      {children}
    </a>
  );
}
