/**
 * Instrumentation for Next.js
 *
 * This file initializes Sentry for error tracking.
 * IMPORTANT: We use dynamic imports to avoid crypto.randomUUID() errors
 * during Next.js 16 Cache Components prerendering.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// Export onRequestError using a dynamic approach to avoid
// importing @sentry/nextjs at module load time which triggers crypto.randomUUID()
export const onRequestError: typeof import("@sentry/nextjs").captureRequestError = async (
  ...args
) => {
  const Sentry = await import("@sentry/nextjs");
  return Sentry.captureRequestError(...args);
};
