import {
    streamText,
    UIMessage,
    convertToModelMessages,
    tool,
    InferUITools,
    UIDataTypes,
  } from "ai";
  import { groq } from "@ai-sdk/groq";
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

        model: groq("llama-3.3-70b-versatile"),


        messages: await convertToModelMessages(messages),

        tools,


        // @ts-ignore
        maxSteps: 2,
      });

      return result.toUIMessageStreamResponse();
    } catch (error) {
      console.error("Error streaming chat completion:", error);
      return new Response("Failed to stream chat completion", { status: 500 });
    }
  }