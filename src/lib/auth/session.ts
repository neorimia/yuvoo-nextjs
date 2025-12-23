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
import { UserRoleEnum } from "@/modules/auth/auth.types";

/**
 * Sync Stack Auth user with local database
 * Creates or updates user record in local users table
 * Reads role from Stack Auth clientMetadata if available
 */
async function syncUserWithDatabase(stackUser: {
  id: string;
  primaryEmail: string | null;
  clientMetadata?: Record<string, unknown> | null;
}) {
  try {
    // Ensure we have an email (required for users table)
    if (!stackUser.primaryEmail) {
      throw new Error("User must have a primary email address");
    }

    let role: "parent" | "club_admin" | "doctor" | "admin" = UserRoleEnum.PARENT; // Default role

    // Extract role from Stack Auth clientMetadata if available
    if (stackUser.clientMetadata && typeof stackUser.clientMetadata === "object") {
      const metadata = stackUser.clientMetadata;
      if (metadata.role && typeof metadata.role === "string") {
        const roleValue = metadata.role as unknown as UserRoleEnum;
        if (
          [
            UserRoleEnum.PARENT,
            UserRoleEnum.CLUB_ADMIN,
            UserRoleEnum.DOCTOR,
            UserRoleEnum.ADMIN,
          ].includes(roleValue)
        ) {
          role = roleValue as typeof role;
        }
      }
    }

    // Check if user exists in local database
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.stackUserId, stackUser.id))
      .limit(1);

    if (existingUser.length > 0) {
      // Update existing user (only update role if it's different and we have it from metadata)
      const updateData: { email: string; updatedAt: Date; role?: typeof role } = {
        email: stackUser.primaryEmail,
        updatedAt: new Date(),
      };

      // Only update role if we got it from metadata and it's different
      if (role !== existingUser[0].role && role !== UserRoleEnum.PARENT) {
        updateData.role = role;
      }

      const [updatedUser] = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, existingUser[0].id))
        .returning();

      return updatedUser;
    } else {
      // Create new user with role from metadata
      const [newUser] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          stackUserId: stackUser.id,
          email: stackUser.primaryEmail,
          role: role,
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
  // During production builds, return null to skip auth checks
  // This prevents "cookies() rejects during prerender" errors
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";
  if (isProductionBuild) {
    return null;
  }

  try {
    // Stack Auth 2.8.56+ handles Next.js 16's async cookies() API properly
    // Type assertion needed due to Stack Auth version compatibility
    // getUser() exists at runtime but TypeScript types may not reflect it
    const stackUser = await (
      stackServerApp as unknown as {
        getUser: () => Promise<{
          id: string;
          primaryEmail: string | null;
          primaryEmailVerified?: boolean;
          displayName?: string | null;
          clientMetadata?: Record<string, unknown> | null;
        } | null>;
      }
    ).getUser();
    if (!stackUser) return null;

    // Sync with local database
    const dbUser = await syncUserWithDatabase(stackUser);

    return {
      user: stackUser,
      dbUser,
    };
  } catch (error) {
    // Don't log during production builds to avoid noise
    if (process.env.NEXT_PHASE !== "phase-production-build") {
      console.error("Error getting session:", error);
    }
    return null;
  }
}

/**
 * Require authentication - throws if user is not authenticated
 * During production builds, returns mock session to prevent build failures
 * @returns User session with Stack Auth user and local database user
 * @throws Error if not authenticated (runtime only)
 */
export async function requireAuth() {
  // During production builds, return mock session
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";
  if (isProductionBuild) {
    // Use static date to avoid "new Date() used before Request data" error
    const staticDate = new Date("2024-01-01T00:00:00Z");
    return {
      user: {
        id: "build-mock",
        primaryEmail: "build@mock.com",
        primaryEmailVerified: false,
        displayName: "Build User",
      } as {
        id: string;
        primaryEmail: string | null;
        primaryEmailVerified?: boolean;
        displayName?: string | null;
      },
      dbUser: {
        id: "build-mock",
        stackUserId: "build-mock",
        email: "build@mock.com",
        role: UserRoleEnum.PARENT as const,
        firstName: null,
        lastName: null,
        phone: null,
        onboardingCompleted: false,
        profileCompletionPercentage: null,
        createdAt: staticDate,
        updatedAt: staticDate,
      },
    };
  }

  const session = await getSession();
  if (!session) {
    throw new Error("Authentication required");
  }
  return session;
}

/**
 * Check if user has a specific role
 * During production builds, returns false
 * @param role - Role to check (parent, club_admin, doctor, admin)
 * @returns true if user has the role, false otherwise
 */
export async function hasRole(role: "parent" | "club_admin" | "doctor" | "admin") {
  // During production builds, return false
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";
  if (isProductionBuild) {
    return false;
  }

  const session = await getSession();
  if (!session?.dbUser) return false;
  return session.dbUser.role === role;
}

/**
 * Require a specific role - throws if user doesn't have the role
 * During production builds, returns mock session with requested role
 * @param role - Required role
 * @returns User session
 * @throws Error if not authenticated or doesn't have required role (runtime only)
 */
export async function requireRole(role: "parent" | "club_admin" | "doctor" | "admin") {
  // During production builds, return mock session with requested role
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";
  if (isProductionBuild) {
    // Use static date to avoid "new Date() used before Request data" error
    const staticDate = new Date("2024-01-01T00:00:00Z");
    return {
      user: {
        id: "build-mock",
        primaryEmail: "build@mock.com",
        primaryEmailVerified: false,
        displayName: "Build User",
      } as {
        id: string;
        primaryEmail: string | null;
        primaryEmailVerified?: boolean;
        displayName?: string | null;
      },
      dbUser: {
        id: "build-mock",
        stackUserId: "build-mock",
        email: "build@mock.com",
        role,
        firstName: null,
        lastName: null,
        phone: null,
        onboardingCompleted: false,
        profileCompletionPercentage: null,
        createdAt: staticDate,
        updatedAt: staticDate,
      },
    };
  }

  const session = await requireAuth();
  if (session.dbUser.role !== role) {
    throw new Error(`Role '${role}' required`);
  }
  return session;
}
