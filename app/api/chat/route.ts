import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
import { checkBotId } from "botid/server";
import { buildChatPrompt } from "@/lib/chat-prompt";
import { chatSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  const { isBot } = await checkBotId();
  if (isBot) return Response.json({ error: "Request blocked." }, { status: 403 });

  if (!process.env.OPENAI_API_KEY) {
    console.error("chat: OPENAI_API_KEY is not set");
    return Response.json({ error: "Chat is unavailable." }, { status: 503 });
  }

  const parsed = chatSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request." }, { status: 400 });

  const result = streamText({
    model: openai("gpt-5.4-mini"),
    instructions: buildChatPrompt(),
    messages: await convertToModelMessages(parsed.data.messages),
    // Reasoning tokens count against the output cap; keep effort low so the answer fits.
    maxOutputTokens: 1200,
    providerOptions: { openai: { reasoningEffort: "low" } },
  });

  return result.toUIMessageStreamResponse();
}
