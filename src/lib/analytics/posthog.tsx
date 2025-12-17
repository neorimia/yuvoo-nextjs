"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, type ReactNode } from "react";
import { getCookiePreferences } from "@/lib/cookies";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

/**
 * Initialize PostHog client-side
 * Only initializes if user has consented to analytics cookies
 */
export function initializePostHog(): void {
  if (typeof window === "undefined") return;
  if (!POSTHOG_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set");
    }
    return;
  }

  // Check cookie consent
  const preferences = getCookiePreferences();
  if (!preferences?.analytics) {
    return; // Don't initialize if user hasn't consented
  }

  // Check if already initialized (type-safe check)
  if ((posthog as unknown as { __loaded: boolean }).__loaded) return;

  posthog.init(POSTHOG_KEY, {
    api_host: "/ingest", // Use Next.js rewrites
    ui_host: POSTHOG_HOST,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") {
        posthog.debug(); // Enable debug mode in development
      }
    },
    capture_pageview: true, // Automatically capture pageviews
    capture_pageleave: true, // Capture page leave events
    autocapture: true, // Automatic event capture
    disable_session_recording: false, // Enable session recordings
    session_recording: {
      maskAllInputs: true, // Privacy: mask all input fields
      maskInputOptions: {
        password: true,
        email: true,
      },
    },
    capture_exceptions: true, // Enable error tracking
  });
}

/**
 * PostHog Provider component wrapper
 * Initializes PostHog when analytics consent is given
 */
export function PostHogProviderWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize PostHog on mount if consent is given
    initializePostHog();
  }, []);

  // Don't render PostHogProvider if API key is not set
  if (!POSTHOG_KEY) {
    return <>{children}</>;
  }

  // PostHogProvider can handle uninitialized posthog instance
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
