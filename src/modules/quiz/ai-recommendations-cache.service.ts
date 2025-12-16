/**
 * AI Recommendations Cache Service
 *
 * Caches OpenAI responses for common quiz answer patterns.
 * Reduces API calls and improves response times.
 *
 * Cache Strategy:
 * - Cache key: SHA-256 hash of normalized quiz answers
 * - TTL: 7 days (1 week)
 * - Storage: In-memory cache (can be extended to Redis for production)
 *
 * Security: Uses cryptographic hash (SHA-256) to prevent collisions
 */

import { createHash } from "crypto";
import {
  generateRecommendations as generateRecommendationsOriginal,
  type RecommendationResult,
} from "./ai-recommendations.service";
import type { QuizAnswers, SportRecommendation, SpecialistRecommendation } from "./quiz.types";

// Re-export fallback function
export { generateFallbackRecommendations } from "./ai-recommendations.service";

interface CacheEntry {
  sportRecommendations: SportRecommendation[];
  specialistRecommendation?: SpecialistRecommendation;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

// In-memory cache (for MVP - can be replaced with Redis in production)
const cache = new Map<string, CacheEntry>();

// Cache TTL: 7 days
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Generate a secure cache key from quiz answers
 *
 * Normalizes answers to create a consistent cache key.
 * Uses SHA-256 cryptographic hash to prevent collisions.
 *
 * Security:
 * - SHA-256 provides 2^256 possible hashes (virtually collision-free)
 * - Deterministic: same input always produces same hash
 * - Fixed-length output: 64 hexadecimal characters
 *
 * @param answers - Quiz answers to hash
 * @returns Cache key in format "quiz:{sha256_hash}"
 */
function generateCacheKey(answers: QuizAnswers): string {
  // Normalize answers for consistent caching
  // Only include fields that significantly affect recommendations
  const normalized = {
    age: answers.age,
    energyLevel: answers.energyLevel,
    personality: [...(answers.personality || [])].sort().join(","),
    interests: [...(answers.interests || [])].sort().join(","),
    previousSports: [...(answers.previousSports || [])].sort().join(","),
    physicalBuild: answers.physicalBuild,
    preferences: {
      indoor: answers.preferences?.indoor || false,
      outdoor: answers.preferences?.outdoor || false,
      team: answers.preferences?.team || false,
      individual: answers.preferences?.individual || false,
    },
  };

  // Create deterministic JSON string (keys are already ordered consistently)
  const keyString = JSON.stringify(normalized);

  // Generate SHA-256 cryptographic hash (collision-resistant)
  const hash = createHash("sha256").update(keyString).digest("hex");

  return `quiz:${hash}`;
}

/**
 * Get cached recommendations if available and not expired
 */
function getCached(key: string): RecommendationResult | null {
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  // Check if cache entry is expired
  const now = Date.now();
  if (now - entry.timestamp > entry.ttl) {
    // Remove expired entry
    cache.delete(key);
    return null;
  }

  return {
    sportRecommendations: entry.sportRecommendations,
    specialistRecommendation: entry.specialistRecommendation,
  };
}

/**
 * Store recommendations in cache
 */
function setCached(key: string, result: RecommendationResult): void {
  cache.set(key, {
    sportRecommendations: result.sportRecommendations,
    specialistRecommendation: result.specialistRecommendation,
    timestamp: Date.now(),
    ttl: CACHE_TTL_MS,
  });
}

/**
 * Generate recommendations with caching
 *
 * Checks cache first, then calls OpenAI if cache miss.
 * Automatically caches successful responses.
 *
 * @param answers - Complete quiz answers
 * @returns Recommendation result with sport recommendations and optional specialist recommendation
 */
export async function generateRecommendationsWithCache(
  answers: QuizAnswers
): Promise<RecommendationResult> {
  // Generate cache key
  const cacheKey = generateCacheKey(answers);

  // Check cache first
  const cached = getCached(cacheKey);
  if (cached) {
    console.log(`Cache hit for quiz pattern: ${cacheKey}`);
    return cached;
  }

  // Cache miss - generate recommendations
  console.log(`Cache miss for quiz pattern: ${cacheKey}`);
  const result = await generateRecommendationsOriginal(answers);

  // Store in cache
  setCached(cacheKey, result);

  return result;
}

/**
 * Clear expired cache entries
 *
 * Can be called periodically to clean up expired entries.
 */
export function clearExpiredCache(): void {
  const now = Date.now();
  let cleared = 0;

  for (const [key, entry] of cache.entries()) {
    if (now - entry.timestamp > entry.ttl) {
      cache.delete(key);
      cleared++;
    }
  }

  if (cleared > 0) {
    console.log(`Cleared ${cleared} expired cache entries`);
  }
}

/**
 * Get cache statistics
 *
 * Useful for monitoring cache performance.
 */
export function getCacheStats(): {
  size: number;
  hitRate?: number; // Would need to track hits/misses for accurate rate
} {
  return {
    size: cache.size,
  };
}

/**
 * Clear all cache entries
 *
 * Useful for testing or cache invalidation.
 */
export function clearCache(): void {
  cache.clear();
  console.log("Cache cleared");
}
