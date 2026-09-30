// Sube las imágenes y videos de una propuesta a Vercel Blob e imprime sus URLs.
// Uso: pnpm propuesta:subir <id-de-la-propuesta> <carpeta>
import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { put } from "@vercel/blob";

const [id, dir] = process.argv.slice(2);
if (!id || !dir) {
  console.error("Uso: pnpm propuesta:subir <id-de-la-propuesta> <carpeta>");
  process.exit(1);
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Falta BLOB_READ_WRITE_TOKEN. Corre `vercel env pull .env.local`.");
  process.exit(1);
}

const media = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".mp4", ".webm"]);
const files = (await readdir(dir)).filter((f) => media.has(extname(f).toLowerCase())).sort();

for (const file of files) {
  // The random suffix keeps the URLs of a secret proposal unguessable.
  const { url } = await put(`propuestas/${id}/${file}`, await readFile(join(dir, file)), {
    access: "public",
    addRandomSuffix: true,
  });
  console.log(`${file}\t${url}`);
}
