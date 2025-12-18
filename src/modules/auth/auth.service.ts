/**
 * Authentication Service
 *
 * Business logic for authentication and authorization.
 * Handles user sessions, role checks, and permission validation.
 */

import { getSession } from "@/lib/auth/session";
import type { AuthUser, UserRole } from "./auth.types";

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getSession();
  if (!session?.dbUser) {
    return null;
  }

  // Session already contains the synced database user
  // Map it to AuthUser format
  return {
    id: session.dbUser.id,
    email: session.dbUser.email,
    name:
      session.dbUser.firstName && session.dbUser.lastName
        ? `${session.dbUser.firstName} ${session.dbUser.lastName}`
        : session.dbUser.firstName || session.dbUser.lastName || null,
    firstName: session.dbUser.firstName || null,
    lastName: session.dbUser.lastName || null,
    phone: session.dbUser.phone || null,
    role: session.dbUser.role as AuthUser["role"],
    emailVerified: session.user.primaryEmailVerified || false,
    emailNotificationPreferences:
      (session.dbUser.emailNotificationPreferences as
        | AuthUser["emailNotificationPreferences"]
        | null) || null,
    createdAt: session.dbUser.createdAt,
    updatedAt: session.dbUser.updatedAt,
  };
}

/**
 * Check if user has specific role
 */
export async function hasRole(role: UserRole): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === role;
}

/**
 * Check if user has any of the specified roles
 */
export async function hasAnyRole(roles: UserRole[]): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  return roles.includes(user.role);
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Authentication required");
  }
  return user;
}

/**
 * Require specific role - throws if user doesn't have role
 */
export async function requireRole(role: UserRole): Promise<AuthUser> {
  const user = await requireAuth();
  if (user.role !== role) {
    throw new Error(`Forbidden: ${role} role required`);
  }
  return user;
}
