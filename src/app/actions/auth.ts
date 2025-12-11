/**
 * Authentication Server Actions
 *
 * Server Actions for authentication and authorization.
 */

"use server";

import { getCurrentUser, requireAuth, requireRole } from "@/modules/auth/auth.service";
import type { AuthUser, UserRole } from "@/modules/auth/auth.types";

/**
 * Get current authenticated user
 */
export async function getCurrentUserAction(): Promise<AuthUser | null> {
  try {
    return await getCurrentUser();
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuthAction(): Promise<AuthUser> {
  try {
    return await requireAuth();
  } catch {
    throw new Error("Autentificare necesară");
  }
}

/**
 * Require specific role - throws if user doesn't have role
 */
export async function requireRoleAction(role: UserRole): Promise<AuthUser> {
  try {
    return await requireRole(role);
  } catch {
    throw new Error(`Rolul ${role} este necesar`);
  }
}
