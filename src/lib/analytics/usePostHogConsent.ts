"use client";

import { useEffect } from "react";
import { getCookiePreferences } from "@/lib/cookies";
import { initializePostHog } from "./posthog";

/**
 * Hook to initialize PostHog when analytics consent is given
 */
export function usePostHogConsent() {
  useEffect(() => {
    const checkConsent = () => {
      const preferences = getCookiePreferences();
      if (preferences?.analytics) {
        initializePostHog();
      }
    };

    // Check on mount
    checkConsent();

    // Listen for storage changes (cookie consent updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "yuvoo_cookie_preferences") {
        checkConsent();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
}
