/**
 * Session Management Helpers
 *
 * Provides utilities for checking authentication status and getting user sessions.
 * Integrates Stack Auth with local database user sync.
 */

import { stackServerApp } from "./stack";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Sync Stack Auth user with local database
 * Creates or updates user record in local users table
 */
async function syncUserWithDatabase(stackUser: { id: string; primaryEmail: string | null }) {
  try {
    // Ensure we have an email (required for users table)
    if (!stackUser.primaryEmail) {
      throw new Error("User must have a primary email address");
    }

    // Check if user exists in local database
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.stackUserId, stackUser.id))
      .limit(1);

    if (existingUser.length > 0) {
      // Update existing user
      const [updatedUser] = await db
        .update(users)
        .set({
          email: stackUser.primaryEmail,
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser[0].id))
        .returning();

      return updatedUser;
    } else {
      // Create new user
      const [newUser] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          stackUserId: stackUser.id,
          email: stackUser.primaryEmail,
          role: "parent", // Default role
        })
        .returning();

      return newUser;
    }
  } catch (error) {
    console.error("Error syncing user with database:", error);
    throw error;
  }
}

/**
 * Get the current user session
 * @returns User session with Stack Auth user and local database user, or null if not authenticated
 */
export async function getSession() {
  try {
    const stackUser = await stackServerApp.getUser();
    if (!stackUser) return null;

    // Sync with local database
    const dbUser = await syncUserWithDatabase(stackUser);

    return {
      user: stackUser,
      dbUser,
    };
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Require authentication - throws if user is not authenticated
 * @returns User session with Stack Auth user and local database user
 * @throws Error if not authenticated
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Authentication required");
  }
  return session;
}

/**
 * Check if user has a specific role
 * @param role - Role to check (parent, club_admin, doctor, admin)
 * @returns true if user has the role, false otherwise
 */
export async function hasRole(role: "parent" | "club_admin" | "doctor" | "admin") {
  const session = await getSession();
  if (!session?.dbUser) return false;
  return session.dbUser.role === role;
}

/**
 * Require a specific role - throws if user doesn't have the role
 * @param role - Required role
 * @returns User session
 * @throws Error if not authenticated or doesn't have required role
 */
export async function requireRole(role: "parent" | "club_admin" | "doctor" | "admin") {
  const session = await requireAuth();
  if (session.dbUser.role !== role) {
    throw new Error(`Role '${role}' required`);
  }
  return session;
}
