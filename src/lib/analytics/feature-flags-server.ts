/**
 * Server-Side Feature Flags Utilities
 *
 * Server-side utilities for accessing PostHog feature flags.
 * Used for email subject lines and other server-side A/B testing.
 */

import { getPostHogServer } from "./posthog-server";
import { FeatureFlagVariants } from "./feature-flags";

/**
 * Get feature flag value server-side
 * Returns the variant value or default value
 *
 * @param flagName - Name of the feature flag
 * @param distinctId - Distinct identifier for the user/club (required for server-side)
 * @param defaultValue - Default value if flag is not available
 * @returns Feature flag value or default
 */
export async function getFeatureFlagServer(
  flagName: string,
  distinctId: string,
  defaultValue: string = FeatureFlagVariants.CTA_CURRENT
): Promise<string | boolean | undefined> {
  const posthog = getPostHogServer();
  if (!posthog) {
    return defaultValue;
  }

  try {
    const flagValue = await posthog.getFeatureFlag(flagName, distinctId);
    return flagValue || defaultValue;
  } catch (error) {
    console.error(`[PostHog Server] Error getting feature flag ${flagName}:`, error);
    return defaultValue;
  }
}

/**
 * Get feature flag variant server-side (for A/B testing)
 * Returns the variant string or default value
 *
 * @param flagName - Name of the feature flag
 * @param distinctId - Distinct identifier for the user/club
 * @param defaultValue - Default variant value
 * @returns Variant string value
 */
export async function getFeatureFlagVariantServer(
  flagName: string,
  distinctId: string,
  defaultValue: string = FeatureFlagVariants.CTA_CURRENT
): Promise<string> {
  const value = await getFeatureFlagServer(flagName, distinctId, defaultValue);

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? "enabled" : "disabled";
  }

  return defaultValue;
}

/**
 * Generate email subject line with A/B testing support
 * Uses PostHog feature flags to determine which variant to use
 *
 * @param flagName - Feature flag name for email subject variant
 * @param distinctId - Club ID or email (used as distinct identifier)
 * @param variants - Object with variant values
 * @returns Subject line string
 */
export async function generateEmailSubjectWithVariant(params: {
  flagName: string;
  distinctId: string;
  sportName: string;
  locationName: string;
  childAge: number;
  variants: {
    current: string;
    variant_a: string;
    variant_b: string;
  };
}): Promise<string> {
  const { flagName, distinctId, sportName, locationName, childAge, variants } = params;

  const variant = await getFeatureFlagVariantServer(
    flagName,
    distinctId,
    FeatureFlagVariants.EMAIL_SUBJECT_CURRENT
  );

  // Replace placeholders in variant strings
  const replacePlaceholders = (text: string): string => {
    return text
      .replace(/{sportName}/g, sportName)
      .replace(/{locationName}/g, locationName)
      .replace(/{age}/g, childAge.toString())
      .replace(/{childAge}/g, childAge.toString());
  };

  switch (variant) {
    case FeatureFlagVariants.EMAIL_SUBJECT_VARIANT_A:
      return replacePlaceholders(variants.variant_a);
    case FeatureFlagVariants.EMAIL_SUBJECT_VARIANT_B:
      return replacePlaceholders(variants.variant_b);
    default:
      return replacePlaceholders(variants.current);
  }
}
