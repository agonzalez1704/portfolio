import { createElement } from "react";
import { iconFor } from "@/lib/tech-icons";

export function TechIcon({ label, className = "size-3.5 shrink-0" }: { label: string; className?: string }) {
  const glyph = iconFor(label);
  if ("path" in glyph) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d={glyph.path} />
      </svg>
    );
  }
  // The icon comes from a static lookup table, not created per render.
  return createElement(glyph, { "aria-hidden": true, className });
}

export function TechChip({ label, className = "bg-paper" }: { label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] leading-5 ${className}`}>
      <TechIcon label={label} />
      {label}
    </span>
  );
}
