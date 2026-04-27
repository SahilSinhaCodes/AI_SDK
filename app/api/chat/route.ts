// app/api/chat/route.ts
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();


    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages: [
          {
            role: "system",
            content:
              "You are a helpful coding assistant. Keep responses under 3 sentences and focus on practical examples.",
          },
          ...modelMessages,
        ],
      });

      result.usage.then((usage) => {
        console.log({
          messageCount: messages.length,
          inputTokens: usage.inputTokens,
          outputTokens: usage.outputTokens,
          totalTokens: usage.totalTokens,
        });
      });

      
      return result.toUIMessageStreamResponse();
    } catch (error) {
      console.error("Error streaming chat completion:", error);
      return new Response("Failed to stream chat completion", { status: 500 });
    }
  }