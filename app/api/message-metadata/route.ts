import { streamText, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq"; // Swapped to Groq
import type { MyUIMessage } from "./types";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: MyUIMessage[] } = await req.json();

    const result = streamText({
      // Using Groq's insanely fast Llama 3.3 model
      model: groq("llama-3.3-70b-versatile"),

      // Fixed the TS Promise bug
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      messageMetadata: ({ part }) => {
        // When the AI starts typing, stamp the exact time
        if (part.type === "start") {
          return {
            createdAt: Date.now(),
          };
        }
        // When the AI finishes, attach the total tokens it burned
        if (part.type === "finish") {
          console.log("Token usage:", part.totalUsage);
          return {
            // Optional chaining (?) just in case the stream cuts out early
            totalTokens: part.totalUsage?.totalTokens || 0,
          };
        }
      },
    });
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}