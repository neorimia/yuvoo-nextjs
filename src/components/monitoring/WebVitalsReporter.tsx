"use client";

import { useEffect } from "react";
import { reportWebVitals } from "@/lib/monitoring/web-vitals";

/**
 * Web Vitals Reporter Component
 *
 * Reports Core Web Vitals metrics to analytics services (PostHog, Sentry).
 * Should be included in the root layout.
 *
 * @example
 * // In app/layout.tsx:
 * <WebVitalsReporter />
 */
export function WebVitalsReporter() {
  useEffect(() => {
    // Report Web Vitals after component mounts
    reportWebVitals();
  }, []);

  // This component doesn't render anything
  return null;
}
