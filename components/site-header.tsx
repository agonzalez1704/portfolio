import Link from "next/link";
import { profile } from "@/content/profile";
import { ArrowUpRight, Menu } from "./icons";

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function Monogram({ className = "size-8 text-xs" }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full bg-ink font-semibold tracking-wide text-paper ${className}`}
    >
      AG
    </span>
  );
}

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 md:h-[88px] md:px-12 xl:px-24">
      <Link href="/" className="flex items-center gap-3 text-[15px] font-medium">
        <Monogram />
        {profile.shortName}
      </Link>
      <nav aria-label="Main" className="hidden items-center gap-10 text-sm md:flex">
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={n.label === active ? "font-medium text-ink" : "text-muted hover:text-ink"}
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/#contact"
        className="hidden h-11 items-center gap-1.5 text-sm font-medium underline underline-offset-4 md:flex"
      >
        Get in touch
        <ArrowUpRight />
      </Link>
      {/* Native disclosure: no client JS for the phone menu. */}
      <details className="group relative md:hidden">
        <summary
          aria-label="Open menu"
          className="flex size-12 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
        >
          <Menu className="size-5.5" />
        </summary>
        <nav
          aria-label="Main"
          className="absolute right-0 z-20 mt-2 flex w-56 flex-col rounded-2xl bg-white p-2 shadow-[0_12px_40px_rgb(34_34_34/0.12)]"
        >
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="flex h-11 items-center rounded-xl px-4 text-[15px] hover:bg-paper">
              {n.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
