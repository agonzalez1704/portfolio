"use server";

import { checkBotId } from "botid/server";
import { Resend } from "resend";
import { profile } from "@/content/profile";
import { contactSchema } from "@/lib/schemas";

export type ContactState = { ok: boolean; error?: string } | null;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("company")) return { ok: true };

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const { isBot } = await checkBotId();
  if (isBot) return { ok: false, error: "Request blocked." };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const fallback = `The form is unavailable. Email ${profile.contact.email} instead.`;
  if (!key || !to) {
    console.error("contact: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return { ok: false, error: fallback };
  }

  const { name, email, message } = parsed.data;
  const { error } = await new Resend(key).emails.send({
    // Resend's test sender delivers only to the account owner; set CONTACT_FROM_EMAIL once a domain is verified.
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `${name} <${email}>\n\n${message}`,
  });
  if (error) {
    console.error("contact: send failed", error.name);
    return { ok: false, error: fallback };
  }
  return { ok: true };
}
