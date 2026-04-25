import { streamText, convertToModelMessages, UIMessage } from "ai";
import { registry } from "./models";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      // We are now pulling from our custom registry instead of calling groq() directly
      model: registry.languageModel("groq:smart"),

      // Don't forget the v6 await fix!
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}