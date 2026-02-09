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
  timeout: 25000, // 25 seconds timeout (optimized for Vercel Hobby tier + GPT-3.5)
  maxRetries: 1, // Single retry to fail faster and use fallback
});

// Model configuration for quiz recommendations
export const AI_MODEL = "ft:gpt-4.1-mini-2025-04-14:neorimia:yuvoo-quiz-v1:D72kxApp"; // GPT-3.5 Turbo for speed (2-8s response vs 10-45s for GPT-4)
export const AI_TEMPERATURE = 0.8; // Slightly higher for creative recommendations with GPT-3.5
export const AI_MAX_TOKENS = 2000; // Maximum tokens for response
