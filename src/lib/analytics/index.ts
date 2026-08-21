/**
 * PostHog Analytics Module
 *
 * Centralized exports for PostHog analytics integration
 */

// Client-side tracking
export {
  trackEvent,
  identifyUser,
  resetUser,
  setUserProperties,
  PostHogEvents,
  PostHogProperties,
} from "./tracking";

// Server-side tracking
export { trackEventServer } from "./tracking-server";

// PostHog initialization
export { initializePostHog, PostHogProviderWrapper } from "./posthog";

// Google Analytics initialization
export {
  initializeGoogleAnalytics,
  trackGaPageview,
  GA_MEASUREMENT_ID,
  COOKIE_CONSENT_EVENT,
} from "./gtag";

// Server-side PostHog client
export { getPostHogServer, shutdownPostHogServer } from "./posthog-server";

// Cookie consent integration
export { usePostHogConsent } from "./usePostHogConsent";

// Event constants
export type { PostHogEventName, PostHogEventProperties } from "./events";
