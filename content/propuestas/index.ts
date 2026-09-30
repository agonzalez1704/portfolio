import { demoCasaLino } from "./demo-casa-lino.ts";

export type Formato = "Feed 4:5" | "Historia 9:16" | "Cuadrado 1:1" | "Horizontal 16:9";

export type Pieza = {
  formato: Formato;
  src: string; // imagen, o póster si hay video
  video?: string;
  alt: string;
  titulo: string;
};

export type Paquete = {
  nombre: string;
  precio: number; // MXN, sin IVA
  entrega: string;
  incluye: string[];
  destacado?: boolean;
};

export type Propuesta = {
  // El id es el enlace secreto: /propuesta/<id>. Siempre con sufijo aleatorio.
  id: string;
  cliente: string;
  campana: string;
  resumen: string; // una frase bajo el título
  fecha: string; // ISO, yyyy-mm-dd
  vigencia: string; // ISO, yyyy-mm-dd
  color: string; // color de la marca, hex
  portada: { src: string; alt: string };
  concepto: { idea: string; publico: string; tono: string[]; paleta: string[] };
  piezas: Pieza[];
  paquetes: Paquete[];
  notas: string[];
};

export const propuestas: Propuesta[] = [demoCasaLino];

export function getPropuesta(id: string) {
  return propuestas.find((p) => p.id === id);
}
