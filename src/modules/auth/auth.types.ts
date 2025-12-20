/**
 * Authentication Types
 *
 * TypeScript types for authentication domain.
 */

/**
 * User Role Enum
 * Single source of truth for all user roles in the application.
 */
export enum UserRoleEnum {
  PARENT = "parent",
  CLUB_ADMIN = "club_admin",
  DOCTOR = "doctor",
  ADMIN = "admin",
}

/**
 * User Role Type
 * Union type for backward compatibility with existing code.
 * Prefer using UserRoleEnum for new code.
 */
export type UserRole = "parent" | "club_admin" | "doctor" | "admin";

export interface EmailNotificationPreferences {
  bookingCreated: boolean;
  bookingConfirmed: boolean;
  bookingCancelled: boolean;
  bookingCompleted: boolean;
  bookingReminder: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  role: UserRole;
  emailVerified: boolean;
  emailNotificationPreferences: EmailNotificationPreferences | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: AuthUser;
  expiresAt: Date;
}
