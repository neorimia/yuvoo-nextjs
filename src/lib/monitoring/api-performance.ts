/**
 * API Performance Monitoring
 *
 * Tracks API response times and sends them to analytics services.
 * Can be used to wrap API routes and Server Actions.
 */

import * as Sentry from "@sentry/nextjs";

/**
 * Track API response time
 *
 * @param route - API route path (e.g., "/api/bookings")
 * @param method - HTTP method (e.g., "POST", "GET")
 * @param duration - Response time in milliseconds
 * @param statusCode - HTTP status code
 */
export function trackApiPerformance(
  route: string,
  method: string,
  duration: number,
  statusCode: number
): void {
  // Send to Sentry as performance metric
  try {
    Sentry.metrics.distribution("api.response_time", duration, {
      tags: {
        route,
        method,
        status_code: statusCode.toString(),
        status: statusCode >= 400 ? "error" : "success",
      },
      unit: "millisecond",
    });

    // Also track as span for detailed performance analysis
    Sentry.startSpan(
      {
        name: `${method} ${route}`,
        op: "http.server",
      },
      () => {
        // Span will be automatically closed
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[API Performance] Error tracking metric:", error);
    }
  }

  // Log slow requests in development
  if (process.env.NODE_ENV === "development" && duration > 1000) {
    console.warn(`[API Performance] Slow request: ${method} ${route} took ${duration}ms`);
  }
}

/**
 * Wrap an API handler to track performance
 *
 * @example
 * export const GET = trackApiHandler(async (request) => {
 *   // Your handler code
 *   return NextResponse.json({ data: "ok" });
 * });
 */
export function trackApiHandler<T extends (...args: unknown[]) => Promise<unknown>>(handler: T): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const startTime = Date.now();
    let statusCode = 200;
    let route = "unknown";

    try {
      // Extract route information from request if available
      if (args[0] && typeof args[0] === "object" && "url" in args[0]) {
        const url = new URL((args[0] as { url: string }).url);
        route = url.pathname;
      }

      const result = await handler(...args);

      // Extract status code from response if available
      if (result && typeof result === "object" && "status" in result) {
        statusCode = (result as { status: number }).status;
      }

      const duration = Date.now() - startTime;
      trackApiPerformance(route, "GET", duration, statusCode);

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      statusCode =
        error instanceof Error && "statusCode" in error
          ? (error as Error & { statusCode: number }).statusCode
          : 500;
      trackApiPerformance(route, "GET", duration, statusCode);

      throw error;
    }
  }) as T;
}

/**
 * Track Server Action performance
 *
 * @param actionName - Name of the action (e.g., "createBooking")
 * @param duration - Execution time in milliseconds
 * @param success - Whether the action succeeded
 */
export function trackServerActionPerformance(
  actionName: string,
  duration: number,
  success: boolean
): void {
  try {
    Sentry.metrics.distribution("server_action.duration", duration, {
      tags: {
        action: actionName,
        status: success ? "success" : "error",
      },
      unit: "millisecond",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Server Action Performance] Error tracking metric:", error);
    }
  }

  // Log slow actions in development
  if (process.env.NODE_ENV === "development" && duration > 1000) {
    console.warn(`[Server Action Performance] Slow action: ${actionName} took ${duration}ms`);
  }
}

/**
 * Wrap a Server Action to track performance
 *
 * @example
 * export const createBookingAction = trackServerAction(async (formData: FormData) => {
 *   // Your action code
 *   return { success: true };
 * }, "createBooking");
 */
export function trackServerAction<T extends (...args: unknown[]) => Promise<unknown>>(
  action: T,
  actionName: string
): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const startTime = Date.now();
    let success = false;

    try {
      const result = await action(...args);
      success = true;
      const duration = Date.now() - startTime;
      trackServerActionPerformance(actionName, duration, success);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      trackServerActionPerformance(actionName, duration, success);
      throw error;
    }
  }) as T;
}
