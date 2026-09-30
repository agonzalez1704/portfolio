import type { Propuesta } from "./index.ts";

// Propuesta de ejemplo con una marca ficticia. Las imágenes salen de Auto-Toon.
const blob = "https://z80omanx1ikasay2.public.blob.vercel-storage.com/propuestas/demo-casa-lino-21821102b0";
const img = {
  cafe: `${blob}/pose-lifestyle-pxEf1b4PN7O3ICTVxBfFyMITjgiVwA.jpg`,
  camino: `${blob}/pose-walking-38ATSqeZBsQTFtajHWgEnhBCFoncju.jpg`,
  saco: `${blob}/style-lookbook-7IcBqvpMA2KXZjezJQvCwDqsAFDEKq.jpg`,
  arena: `${blob}/style-minimalist-OIaPwix6G0fMDWJyciFysEtB2uSpYo.jpg`,
  calle: `${blob}/style-street-0q5r3HrTyqmkN3E7UOgX0U5WJsS4Fw.jpg`,
  finde: `${blob}/style-lifestyle-Ekmh5orTorvcsAdOMf7ovyGtUZTBA6.jpg`,
  tienda: `${blob}/style-ecommerce-M2L8Oxel0nmJ6mDA2nXSXZOBITgN39.jpg`,
  noche: `${blob}/style-editorial-mkD2YETVs0ZJEzKcRK0dXOAjwfi6Wk.jpg`,
};

export const demoCasaLino: Propuesta = {
  id: "demo-casa-lino-21821102b0",
  numero: "001",
  cliente: "Casa Lino",
  campana: "Otoño en la ciudad",
  temporada: "Campaña otoño 2026",
  resumen: "Una campaña de fotos y video para Casa Lino, hecha con IA a partir de sus prendas reales.",
  fecha: "2026-09-30",
  vigencia: "2026-10-31",
  color: "#9e4418",
  portada: { src: img.cafe, alt: "Modelo en una terraza con blusa marfil y bolso color camello" },
  concepto: {
    frase: ["Un día completo en la ciudad, contado en", "ocho momentos."],
    idea: "La ropa de Casa Lino acompaña el día entero: café por la mañana, oficina, calle y cena. Cada pieza de la campaña es un momento de ese día, con la misma luz cálida de otoño.",
    publico: "Mujeres y hombres de 25 a 40 años en ciudades de México que compran por Instagram y buscan prendas que duren más de una temporada.",
    tono: ["Cálido", "Urbano", "Sin prisa", "Hecho para durar"],
    paleta: [
      { nombre: "Terracota", hex: "#B4531F" },
      { nombre: "Lino", hex: "#E9DCC9" },
      { nombre: "Carbón", hex: "#3B3A36" },
      { nombre: "Hueso", hex: "#FBF8F3" },
    ],
    moodboard: [
      { src: img.saco, alt: "Modelo con saco beige en una sala con luz natural", nota: "Luz de mañana" },
      { src: img.arena, alt: "Suéter y falda en tono arena sobre fondo liso", nota: "Texturas naturales" },
      { src: img.calle, alt: "Chamarra de piel cruzando una calle de ciudad", nota: "Ciudad en movimiento" },
    ],
  },
  perfil: { usuario: "casalino", iniciales: "CL", bio: "Ropa hecha para durar", sello: "Otoño" },
  piezas: [
    { formato: "Historia 9:16", src: img.cafe, alt: "Modelo sonriendo en una terraza con bolso camello", titulo: "8:00, café" },
    { formato: "Historia 9:16", src: img.camino, alt: "Hombre con traje azul marino cruzando una plaza con bolso verde olivo", titulo: "9:30, camino a la oficina" },
    { formato: "Feed 4:5", src: img.saco, alt: "Modelo con saco beige y jeans en una sala con luz natural", titulo: "Saco Lino, beige" },
    { formato: "Feed 4:5", src: img.arena, alt: "Modelo con suéter y falda en tono arena sobre fondo liso", titulo: "Conjunto arena" },
    { formato: "Feed 4:5", src: img.calle, alt: "Modelo con chamarra de piel cruzando una calle de ciudad", titulo: "Calle" },
    { formato: "Feed 4:5", src: img.finde, alt: "Modelo con shorts de mezclilla en un andador junto al mar", titulo: "Fin de semana" },
    { formato: "Cuadrado 1:1", src: img.tienda, alt: "Modelo con blazer marfil y pantalón gris sobre fondo blanco", titulo: "Ficha de tienda" },
    { formato: "Cuadrado 1:1", src: img.noche, alt: "Modelo con vestido negro y blanco en una escalera de piedra", titulo: "Noche" },
  ],
  paquetes: [
    {
      nombre: "Arranque",
      precio: 18000,
      entrega: "Entrega en 7 días hábiles",
      incluye: ["12 imágenes para feed 4:5", "6 historias 9:16", "Una ronda de cambios", "Archivos en alta resolución"],
    },
    {
      nombre: "Campaña",
      precio: 38000,
      entrega: "Entrega en 10 días hábiles",
      incluye: [
        "24 imágenes para feed 4:5",
        "12 historias 9:16",
        "20 fotos de producto para tienda en línea",
        "4 videos cortos de 6 a 10 segundos",
        "Dos rondas de cambios",
      ],
      destacado: true,
    },
    {
      nombre: "Temporada",
      precio: 65000,
      entrega: "Por entregas durante 4 semanas",
      incluye: [
        "Todo lo del paquete Campaña",
        "Variantes para anuncios en 1:1, 4:5 y 9:16",
        "Modelos consistentes en todas las piezas",
        "Entrega semanal durante un mes",
      ],
    },
  ],
  notas: [
    "Precios en pesos mexicanos, más IVA.",
    "Anticipo del 50% para arrancar y 50% contra entrega.",
    "Nada sale publicado sin tu aprobación.",
  ],
  cierre: { src: img.noche, alt: "Modelo con vestido negro y blanco en una escalera de piedra" },
};
