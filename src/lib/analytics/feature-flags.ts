"use client";

import posthog from "posthog-js";
import { useEffect, useState } from "react";

/**
 * Feature Flag Names for A/B Testing
 *
 * Naming Convention: UPPERCASE_WITH_UNDERSCORES
 * Format: [FEATURE]_[VARIANT]
 */
export const FeatureFlags = {
  // Hero Headline Variations
  CLUBS_LANDING_HERO_HEADLINE_VARIANT: "clubs_landing_hero_headline_variant",

  // CTA Button Text Variations
  CLUBS_LANDING_HERO_CTA_VARIANT: "clubs_landing_hero_cta_variant",
  CLUBS_LANDING_FINAL_CTA_VARIANT: "clubs_landing_final_cta_variant",

  // Email Subject Line Variations
  LEAD_NOTIFICATION_EMAIL_SUBJECT_VARIANT: "lead_notification_email_subject_variant",
} as const;

/**
 * Feature Flag Variant Values
 * These are the possible values for each feature flag
 */
export const FeatureFlagVariants = {
  // Hero Headline Variants
  HERO_HEADLINE_CURRENT: "current", // "Crești numărul de copii înscriși, fără lead-uri inutile"
  HERO_HEADLINE_VARIANT_A: "variant_a", // "Părinți pre-calificați. Zero timp pierdut. Mai multe înscrieri."
  HERO_HEADLINE_VARIANT_B: "variant_b", // "Stop la mesaje inutile. Start cu lead-uri calificate."

  // CTA Variants
  CTA_CURRENT: "current", // Current CTA text
  CTA_VARIANT_A: "variant_a", // Alternative CTA text
  CTA_VARIANT_B: "variant_b", // Alternative CTA text

  // Email Subject Variants
  EMAIL_SUBJECT_CURRENT: "current", // Current subject line
  EMAIL_SUBJECT_VARIANT_A: "variant_a", // Alternative subject line
  EMAIL_SUBJECT_VARIANT_B: "variant_b", // Alternative subject line
} as const;

/**
 * Get feature flag value from PostHog
 * Returns the variant value or null if not available
 */
export function getFeatureFlag(flagName: string): string | boolean | undefined {
  if (typeof window === "undefined") return undefined;
  if (!(posthog as unknown as { __loaded: boolean }).__loaded) return undefined;

  try {
    return posthog.getFeatureFlag(flagName);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`[PostHog] Error getting feature flag ${flagName}:`, error);
    }
    return undefined;
  }
}

/**
 * Hook to get feature flag value
 * Returns the variant value, loading state, and error state
 */
export function useFeatureFlag(flagName: string): {
  value: string | boolean | undefined;
  isLoading: boolean;
  error: Error | null;
} {
  const [value, setValue] = useState<string | boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    if (!(posthog as unknown as { __loaded: boolean }).__loaded) {
      setIsLoading(false);
      return;
    }

    try {
      const flagValue = posthog.getFeatureFlag(flagName);
      setValue(flagValue);
      setIsLoading(false);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setIsLoading(false);
      if (process.env.NODE_ENV === "development") {
        console.error(`[PostHog] Error getting feature flag ${flagName}:`, error);
      }
    }
  }, [flagName]);

  return { value, isLoading, error };
}

/**
 * Check if feature flag is enabled (returns true)
 * Useful for boolean feature flags
 */
export function isFeatureFlagEnabled(flagName: string): boolean {
  const value = getFeatureFlag(flagName);
  return value === true || value === "true" || value === "enabled";
}

/**
 * Get feature flag variant (for A/B testing)
 * Returns the variant string or default value
 */
export function getFeatureFlagVariant(
  flagName: string,
  defaultValue: string = FeatureFlagVariants.CTA_CURRENT
): string {
  const value = getFeatureFlag(flagName);

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? "enabled" : "disabled";
  }

  return defaultValue;
}
