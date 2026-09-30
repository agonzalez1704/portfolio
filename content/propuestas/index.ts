import { demoCasaLino } from "./demo-casa-lino.ts";

export type Formato = "Historia 9:16" | "Feed 4:5" | "Cuadrado 1:1" | "Horizontal 16:9";

export type Img = { src: string; alt: string };

export type Pieza = Img & {
  formato: Formato;
  titulo: string;
  video?: string; // con video, src es el póster
};

export type Paquete = {
  nombre: string;
  precio: number; // MXN, sin IVA
  entrega: string; // "Entrega en 7 días hábiles"
  incluye: string[];
  destacado?: boolean;
};

export type Propuesta = {
  // El id es el enlace secreto: /propuesta/<id>. Siempre con sufijo aleatorio.
  id: string;
  numero: string; // "001"
  cliente: string;
  campana: string; // la primera palabra va en cursiva grande en la portada
  temporada: string; // "Campaña otoño 2026"
  resumen: string; // una frase bajo el título
  fecha: string; // ISO, yyyy-mm-dd
  vigencia: string; // ISO, yyyy-mm-dd
  color: string; // acento: texto sobre papel y fondo de botones con texto blanco
  portada: Img; // si coincide con una pieza, la portada cuenta como la pieza 01
  concepto: {
    frase: [string, string]; // la segunda parte va en cursiva y en color
    idea: string;
    publico: string;
    tono: string[];
    paleta: { nombre: string; hex: string }[];
    moodboard: [Img & { nota: string }, Img & { nota: string }, Img & { nota: string }];
  };
  perfil: { usuario: string; iniciales: string; bio: string; sello: string };
  piezas: Pieza[];
  paquetes: Paquete[];
  notas: string[];
  cierre: Img;
};

export const propuestas: Propuesta[] = [demoCasaLino];

export function getPropuesta(id: string) {
  return propuestas.find((p) => p.id === id);
}
