import { z } from "zod";

const singleLine = /^[^\r\n]*$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80).regex(singleLine, "Enter your name."),
  email: z.email("Enter a valid email.").max(200),
  message: z.string().trim().min(10, "Write a short message.").max(4000),
});

export const CHAT_MAX_MESSAGES = 12;
export const CHAT_MAX_CHARS = 1000;

// useChat sends extra part types (step-start, etc.). Keep only text; drop turns left empty.
const message = z
  .object({
    role: z.enum(["user", "assistant"]),
    parts: z.array(z.object({ type: z.string(), text: z.string().max(6000).optional() })).max(10),
  })
  .transform((m) => ({
    role: m.role,
    parts: m.parts.flatMap((p) =>
      p.type === "text" && p.text ? [{ type: "text" as const, text: p.text }] : [],
    ),
  }));

export const chatSchema = z.object({
  messages: z
    .array(message)
    .max(CHAT_MAX_MESSAGES)
    .transform((ms) => ms.filter((m) => m.parts.length))
    .refine((ms) => ms.at(-1)?.role === "user", "Last message must be from the user.")
    .refine(
      (ms) => ms.every((m) => m.role !== "user" || m.parts.every((p) => p.text.length <= CHAT_MAX_CHARS)),
      "Message too long.",
    ),
});
