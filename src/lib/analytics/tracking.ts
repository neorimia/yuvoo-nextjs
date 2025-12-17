"use client";

import posthog from "posthog-js";
import { PostHogEvents, PostHogProperties, PostHogEventProperties } from "./events";

/**
 * Client-side event tracking
 * Only tracks if PostHog is initialized (user consented to analytics)
 */
export function trackEvent(eventName: string, properties?: PostHogEventProperties): void {
  if (typeof window === "undefined") return;
  if (!(posthog as unknown as { __loaded: boolean }).__loaded) return; // PostHog not initialized

  try {
    posthog.capture(eventName, properties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[PostHog] Error tracking event:", error);
    }
  }
}

/**
 * Identify user (call after login/registration)
 *
 * Supports PostHog person properties:
 * - $set: Properties that can be updated (email, role, name, etc.)
 * - $set_once: Properties that should only be set once (signupDate, etc.)
 *
 * @example
 * identifyUser(userId, {
 *   $set: { email: "user@example.com", role: "parent" },
 *   $set_once: { signupDate: "2024-01-01T00:00:00Z" }
 * });
 */
export function identifyUser(
  userId: string,
  properties?: {
    email?: string;
    name?: string;
    role?: string;
    $set?: Record<string, string | number | boolean | undefined>;
    $set_once?: Record<string, string | number | boolean | undefined>;
    [key: string]:
      | string
      | number
      | boolean
      | Record<string, string | number | boolean | undefined>
      | undefined;
  }
): void {
  if (typeof window === "undefined") return;
  if (!(posthog as unknown as { __loaded: boolean }).__loaded) return;

  try {
    posthog.identify(userId, properties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[PostHog] Error identifying user:", error);
    }
  }
}

/**
 * Reset user (call on logout)
 */
export function resetUser(): void {
  if (typeof window === "undefined") return;
  if (!(posthog as unknown as { __loaded: boolean }).__loaded) return;

  try {
    posthog.reset();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[PostHog] Error resetting user:", error);
    }
  }
}

/**
 * Set user properties
 */
export function setUserProperties(
  properties: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined") return;
  if (!(posthog as unknown as { __loaded: boolean }).__loaded) return;

  try {
    posthog.setPersonProperties(properties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[PostHog] Error setting user properties:", error);
    }
  }
}

// Re-export events and properties for convenience
export { PostHogEvents, PostHogProperties };
