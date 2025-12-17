// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set the environment (development, staging, production)
  environment: process.env.NODE_ENV || "development",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  // In production, use a lower rate (e.g., 0.1 = 10%) to reduce performance impact
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Enable logs to be sent to Sentry (only in development, for debugging)
  enableLogs: false,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Debug mode (disable to reduce console noise)
  // Set to true only when debugging Sentry issues
  debug: false,

  // Ignore specific errors
  ignoreErrors: [
    // Browser extensions
    "top.GLOBALS",
    // Network errors
    "NetworkError",
    "Network request failed",
    // Known third-party errors
    "ResizeObserver loop limit exceeded",
  ],

  // Filter out specific URLs
  denyUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Firefox extensions
    /^resource:\/\//i,
  ],
});
