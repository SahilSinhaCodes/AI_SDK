import { groq as originalGroq } from "@ai-sdk/groq";
import {
  createProviderRegistry,
  customProvider,
  defaultSettingsMiddleware,
  wrapLanguageModel,
} from "ai";

const customGroq = customProvider({
  languageModels: {

    fast: originalGroq("llama-3.1-8b-instant"),


    smart: originalGroq("llama-3.3-70b-versatile"),


    creative: wrapLanguageModel({
      model: originalGroq("llama-3.3-70b-versatile"),
      middleware: defaultSettingsMiddleware({
        settings: {

          temperature: 0.9,
        },
      }),
    }),
  },

  fallbackProvider: originalGroq,
});

export const registry = createProviderRegistry({
  groq: customGroq,
});