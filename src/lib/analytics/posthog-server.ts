import { PostHog } from "posthog-node";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

let posthogServer: PostHog | null = null;

/**
 * Get or create PostHog server client (singleton)
 */
export function getPostHogServer(): PostHog | null {
  if (!POSTHOG_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[PostHog Server] NEXT_PUBLIC_POSTHOG_KEY is not set");
    }
    return null;
  }

  if (!posthogServer) {
    posthogServer = new PostHog(POSTHOG_KEY, {
      host: POSTHOG_HOST,
    });
  }

  return posthogServer;
}

/**
 * Shutdown PostHog server client (call before process exit)
 */
export async function shutdownPostHogServer(): Promise<void> {
  if (posthogServer) {
    await posthogServer.shutdown();
    posthogServer = null;
  }
}
