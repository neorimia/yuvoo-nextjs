/**
 * Web Vitals Monitoring
 *
 * Tracks Core Web Vitals and sends them to analytics services.
 * Core Web Vitals: LCP, INP (replaces FID), CLS, FCP, TTFB
 */

import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from "web-vitals";

/**
 * Send Web Vitals metric to analytics services
 */
function sendToAnalytics(metric: Metric) {
  // Send to PostHog (if available)
  if (typeof window !== "undefined") {
    const windowWithPostHog = window as typeof window & {
      posthog?: {
        __loaded?: boolean;
        capture: (event: string, properties?: Record<string, unknown>) => void;
      };
    };

    if (windowWithPostHog.posthog && windowWithPostHog.posthog.__loaded) {
      try {
        windowWithPostHog.posthog.capture("$web_vitals", {
          metric_name: metric.name,
          metric_value: metric.value,
          metric_id: metric.id,
          metric_delta: metric.delta,
          // Normalize CLS value (multiply by 1000 for consistency)
          value: metric.name === "CLS" ? metric.value * 1000 : metric.value,
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("[Web Vitals] Error sending to PostHog:", error);
        }
      }
    }

    // Send to Sentry (if available)
    const windowWithSentry = window as typeof window & {
      Sentry?: {
        metrics?: {
          distribution: (
            name: string,
            value: number,
            options?: { unit?: string; tags?: Record<string, string> }
          ) => void;
        };
      };
    };

    if (windowWithSentry.Sentry && windowWithSentry.Sentry.metrics) {
      try {
        // Send as distribution metric
        windowWithSentry.Sentry.metrics.distribution(metric.name.toLowerCase(), metric.value, {
          unit: metric.name === "CLS" ? "ratio" : "millisecond",
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("[Web Vitals] Error sending to Sentry:", error);
        }
      }
    }
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric.id);
  }
}

/**
 * Initialize Web Vitals tracking
 * Call this in your app layout or root component
 *
 * Tracks:
 * - LCP (Largest Contentful Paint)
 * - INP (Interaction to Next Paint) - replaces FID
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 */
export function reportWebVitals() {
  if (typeof window === "undefined") return;

  // Core Web Vitals (2024+)
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics); // Replaces FID in web-vitals v3+
  onLCP(sendToAnalytics);

  // Additional metrics
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
