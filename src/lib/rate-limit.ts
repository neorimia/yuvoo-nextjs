/**
 * Rate Limiting Utility
 *
 * Simple in-memory rate limiter for MVP deployment.
 * Prevents abuse of quiz submissions and OpenAI API costs.
 *
 * Security Features:
 * - Per-user rate limiting (authenticated users)
 * - Per-IP rate limiting (anonymous users)
 * - Automatic cleanup of expired entries
 * - Romanian error messages
 *
 * Production Recommendation:
 * For multi-server deployments, migrate to Redis-backed solution (@upstash/ratelimit)
 */

/**
 * Rate limit entry stored in memory
 */
interface RateLimitEntry {
  count: number; // Number of attempts in current window
  resetAt: number; // Timestamp when window resets (ms)
}

/**
 * In-memory store for rate limit tracking
 * Note: This will be cleared on server restart
 * For production, use Redis for persistence across instances
 */
const store = new Map<string, RateLimitEntry>();

/**
 * Cleanup expired entries every 5 minutes to prevent memory leaks
 * Runs automatically in the background
 */
setInterval(
  () => {
    const now = Date.now();
    let cleaned = 0;

    // Convert to array to avoid iterator issues
    const entries = Array.from(store.entries());
    for (const [key, entry] of entries) {
      if (now > entry.resetAt) {
        store.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`[RateLimit] Cleaned ${cleaned} expired entries`);
    }
  },
  5 * 60 * 1000
); // Every 5 minutes

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  /**
   * Maximum number of attempts allowed in the time window
   * Default: 3 attempts
   */
  maxAttempts: number;

  /**
   * Time window in milliseconds
   * Default: 1 hour (3600000 ms)
   */
  windowMs: number;
}

/**
 * Rate limit result
 */
export interface RateLimitResult {
  /**
   * Whether the request is allowed
   * true = allowed, false = rate limited
   */
  success: boolean;

  /**
   * Number of attempts remaining in current window
   * 0 if rate limited
   */
  remaining: number;

  /**
   * Timestamp (ms) when the rate limit resets
   */
  resetAt: number;

  /**
   * Human-readable reset time for error messages
   */
  resetTime?: string;
}

/**
 * Default rate limit configuration for quiz submissions
 */
const DEFAULT_QUIZ_CONFIG: RateLimitConfig = {
  maxAttempts: 3, // 3 quizzes
  windowMs: 60 * 60 * 1000, // per hour
};

/**
 * Predefined rate limit configurations for different actions
 */
export const RATE_LIMIT_CONFIGS = {
  // Authentication
  SIGN_IN: {
    maxAttempts: 5, // 5 login attempts
    windowMs: 15 * 60 * 1000, // per 15 minutes (prevent brute force)
  },
  SIGN_UP: {
    maxAttempts: 3, // 3 registrations
    windowMs: 60 * 60 * 1000, // per hour (prevent spam)
  },
  FORGOT_PASSWORD: {
    maxAttempts: 3, // 3 password reset requests
    windowMs: 60 * 60 * 1000, // per hour (prevent email spam)
  },
  RESET_PASSWORD: {
    maxAttempts: 5, // 5 password reset attempts
    windowMs: 60 * 60 * 1000, // per hour
  },
  // Uploads
  UPLOAD_IMAGE: {
    maxAttempts: 10, // 10 image uploads
    windowMs: 60 * 60 * 1000, // per hour (prevent storage abuse)
  },
  UPLOAD_DOCUMENT: {
    maxAttempts: 20, // 20 document uploads (allows for onboarding: 4-10 required + retries)
    windowMs: 60 * 60 * 1000, // per hour (prevent storage abuse)
  },
  // Bookings
  CREATE_BOOKING: {
    maxAttempts: 10, // 10 bookings
    windowMs: 60 * 60 * 1000, // per hour (prevent spam bookings)
  },
  // Search (public endpoints)
  SEARCH: {
    maxAttempts: 30, // 30 searches
    windowMs: 60 * 1000, // per minute (prevent abuse)
  },
  // Quiz (already defined, but exported for consistency)
  QUIZ: DEFAULT_QUIZ_CONFIG,
  // Guest Payments
  GUEST_PAYMENT: {
    maxAttempts: 5, // 5 payment attempts
    windowMs: 60 * 60 * 1000, // per hour (prevent abuse)
  },
} as const;

/**
 * Check rate limit for an identifier
 *
 * @param identifier - Unique identifier (user ID or IP address)
 * @param config - Rate limit configuration (optional, uses defaults if not provided)
 * @returns Rate limit result with success status and remaining attempts
 */
export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_QUIZ_CONFIG
): Promise<RateLimitResult> {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  let entry = store.get(key);

  // Create new entry if doesn't exist or window has expired
  if (!entry || now > entry.resetAt) {
    entry = {
      count: 0,
      resetAt: now + config.windowMs,
    };
    store.set(key, entry);
  }

  // Check if limit exceeded
  if (entry.count >= config.maxAttempts) {
    // Calculate human-readable reset time
    const resetDate = new Date(entry.resetAt);
    const resetTime = resetDate.toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
      resetTime,
    };
  }

  // Increment counter (allow the request)
  entry.count++;

  return {
    success: true,
    remaining: config.maxAttempts - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Get client identifier for rate limiting from headers
 *
 * Helper function for Server Actions that don't have direct Request access.
 * Extracts IP from Next.js headers() API.
 *
 * @param userId - Optional user ID from session
 * @param headers - Headers object from Next.js headers()
 * @returns Identifier string for rate limiting
 */
export function getClientIdentifierFromHeaders(userId?: string, headers?: Headers): string {
  // Prefer user ID for authenticated users
  if (userId) {
    return `user:${userId}`;
  }

  // Fallback to IP address for anonymous users
  if (headers) {
    // Check common proxy headers (in order of preference)
    const forwarded = headers.get("x-forwarded-for");
    const realIp = headers.get("x-real-ip");
    const cfConnectingIp = headers.get("cf-connecting-ip"); // Cloudflare

    // Extract IP address
    let ip: string;

    if (forwarded) {
      // X-Forwarded-For can contain multiple IPs (client, proxy1, proxy2)
      // Take the first one (original client IP)
      ip = forwarded.split(",")[0].trim();
    } else if (cfConnectingIp) {
      ip = cfConnectingIp;
    } else if (realIp) {
      ip = realIp;
    } else {
      ip = "unknown";
    }

    return `ip:${ip}`;
  }

  // Last resort fallback
  return "unknown";
}

/**
 * Get client identifier for rate limiting
 *
 * Priority order:
 * 1. User ID (authenticated users) - most reliable
 * 2. IP address (anonymous users) - fallback
 * 3. "unknown" - last resort
 *
 * @param userId - Optional user ID from session
 * @param request - Optional request object to extract IP
 * @returns Identifier string for rate limiting
 */
export function getClientIdentifier(userId?: string, request?: Request): string {
  // Prefer user ID for authenticated users
  if (userId) {
    return `user:${userId}`;
  }

  // Fallback to IP address for anonymous users
  if (request) {
    // Check common proxy headers (in order of preference)
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const cfConnectingIp = request.headers.get("cf-connecting-ip"); // Cloudflare

    // Extract IP address
    let ip: string;

    if (forwarded) {
      // X-Forwarded-For can contain multiple IPs (client, proxy1, proxy2)
      // Take the first one (original client IP)
      ip = forwarded.split(",")[0].trim();
    } else if (cfConnectingIp) {
      ip = cfConnectingIp;
    } else if (realIp) {
      ip = realIp;
    } else {
      ip = "unknown";
    }

    return `ip:${ip}`;
  }

  // Last resort fallback
  return "unknown";
}

/**
 * Get rate limit statistics (for monitoring)
 *
 * @returns Current statistics about rate limiting
 */
export function getRateLimitStats(): {
  totalEntries: number;
  activeEntries: number;
  expiredEntries: number;
} {
  const now = Date.now();
  let active = 0;
  let expired = 0;

  // Convert to array to avoid iterator issues
  const entries = Array.from(store.values());
  for (const entry of entries) {
    if (now > entry.resetAt) {
      expired++;
    } else {
      active++;
    }
  }

  return {
    totalEntries: store.size,
    activeEntries: active,
    expiredEntries: expired,
  };
}

/**
 * Clear all rate limit entries (for testing only)
 *
 * WARNING: Only use in test environment
 */
export function clearRateLimitStore(): void {
  store.clear();
  console.log("[RateLimit] Store cleared");
}
