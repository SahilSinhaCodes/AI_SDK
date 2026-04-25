import { groq as originalGroq } from "@ai-sdk/groq";
import {
  createProviderRegistry,
  customProvider,
  defaultSettingsMiddleware,
  wrapLanguageModel,
} from "ai";

const customGroq = customProvider({
  languageModels: {
    // 1. The fast alias (great for simple UI tasks or quick parsing)
    fast: originalGroq("llama-3.1-8b-instant"),

    // 2. The smart alias (your heavy hitter for complex logic)
    smart: originalGroq("llama-3.3-70b-versatile"),

    // 3. Wrapping a model to bake in default settings!
    // Replaced the OpenAI 'reasoning' block with a 'creative' block
    creative: wrapLanguageModel({
      model: originalGroq("llama-3.3-70b-versatile"),
      middleware: defaultSettingsMiddleware({
        settings: {
          // Hardcode the temperature to 0.9 for this specific alias
          temperature: 0.9,
        },
      }),
    }),
  },
  // If you call "groq:mixtral-8x7b-32768", it falls back to the standard provider
  fallbackProvider: originalGroq,
});

export const registry = createProviderRegistry({
  groq: customGroq,
});