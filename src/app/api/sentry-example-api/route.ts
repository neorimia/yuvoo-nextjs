import * as Sentry from "@sentry/nextjs";
// MIGRATED: Removed export const dynamic = 'force-dynamic' (incompatible with Cache Components)
// API routes are dynamic by default in Next.js 16 with Cache Components

class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryExampleAPIError";
  }
}

// A faulty API route to test Sentry's error monitoring
export function GET() {
  Sentry.logger.info("Sentry example API called");
  throw new SentryExampleAPIError(
    "This error is raised on the backend called by the example page."
  );
}
