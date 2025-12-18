/**
 * Authentication Types
 *
 * TypeScript types for authentication domain.
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
