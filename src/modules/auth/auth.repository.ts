/**
 * Authentication Repository
 *
 * Data access layer for user authentication data.
 * Handles database queries related to users and authentication using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { AuthUser } from "./auth.types";

/**
 * Map database user record to AuthUser type
 */
function mapDbUserToAuthUser(dbUser: typeof users.$inferSelect): AuthUser {
  return {
    id: dbUser.id,
    email: dbUser.email,
    name:
      dbUser.firstName && dbUser.lastName
        ? `${dbUser.firstName} ${dbUser.lastName}`
        : dbUser.firstName || dbUser.lastName || null,
    firstName: dbUser.firstName || null,
    lastName: dbUser.lastName || null,
    phone: dbUser.phone || null,
    role: dbUser.role as AuthUser["role"],
    emailVerified: true, // Stack Auth handles email verification
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
    emailNotificationPreferences:
      (dbUser.emailNotificationPreferences as AuthUser["emailNotificationPreferences"] | null) ||
      null,
  };
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<AuthUser | null> {
  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!dbUser) {
    return null;
  }

  return mapDbUserToAuthUser(dbUser);
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  const dbUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!dbUser) {
    return null;
  }

  return mapDbUserToAuthUser(dbUser);
}

/**
 * Get user by Stack Auth user ID
 */
export async function findByStackUserId(stackUserId: string): Promise<AuthUser | null> {
  const dbUser = await db.query.users.findFirst({
    where: eq(users.stackUserId, stackUserId),
  });

  if (!dbUser) {
    return null;
  }

  return mapDbUserToAuthUser(dbUser);
}

/**
 * Update user
 */
export async function update(
  userId: string,
  updates: Partial<{
    firstName: string;
    lastName: string;
    phone: string;
    role: AuthUser["role"];
    emailNotificationPreferences: AuthUser["emailNotificationPreferences"];
  }>
): Promise<AuthUser> {
  const updateData: Partial<typeof users.$inferInsert> = {
    updatedAt: new Date(),
  };

  if (updates.firstName !== undefined) {
    updateData.firstName = updates.firstName;
  }
  if (updates.lastName !== undefined) {
    updateData.lastName = updates.lastName;
  }
  if (updates.phone !== undefined) {
    updateData.phone = updates.phone;
  }
  if (updates.role !== undefined) {
    updateData.role = updates.role;
  }
  if (updates.emailNotificationPreferences !== undefined) {
    updateData.emailNotificationPreferences = updates.emailNotificationPreferences as unknown;
  }

  const [dbUser] = await db.update(users).set(updateData).where(eq(users.id, userId)).returning();

  if (!dbUser) {
    throw new Error("User not found");
  }

  return mapDbUserToAuthUser(dbUser);
}

export const authRepository = {
  getUserById,
  getUserByEmail,
  findByStackUserId,
  update,
};
