/**
 * OpenAI Client Configuration
 *
 * OpenAI API client setup for AI-powered quiz recommendations.
 */

import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Model configuration
export const AI_MODEL = "gpt-4-turbo-preview";
export const AI_TEMPERATURE = 0.7;
