import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq"; // Swapped to Groq

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const result = await generateObject({
      // Using the model you confirmed works with strict schemas
      model: groq("openai/gpt-oss-20b"),
      output: "enum",
      enum: ["positive", "negative", "neutral"],
      prompt: `Classify the sentiment in this text: "${text}"`,
    });

    // Returns the single enum string (e.g., "positive") as a JSON response
    return result.toJsonResponse();
  } catch (error) {
    console.error("Error generating sentiment:", error);
    return new Response("Failed to generate sentiment", { status: 500 });
  }
}