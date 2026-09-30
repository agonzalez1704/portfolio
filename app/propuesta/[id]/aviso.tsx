"use client";

import { useEffect } from "react";

const YO = "propuestas:yo";

function avisar(id: string, evento: "abrio" | "acepto", paquete?: string) {
  try {
    // Abre tu propia propuesta una vez con ?yo para no recibir avisos de tus visitas.
    if (new URLSearchParams(location.search).has("yo")) localStorage.setItem(YO, "1");
    if (localStorage.getItem(YO)) return;
    if (evento === "abrio") {
      if (sessionStorage.getItem(`vista:${id}`)) return;
      sessionStorage.setItem(`vista:${id}`, "1");
    }
  } catch {}
  navigator.sendBeacon("/api/propuesta", JSON.stringify({ id, evento, paquete }));
}

export function AvisoApertura({ id }: { id: string }) {
  useEffect(() => {
    avisar(id, "abrio");
  }, [id]);
  return null;
}

export function Aceptar({ id, paquete, href, className, children }: {
  id: string;
  paquete: string;
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener" onClick={() => avisar(id, "acepto", paquete)} className={className}>
      {children}
    </a>
  );
}
