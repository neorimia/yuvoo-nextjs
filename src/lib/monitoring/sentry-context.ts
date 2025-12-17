/**
 * Sentry Context Utilities
 *
 * Utilities for setting user context and additional metadata in Sentry.
 */

import * as Sentry from "@sentry/nextjs";

/**
 * Set user context in Sentry
 * Call this after user authentication to track user information with errors
 *
 * @param userId - User ID from Stack Auth
 * @param email - User email
 * @param role - User role (parent, club_admin, doctor, admin)
 * @param name - User name (optional)
 */
export function setSentryUserContext(
  userId: string,
  email?: string | null,
  role?: string | null,
  name?: string | null
): void {
  Sentry.setUser({
    id: userId,
    email: email || undefined,
    username: name || email || undefined,
    // Additional context
    role: role || undefined,
  });
}

/**
 * Clear user context in Sentry
 * Call this on logout
 */
export function clearSentryUserContext(): void {
  Sentry.setUser(null);
}

/**
 * Set additional context/tags for Sentry
 *
 * @param tags - Key-value pairs to add as tags
 */
export function setSentryTags(tags: Record<string, string>): void {
  Sentry.setTags(tags);
}

/**
 * Set additional context for Sentry
 *
 * @param key - Context key
 * @param context - Context data
 */
export function setSentryContext(key: string, context: Record<string, unknown>): void {
  Sentry.setContext(key, context);
}
