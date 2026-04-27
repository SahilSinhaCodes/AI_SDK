import { streamText, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";
import type { MyUIMessage } from "./types";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: MyUIMessage[] } = await req.json();

    const result = streamText({

      model: groq("llama-3.3-70b-versatile"),


      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      messageMetadata: ({ part }) => {

        if (part.type === "start") {
          return {
            createdAt: Date.now(),
          };
        }

        if (part.type === "finish") {
          console.log("Token usage:", part.totalUsage);
          return {
            
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