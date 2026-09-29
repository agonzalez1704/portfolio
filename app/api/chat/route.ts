import { convertToModelMessages, streamText } from "ai";
import { checkBotId } from "botid/server";
import { buildChatPrompt } from "@/lib/chat-prompt";
import { chatSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  const { isBot } = await checkBotId();
  if (isBot) return Response.json({ error: "Request blocked." }, { status: 403 });

  const parsed = chatSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request." }, { status: 400 });

  const result = streamText({
    model: "anthropic/claude-sonnet-5.5",
    instructions: buildChatPrompt(),
    messages: await convertToModelMessages(parsed.data.messages),
    maxOutputTokens: 500,
  });

  return result.toUIMessageStreamResponse();
}
