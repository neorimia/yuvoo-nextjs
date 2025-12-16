/**
 * Performance Optimization Utilities
 *
 * Utilities for optimizing application performance including:
 * - Query result caching
 * - Debouncing and throttling
 * - Memory management
 * - Performance monitoring
 */

/**
 * Simple in-memory cache with TTL (Time To Live)
 */
class SimpleCache<T> {
  private cache: Map<string, { value: T; expiresAt: number }> = new Map();

  /**
   * Set cache value with TTL
   *
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttlMs - Time to live in milliseconds
   */
  set(key: string, value: T, ttlMs: number): void {
    const expiresAt = Date.now() + ttlMs;
    this.cache.set(key, { value, expiresAt });
  }

  /**
   * Get cache value if not expired
   *
   * @param key - Cache key
   * @returns Cached value or undefined if not found/expired
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Delete cache entry
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all expired entries
   */
  clearExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }
}

// Global cache instances
export const queryCache = new SimpleCache<unknown>();
export const searchCache = new SimpleCache<unknown>();

/**
 * Debounce function execution
 *
 * @param func - Function to debounce
 * @param waitMs - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  waitMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, waitMs);
  };
}

/**
 * Throttle function execution
 *
 * @param func - Function to throttle
 * @param limitMs - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limitMs: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limitMs);
    }
  };
}

/**
 * Generate cache key from object
 *
 * @param prefix - Cache key prefix
 * @param params - Parameters to include in key
 * @returns Cache key string
 */
export function generateCacheKey(prefix: string, params: Record<string, unknown>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}:${JSON.stringify(params[key])}`)
    .join("|");
  return `${prefix}:${sortedParams}`;
}

/**
 * Cache query result with automatic expiration
 *
 * @param key - Cache key
 * @param queryFn - Function that returns the query result
 * @param ttlMs - Time to live in milliseconds (default: 5 minutes)
 * @returns Cached or fresh query result
 */
export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  ttlMs: number = 5 * 60 * 1000 // 5 minutes default
): Promise<T> {
  // Check cache first
  const cached = queryCache.get(key);
  if (cached !== undefined) {
    return cached as T;
  }

  // Execute query
  const result = await queryFn();

  // Cache result
  queryCache.set(key, result, ttlMs);

  return result;
}

/**
 * Performance monitoring utilities
 */
export const performanceMonitor = {
  /**
   * Measure execution time of async function
   */
  async measureAsync<T>(
    label: string,
    fn: () => Promise<T>
  ): Promise<{ result: T; duration: number }> {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;

    if (process.env.NODE_ENV === "development") {
      console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
    }

    return { result, duration };
  },

  /**
   * Measure execution time of sync function
   */
  measureSync<T>(label: string, fn: () => T): { result: T; duration: number } {
    const start = performance.now();
    const result = fn();
    const duration = performance.now() - start;

    if (process.env.NODE_ENV === "development") {
      console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
    }

    return { result, duration };
  },
};

/**
 * Cleanup expired cache entries periodically
 * Call this in a background task or on app startup
 */
export function startCacheCleanup(intervalMs: number = 60 * 1000): NodeJS.Timeout {
  return setInterval(() => {
    queryCache.clearExpired();
    searchCache.clearExpired();
  }, intervalMs);
}
