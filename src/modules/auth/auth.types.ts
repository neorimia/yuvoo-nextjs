/**
 * Authentication Types
 *
 * TypeScript types for authentication domain.
 */

export type UserRole = "parent" | "club_admin" | "doctor" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: AuthUser;
  expiresAt: Date;
}
