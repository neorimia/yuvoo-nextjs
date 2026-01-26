"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent, PostHogEvents, PostHogProperties } from "@/lib/analytics/tracking";

/**
 * Clubs Landing Page Tracker
 *
 * Tracks page views and UTM parameters for the clubs landing page.
 * Should be included as a client component in the landing page.
 */
export default function ClubsLandingPageTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view with UTM parameters
    trackEvent(PostHogEvents.CLUBS_LANDING_PAGE_VIEWED, {
      [PostHogProperties.PAGE_URL]: typeof window !== "undefined" ? window.location.href : "",
      [PostHogProperties.REFERRER]:
        typeof document !== "undefined" ? document.referrer || "direct" : "direct",
      [PostHogProperties.UTM_SOURCE]: searchParams.get("utm_source") || null,
      [PostHogProperties.UTM_MEDIUM]: searchParams.get("utm_medium") || null,
      [PostHogProperties.UTM_CAMPAIGN]: searchParams.get("utm_campaign") || null,
    });
  }, [searchParams]);

  return null; // This component doesn't render anything
}
