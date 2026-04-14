import { streamObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { recipeSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { dish } = await req.json();

    console.log({ dish });

    const result = streamObject({
      model: groq("openai/gpt-oss-20b"),
      schema: recipeSchema,
      prompt: `Generate a recipe for ${dish}`,
    });

    // In AI SDK v6, this is the standard for streaming objects to the useObject hook
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating recipe:", error);
    return new Response("Failed to generate recipe", { status: 500 });
  }
}