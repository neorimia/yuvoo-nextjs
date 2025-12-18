// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Skip Sentry initialization during build to avoid crypto.randomUUID() issues
// Sentry will be initialized at runtime when the app is running
if (process.env.NEXT_PHASE !== "phase-production-build" && typeof window === "undefined") {
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
  });
}
