/**
 * CORS (Cross-Origin Resource Sharing) Utilities for API Routes
 *
 * Provides CORS configuration and validation for Next.js API routes.
 * By default, Next.js API routes are same-origin only (no CORS headers).
 * Use this utility to enable CORS for specific API routes that need cross-origin access.
 *
 * ⚠️ IMPORTANT: Only enable CORS for API routes that need cross-origin access.
 * Most API routes should remain same-origin only for security.
 *
 * Usage:
 * ```typescript
 * import { handleCORS, createCORSResponse } from "@/lib/security/cors";
 *
 * export async function GET(request: Request) {
 *   // Handle preflight requests
 *   const corsResponse = handleCORS(request);
 *   if (corsResponse) return corsResponse;
 *
 *   // ... rest of handler
 *   return Response.json({ data: "..." });
 * }
 * ```
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Allowed origins for CORS
 * Configure via ALLOWED_ORIGINS environment variable or use defaults
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
 * Allowed HTTP methods for CORS
 */
const DEFAULT_ALLOWED_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"];

/**
 * Allowed headers for CORS
 */
const DEFAULT_ALLOWED_HEADERS = [
  "Content-Type",
  "Authorization",
  "X-Requested-With",
  "Accept",
  "Origin",
];

/**
 * CORS configuration options
 */
export interface CORSOptions {
  allowedOrigins?: string[];
  allowedMethods?: string[];
  allowedHeaders?: string[];
  allowCredentials?: boolean;
  maxAge?: number;
}

/**
 * Check if origin is allowed
 */
function isOriginAllowed(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) {
    return false;
  }

  return allowedOrigins.some((allowed) => {
    // Exact match
    if (allowed === origin) {
      return true;
    }

    // Wildcard support (use with caution)
    if (allowed === "*") {
      return true;
    }

    // Pattern matching (e.g., "https://*.example.com")
    const pattern = allowed.replace(/\*/g, ".*");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(origin);
  });
}

/**
 * Handle CORS preflight requests (OPTIONS)
 *
 * Returns a response with CORS headers if it's a preflight request,
 * or null if it's not a preflight request.
 *
 * @param request - The incoming request
 * @param options - CORS configuration options
 * @returns CORS response for preflight, or null for regular requests
 */
export function handleCORS(request: NextRequest, options: CORSOptions = {}): NextResponse | null {
  const {
    allowedOrigins = getAllowedOrigins(),
    allowedMethods = DEFAULT_ALLOWED_METHODS,
    allowedHeaders = DEFAULT_ALLOWED_HEADERS,
    allowCredentials = false,
    maxAge = 86400, // 24 hours
  } = options;

  const origin = request.headers.get("origin");
  const method = request.method;

  // Handle preflight requests (OPTIONS)
  if (method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 }); // No Content

    // Set CORS headers
    if (origin && isOriginAllowed(origin, allowedOrigins)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Methods", allowedMethods.join(", "));
      response.headers.set("Access-Control-Allow-Headers", allowedHeaders.join(", "));
      response.headers.set("Access-Control-Max-Age", maxAge.toString());

      if (allowCredentials) {
        response.headers.set("Access-Control-Allow-Credentials", "true");
      }
    } else {
      // Origin not allowed
      return new NextResponse(null, { status: 403 });
    }

    return response;
  }

  // Not a preflight request
  return null;
}

/**
 * Add CORS headers to a response
 *
 * Use this for regular (non-preflight) requests to add CORS headers.
 *
 * @param response - The response to add CORS headers to
 * @param request - The incoming request
 * @param options - CORS configuration options
 * @returns Response with CORS headers added
 */
export function addCORSHeaders(
  response: NextResponse,
  request: NextRequest,
  options: CORSOptions = {}
): NextResponse {
  const {
    allowedOrigins = getAllowedOrigins(),
    allowedMethods = DEFAULT_ALLOWED_METHODS,
    allowedHeaders = DEFAULT_ALLOWED_HEADERS,
    allowCredentials = false,
  } = options;

  const origin = request.headers.get("origin");

  // Only add CORS headers if origin is allowed
  if (origin && isOriginAllowed(origin, allowedOrigins)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", allowedMethods.join(", "));
    response.headers.set("Access-Control-Allow-Headers", allowedHeaders.join(", "));

    if (allowCredentials) {
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }

    // Expose headers that the client can access
    response.headers.set("Access-Control-Expose-Headers", "Content-Length, Content-Type");
  }

  return response;
}

/**
 * Create a CORS-enabled response
 *
 * Convenience function that creates a response with CORS headers.
 *
 * @param data - Response data (will be JSON stringified)
 * @param request - The incoming request
 * @param options - CORS configuration options
 * @param status - HTTP status code (default: 200)
 * @returns Response with CORS headers
 */
export function createCORSResponse(
  data: unknown,
  request: NextRequest,
  options: CORSOptions = {},
  status: number = 200
): NextResponse {
  const response = NextResponse.json(data, { status });
  return addCORSHeaders(response, request, options);
}

/**
 * Create a CORS error response
 *
 * @param error - Error message
 * @param request - The incoming request
 * @param options - CORS configuration options
 * @param status - HTTP status code (default: 400)
 * @returns Error response with CORS headers
 */
export function createCORSErrorResponse(
  error: string,
  request: NextRequest,
  options: CORSOptions = {},
  status: number = 400
): NextResponse {
  return createCORSResponse({ error }, request, options, status);
}
