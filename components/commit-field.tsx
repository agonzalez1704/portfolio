"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type CommitProduct = { slug: string; name: string; total: number; ai: number; seq: string; color: string };

// Agent commits take their product's colour; commits by hand stay grey in every tower.
const colors: Record<string, string> = {
  "calzado-blade": "#6e56cf",
  "auto-toon": "#e5484d",
  fiable: "#12a594",
  "grupo-barro-y-cantera": "#d9822b",
};

// three.js only downloads once the section is near the viewport.
const CommitScene = dynamic(() => import("./commit-scene"), { ssr: false });

const pct = (p: { ai: number; total: number }) => Math.round((p.ai / p.total) * 100);

export function CommitField({ products: data }: { products: Omit<CommitProduct, "color">[] }) {
  const products = data.map((p) => ({ ...p, color: colors[p.slug] }));
  const section = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const total = products.reduce((s, p) => s + p.total, 0);
  const ai = products.reduce((s, p) => s + p.ai, 0);

  useEffect(() => {
    const el = section.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        setActive(e.isIntersecting);
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={section} aria-labelledby="commits-title" className="relative h-[260vh] motion-reduce:h-auto">
      <div className="sticky top-0 mx-auto flex h-svh w-full max-w-[1440px] flex-col px-5 py-10 md:px-12 md:py-14 xl:px-24">
        <div className="relative z-10 flex max-w-[520px] flex-col gap-4">
          <h2 id="commits-title" className="text-[32px] leading-9 tracking-[-0.03em] md:text-[40px] md:leading-11">
            {total.toLocaleString("en-US")} commits, one dot each
          </h2>
          <p className="text-[15px] leading-6 text-body text-pretty md:text-base md:leading-[26px]">
            {ai.toLocaleString("en-US")} of them were written with an AI agent and reviewed by me before they merged.
            Scroll to sort them into the products they built, oldest at the bottom.
          </p>
          <ul className="flex gap-6 text-[13px] text-muted">
            <li className="flex items-center gap-2">
              <span className="flex">
                {products.map((p) => (
                  <span key={p.slug} className="-mr-1 size-2.5 rounded-full ring-2 ring-paper" style={{ background: p.color }} />
                ))}
              </span>
              <span className="ml-1">With an agent, by product</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#b4b4b4]" />
              By hand
            </li>
          </ul>
        </div>
        <div className="relative min-h-0 flex-1">
          <div className="absolute inset-0">
            {near && <CommitScene products={products} section={section} active={active} />}
          </div>
        </div>
        <ul className="grid grid-cols-4 border-t border-rule pt-4">
          {products.map((p) => (
            <li key={p.slug} className="text-center">
              <Link href={`/work/${p.slug}`} prefetch={true} className="group inline-flex flex-col gap-0.5 py-1">
                <span className="flex items-center justify-center gap-2 text-sm font-medium md:text-base">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                  <span className="underline-offset-4 group-hover:underline">{p.name}</span>
                </span>
                <span className="text-xs text-muted md:text-[13px]">
                  {pct(p)}% agent · {p.total.toLocaleString("en-US")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
