import { streamText, UIMessage, ModelMessage } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const coreMessages: ModelMessage[] = messages.map((msg) => {
      // 1. Leave AI history alone to prevent schema validation crashes
      if (msg.role !== "user") {
        return {
          role: msg.role as "assistant" | "system",
          content: msg.content,
        };
      }

      // 2. Handle User messages with attachments
      if (msg.parts && msg.parts.length > 0) {
        return {
          role: "user",
          content: msg.parts.map((part) => {
            // Pass text through normally
            if (part.type === "text") {
              return { type: "text", text: part.text };
            }

            // Only process actual images, ignore PDFs entirely
            if (part.type === "file" && part.url.startsWith("data:image/")) {
              const mimeType = part.url.split(";")[0].split(":")[1];
              const base64String = part.url.split(",")[1];

              return {
                type: "image",
                image: base64String,
                mimeType: mimeType
              };
            }

            // Ignore anything that isn't text or an image
            return { type: "text", text: "" };
          }),
        };
      }

      // 3. Handle normal text-only user messages
      return {
        role: "user",
        content: msg.content,
      };
    });

    const result = streamText({
      model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
      messages: coreMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}