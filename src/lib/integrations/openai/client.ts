/**
 * OpenAI Client Configuration
 *
 * OpenAI API client setup for AI-powered quiz recommendations.
 * Configured with retry logic and timeout for reliability.
 */

import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000, // 30 seconds timeout
  maxRetries: 3, // Retry up to 3 times on failure
});

// Model configuration for quiz recommendations
export const AI_MODEL = "gpt-4-turbo-preview"; // GPT-4 Turbo for best quality
export const AI_TEMPERATURE = 0.7; // Balanced creativity and consistency
export const AI_MAX_TOKENS = 2000; // Maximum tokens for response
