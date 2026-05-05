import OpenAI from "openai";

let openaiInstance;

export const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("❌ OPENAI_API_KEY is missing in .env");
  }

  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  return openaiInstance;
};