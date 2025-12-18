/**
 * CSRF Protection Utilities for API Routes
 *
 * Next.js Server Actions have built-in CSRF protection, but API routes (route.ts)
 * require manual CSRF protection implementation.
 *
 * This module provides utilities to validate CSRF protection for API routes.
 *
 * ⚠️ IMPORTANT: Prefer Server Actions over API routes when possible.
 * Server Actions have automatic CSRF protection built-in.
 *
 * Usage:
 * ```typescript
 * import { validateCSRF } from "@/lib/security/csrf";
 *
 * export async function POST(request: Request) {
 *   const csrfError = await validateCSRF(request);
 *   if (csrfError) {
 *     return Response.json({ error: csrfError }, { status: 403 });
 *   }
 *   // ... rest of handler
 * }
 * ```
 */

/**
 * CSRF validation result
 */
export interface CSRFValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Allowed origins for CSRF validation
 * Configure in next.config.js if using reverse proxies/CDNs
 */
const getAllowedOrigins = (): string[] => {
  // Get from environment or use defaults
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
  if (allowedOriginsEnv) {
    return allowedOriginsEnv.split(",").map((origin) => origin.trim());
  }

  // Default: current app URL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = new URL(appUrl);
  return [url.origin, `https://${url.hostname}`, `http://${url.hostname}`];
};

/**
 * Validate Origin header against Host/X-Forwarded-Host
 *
 * This is the primary CSRF protection mechanism for API routes.
 * Compares the Origin header with the Host header (or X-Forwarded-Host in production).
 *
 * @param request - The incoming Request object
 * @returns CSRFValidationResult indicating if the request is valid
 */
export async function validateCSRF(request: Request): Promise<CSRFValidationResult> {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const forwardedHost = request.headers.get("x-forwarded-host");

  // Determine the expected host
  const expectedHost = forwardedHost || host;

  if (!expectedHost) {
    return {
      valid: false,
      error: "Missing Host header",
    };
  }

  // If no Origin header, check if it's a same-origin request
  // (browsers may omit Origin for same-origin requests)
  if (!origin) {
    // Check Referer header as fallback
    const referer = request.headers.get("referer");
    if (referer) {
      try {
        const refererUrl = new URL(referer);
        const refererHost = refererUrl.host;
        if (refererHost === expectedHost) {
          return { valid: true };
        }
      } catch {
        // Invalid referer URL
      }
    }

    // For same-origin requests without Origin, allow if method is safe
    // (GET, HEAD, OPTIONS are idempotent and don't modify data)
    const method = request.method;
    if (["GET", "HEAD", "OPTIONS"].includes(method)) {
      return { valid: true };
    }

    return {
      valid: false,
      error: "Missing Origin header for mutation request",
    };
  }

  // Validate Origin against allowed origins
  const allowedOrigins = getAllowedOrigins();
  const originUrl = new URL(origin);
  const originHost = originUrl.origin;

  // Check if origin matches expected host
  const originMatchesHost =
    originHost === `https://${expectedHost}` || originHost === `http://${expectedHost}`;

  // Check if origin is in allowed origins list
  const originAllowed = allowedOrigins.some(
    (allowed) => allowed === originHost || allowed === origin
  );

  if (!originMatchesHost && !originAllowed) {
    return {
      valid: false,
      error: `Origin ${origin} does not match expected host ${expectedHost}`,
    };
  }

  return { valid: true };
}

/**
 * Validate that the request method is appropriate for the operation
 *
 * @param request - The incoming Request object
 * @param allowedMethods - Array of allowed HTTP methods
 * @returns CSRFValidationResult indicating if the method is valid
 */
export function validateMethod(request: Request, allowedMethods: string[]): CSRFValidationResult {
  const method = request.method;

  if (!allowedMethods.includes(method)) {
    return {
      valid: false,
      error: `Method ${method} not allowed. Allowed methods: ${allowedMethods.join(", ")}`,
    };
  }

  return { valid: true };
}

/**
 * Combined CSRF and method validation
 *
 * Convenience function that validates both CSRF protection and HTTP method.
 *
 * @param request - The incoming Request object
 * @param allowedMethods - Array of allowed HTTP methods (default: ["POST"])
 * @returns CSRFValidationResult indicating if the request is valid
 */
export async function validateCSRFAndMethod(
  request: Request,
  allowedMethods: string[] = ["POST"]
): Promise<CSRFValidationResult> {
  // First validate method
  const methodValidation = validateMethod(request, allowedMethods);
  if (!methodValidation.valid) {
    return methodValidation;
  }

  // Then validate CSRF (only for mutation methods)
  const mutationMethods = ["POST", "PUT", "PATCH", "DELETE"];
  if (mutationMethods.includes(request.method)) {
    return await validateCSRF(request);
  }

  // Safe methods (GET, HEAD, OPTIONS) don't need CSRF validation
  return { valid: true };
}

/**
 * Create a standardized CSRF error response
 *
 * @param error - Error message
 * @returns Response object with 403 status
 */
export function createCSRFErrorResponse(error: string): Response {
  return Response.json(
    {
      error: "CSRF validation failed",
      message: error,
    },
    { status: 403 }
  );
}
