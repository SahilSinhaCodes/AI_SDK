import {
    UIMessage,
    UIDataTypes,
    streamText,
    tool,
    convertToModelMessages,
    InferUITools,
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

        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        const weatherData = {
          location: {
            name: data.location.name,
            country: data.location.country,
            localtime: data.location.localtime,
          },
          current: {
            temp_c: data.current.temp_c,
            condition: {
              text: data.current.condition.text,
              code: data.current.condition.code,
            },
          },
        };
        return weatherData;
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


        system: "You are a helpful weather assistant. When a user asks for the weather, strictly use the getWeather tool to fetch the data. Do NOT add any conversational filler before calling the tool.",

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