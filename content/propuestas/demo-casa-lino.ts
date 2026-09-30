import type { Propuesta } from "./index.ts";

// Propuesta de ejemplo con una marca ficticia. Las imágenes salen de Auto-Toon.
const blob = "https://z80omanx1ikasay2.public.blob.vercel-storage.com/propuestas/demo-casa-lino-21821102b0";

export const demoCasaLino: Propuesta = {
  id: "demo-casa-lino-21821102b0",
  cliente: "Casa Lino",
  campana: "Otoño en la ciudad",
  resumen: "Una campaña de fotos y video para Casa Lino, hecha con IA a partir de tus prendas reales.",
  fecha: "2026-09-30",
  vigencia: "2026-10-31",
  color: "#b4531f",
  portada: {
    src: `${blob}/pose-lifestyle-pxEf1b4PN7O3ICTVxBfFyMITjgiVwA.jpg`,
    alt: "Modelo en una terraza con blusa marfil y bolso color camello",
  },
  concepto: {
    idea: "La ropa de Casa Lino acompaña el día completo en la ciudad: café por la mañana, oficina, calle y cena. Cada pieza de la campaña es un momento de ese día, con la misma luz cálida de otoño.",
    publico: "Mujeres y hombres de 25 a 40 años en ciudades de México que compran por Instagram y buscan prendas que duren más de una temporada.",
    tono: ["Cálido", "Urbano", "Sin prisa", "Hecho para durar"],
    paleta: ["#b4531f", "#e9dcc9", "#3b3a36", "#f6f1ea"],
  },
  piezas: [
    { formato: "Historia 9:16", src: `${blob}/pose-lifestyle-pxEf1b4PN7O3ICTVxBfFyMITjgiVwA.jpg`, alt: "Modelo sonriendo en una terraza con bolso camello", titulo: "8:00, café" },
    { formato: "Historia 9:16", src: `${blob}/pose-walking-38ATSqeZBsQTFtajHWgEnhBCFoncju.jpg`, alt: "Hombre con traje azul marino cruzando una plaza con bolso verde olivo", titulo: "9:30, camino a la oficina" },
    { formato: "Feed 4:5", src: `${blob}/style-lookbook-7IcBqvpMA2KXZjezJQvCwDqsAFDEKq.jpg`, alt: "Modelo con saco beige y jeans en una sala con luz natural", titulo: "Saco Lino, beige" },
    { formato: "Feed 4:5", src: `${blob}/style-minimalist-OIaPwix6G0fMDWJyciFysEtB2uSpYo.jpg`, alt: "Modelo con suéter y falda en tono arena sobre fondo liso", titulo: "Conjunto arena" },
    { formato: "Feed 4:5", src: `${blob}/style-street-0q5r3HrTyqmkN3E7UOgX0U5WJsS4Fw.jpg`, alt: "Modelo con chamarra de piel cruzando una calle de ciudad", titulo: "Chamarra de piel, calle" },
    { formato: "Feed 4:5", src: `${blob}/style-lifestyle-Ekmh5orTorvcsAdOMf7ovyGtUZTBA6.jpg`, alt: "Modelo con shorts de mezclilla en un andador junto al mar", titulo: "Fin de semana" },
    { formato: "Cuadrado 1:1", src: `${blob}/style-ecommerce-M2L8Oxel0nmJ6mDA2nXSXZOBITgN39.jpg`, alt: "Modelo con blazer marfil y pantalón gris sobre fondo blanco", titulo: "Ficha de tienda, blazer marfil" },
    { formato: "Cuadrado 1:1", src: `${blob}/style-editorial-mkD2YETVs0ZJEzKcRK0dXOAjwfi6Wk.jpg`, alt: "Modelo con vestido negro y blanco en una escalera de piedra", titulo: "Pieza editorial, noche" },
  ],
  paquetes: [
    {
      nombre: "Arranque",
      precio: 18000,
      entrega: "7 días hábiles",
      incluye: ["12 imágenes para feed 4:5", "6 historias 9:16", "Una ronda de cambios", "Archivos en alta resolución"],
    },
    {
      nombre: "Campaña",
      precio: 38000,
      entrega: "10 días hábiles",
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
      entrega: "Por entregas, 4 semanas",
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
    "Las piezas se generan con fotos reales de tus prendas. Nada sale publicado sin tu aprobación.",
  ],
};
