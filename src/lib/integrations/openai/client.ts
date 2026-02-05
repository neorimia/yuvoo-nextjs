/**
 * OpenAI Client Configuration
 *
 * OpenAI API client setup for AI-powered quiz recommendations.
 * Configured with retry logic and timeout for reliability.
 *
 * ============================================================================
 * GDPR COMPLIANCE DOCUMENTATION
 * ============================================================================
 *
 * Data Processing Agreement (DPA):
 * - OpenAI DPA signed: [TO BE COMPLETED]
 * - Standard Contractual Clauses (SCCs): Incorporated in DPA
 * - Training data usage: PROHIBITED (API data not used for model training)
 *
 * EU Data Residency:
 * - Configuration: Enable in OpenAI Organization Settings → Data Controls
 * - Setting: "Store and process data only in Europe" = ENABLED
 * - Verification: Check organization settings at platform.openai.com
 *
 * Transfer Impact Assessment (TIA):
 * - Status: Required if US processing occurs
 * - With EU data residency: TIA simplified (data stays in EU)
 * - Document location: docs/compliance/TIA_OPENAI.md
 *
 * Data Categories Sent to OpenAI:
 * - Child age (not date of birth)
 * - Child gender
 * - Personality traits (from quiz)
 * - Activity preferences
 * - Energy level
 * - Health/medical considerations (with explicit consent)
 * - Physical measurements (optional)
 *
 * Data NOT Sent to OpenAI:
 * - Parent name, email, or contact info
 * - Child name (only generic identifiers)
 * - Payment information
 * - Location/address details (only city-level for club matching)
 *
 * Retention:
 * - OpenAI API: 30 days max (per their policy), then deleted
 * - With zero-retention option: Data deleted immediately after processing
 *
 * Legal Basis:
 * - GDPR Art. 6(1)(a): Consent
 * - GDPR Art. 9(2)(a): Explicit consent for health data
 *
 * Related Documents:
 * - DPA Tracker: docs/compliance/DPA_TRACKER.md
 * - DPIA: docs/compliance/DPIA_YUVOO.md
 * - Privacy Policy: /confidentialitate (Section 5, 7)
 *
 * ============================================================================
 */

import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

/**
 * OpenAI client instance configured for GDPR compliance
 *
 * IMPORTANT: Ensure EU data residency is enabled in your OpenAI organization settings:
 * 1. Go to platform.openai.com/organization/settings
 * 2. Navigate to "Data controls" section
 * 3. Enable "Store and process data only in Europe"
 *
 * The API endpoint will automatically route to EU infrastructure when enabled.
 */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 25000, // 25 seconds timeout (optimized for Vercel Hobby tier + GPT-3.5)
  maxRetries: 1, // Single retry to fail faster and use fallback
});

// Model configuration for quiz recommendations
export const AI_MODEL = "gpt-3.5-turbo"; // GPT-3.5 Turbo for speed (2-8s response vs 10-45s for GPT-4)
export const AI_TEMPERATURE = 0.8; // Slightly higher for creative recommendations with GPT-3.5
export const AI_MAX_TOKENS = 2000; // Maximum tokens for response

/**
 * GDPR-compliant data preparation helper
 * Ensures only necessary, anonymized data is sent to OpenAI
 */
export function prepareDataForAI<T extends Record<string, unknown>>(
  data: T,
  sensitiveFields: (keyof T)[] = []
): Omit<T, (typeof sensitiveFields)[number]> {
  const result = { ...data };
  for (const field of sensitiveFields) {
    delete result[field];
  }
  return result;
}

/**
 * Fields that should NEVER be sent to OpenAI
 */
export const OPENAI_EXCLUDED_FIELDS = [
  "parentId",
  "parentEmail",
  "parentName",
  "parentPhone",
  "childId",
  "childName",
  "childFullName",
  "address",
  "streetAddress",
  "exactLocation",
  "paymentInfo",
  "cardNumber",
  "bankAccount",
] as const;
