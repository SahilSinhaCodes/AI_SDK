import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  InferUITools,
  UIDataTypes,
} from "ai";
import { experimental_createMCPClient } from "@ai-sdk/mcp";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const tools = {
  getWeather: tool({
    description: "Get the weather for a location",
    inputSchema: z.object({
      city: z.string().describe("The city to get the weather for"),
    }),
    execute: async ({ city }) => {
      if (city === "Gotham City") {
        return "70°F and cloudy";
      } else if (city === "Metropolis") {
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

    const httpTransport = new StreamableHTTPClientTransport(
      // Pulled from .env.local (The ! tells TypeScript we guarantee this exists)
      new URL(process.env.MCP_URL!),
      {
        requestInit: {
          headers: {
            // Pulled from .env.local
            Authorization: process.env.Bearer_Link!,
          },
        },
      }
    );

    const mcpClient = await experimental_createMCPClient({
      transport: httpTransport,
    });

    const mcpTools = await mcpClient.tools();

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages: await convertToModelMessages(messages),
      tools: { ...tools, ...mcpTools },

      system: "You are a helpful assistant. Whenever you use a tool to fetch data, you MUST write a clear text response to the user summarizing the results.",

      // @ts-ignore
      maxSteps: 3,

      onFinish: async () => {
        await mcpClient.close();
      },
      onError: async (error) => {
        await mcpClient.close();
        console.error("Error during streaming:", error);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}