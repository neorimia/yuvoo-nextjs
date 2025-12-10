/**
 * Session Management Helpers
 *
 * Provides utilities for checking authentication status and getting user sessions.
 */

import { stackServerApp } from "./stack";

/**
 * Get the current user session
 * @returns User session or null if not authenticated
 */
export async function getSession() {
  try {
    const user = await stackServerApp.getUser();
    if (!user) return null;

    // TODO: Sync with local users table
    // const dbUser = await syncUserWithDatabase(user);

    return {
      user,
      // dbUser,
    };
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Require authentication - throws if user is not authenticated
 * @returns User session
 * @throws Error if not authenticated
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Authentication required");
  }
  return session;
}
