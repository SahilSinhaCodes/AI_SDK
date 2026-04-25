import { streamText, UIMessage, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      // 1. Swapped to Groq's official recommended replacement
      model: groq("openai/gpt-oss-120b"),

      // 2. Await the conversion (Standard v6 fix)
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      // We leave this true so the SDK handles it if the model decides to "think"
      sendReasoning: true,
    });
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}