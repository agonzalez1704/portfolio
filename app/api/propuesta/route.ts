import { Resend } from "resend";
import { getPropuesta } from "@/content/propuestas";
import { vistaSchema } from "@/lib/schemas";

// Avisa por correo cuando un cliente abre su propuesta o toca "Aceptar".
export async function POST(req: Request) {
  const parsed = vistaSchema.safeParse(await req.json().catch(() => null));
  const p = parsed.success ? getPropuesta(parsed.data.id) : undefined;
  if (!parsed.success || !p) return new Response(null, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    console.error("propuesta: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return new Response(null, { status: 204 });
  }

  const { evento, paquete } = parsed.data;
  const hora = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });
  const accion = evento === "abrio" ? "abrió la propuesta" : `quiere aceptar el paquete ${paquete ?? ""}`.trim();
  const { error } = await new Resend(key).emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to,
    subject: `${p.cliente} ${accion}`,
    text: `${p.cliente} ${accion} "${p.campana}".\n${hora}\n\n/propuesta/${p.id}`,
  });
  if (error) console.error("propuesta: send failed", error.name);
  return new Response(null, { status: 204 });
}
