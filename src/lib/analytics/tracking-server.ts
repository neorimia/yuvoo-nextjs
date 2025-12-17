import { getPostHogServer } from "./posthog-server";
import { PostHogEventProperties } from "./events";

/**
 * Server-side event tracking (for Server Actions)
 */
export async function trackEventServer(
  eventName: string,
  properties: PostHogEventProperties & {
    distinctId: string; // Required for server-side tracking
  }
): Promise<void> {
  const posthog = getPostHogServer();
  if (!posthog || !properties?.distinctId) return;

  try {
    // Extract distinctId from properties to avoid duplication
    const { distinctId, ...eventProperties } = properties;
    await posthog.capture({
      distinctId,
      event: eventName,
      properties: eventProperties, // distinctId excluded from properties
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[PostHog Server] Error tracking event:", error);
    }
  }
}
