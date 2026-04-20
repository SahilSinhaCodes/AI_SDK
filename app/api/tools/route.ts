import {
    streamText,
    UIMessage,
    convertToModelMessages,
    tool,
    InferUITools,
    UIDataTypes,
  } from "ai";
  import { groq } from "@ai-sdk/groq"; // 1. Swapped to Groq
  import { z } from "zod";

  const tools = {
    getWeather: tool({
      description: "Get the weather for a location",
      inputSchema: z.object({
        city: z.string().describe("The city to get the weather for"),
      }),
      execute: async ({ city }) => {
        if (city.toLowerCase() === "gotham city") {
          return "70°F and cloudy";
        } else if (city.toLowerCase() === "metropolis") {
          return "80°F and sunny";
        } else {
          return "Unknown";
        }
      },
    }),
  };

  export type ChatTools = InferUITools<typeof tools>;
  export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

  export async function POST(req: Request) {
    try {
      const { messages }: { messages: ChatMessage[] } = await req.json();

      const result = streamText({
        // 2. Use the versatile 70B model for highly accurate tool calling
        model: groq("llama-3.3-70b-versatile"),

        // 3. Await the conversion to prevent the TypeScript Promise error
        messages: await convertToModelMessages(messages),

        tools,

        // 4. Use the stable v6 property for multi-step tool execution
        maxSteps: 2,
      });

      return result.toUIMessageStreamResponse();
    } catch (error) {
      console.error("Error streaming chat completion:", error);
      return new Response("Failed to stream chat completion", { status: 500 });
    }
  }