import { streamText, UIMessage, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      // Keeping your exact model!
      model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),

      // 🚨 Look how clean this is!
      // This single line replaces all 35 lines of your manual mapping,
      // parses the image attachments automatically, and fixes the TS Error.
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}