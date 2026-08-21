/**
 * Google Analytics 4 (gtag.js) integration
 *
 * Loads GA only after analytics cookie consent is granted.
 * Disabled in development to avoid polluting production data.
 */

import { getCookiePreferences } from "@/lib/cookies";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-EHHMP50BR9";

export const COOKIE_CONSENT_EVENT = "yuvoo-cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function hasAnalyticsConsent(): boolean {
  const preferences = getCookiePreferences();
  return preferences?.analytics === true;
}

/**
 * Notify GoogleAnalytics component to load gtag after consent.
 * Idempotent — safe to call multiple times.
 */
export function initializeGoogleAnalytics(): void {
  if (typeof window === "undefined") return;
  if (!shouldLoadGoogleAnalytics()) return;

  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

/**
 * Track a pageview for SPA navigation.
 */
export function trackGaPageview(url: string): void {
  if (typeof window === "undefined") return;
  if (!GA_MEASUREMENT_ID) return;
  if (!isProduction()) return;
  if (!hasAnalyticsConsent()) return;
  if (!window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function shouldLoadGoogleAnalytics(): boolean {
  return isProduction() && hasAnalyticsConsent() && Boolean(GA_MEASUREMENT_ID);
}
