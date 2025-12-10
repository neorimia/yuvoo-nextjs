/**
 * App-wide Constants
 *
 * Shared constants used throughout the application.
 *
 * Note: For routes and paths, use `@/lib/routes` instead.
 */

// Sports types (will be expanded)
export const SPORT_TYPES = [
  "fotbal",
  "baschet",
  "tenis",
  "înot",
  "gimnastică",
  "dans",
  "karate",
  "volei",
  "handbal",
  "atletism",
] as const;

// Doctor specialties
export const DOCTOR_SPECIALTIES = [
  "medic pediatru",
  "kineziterapeut",
  "nutriționist",
  "psiholog",
] as const;

// Booking types
export const BOOKING_TYPES = {
  CLUB_TRIAL: "club_trial",
  DOCTOR_CONSULTATION: "doctor_consultation",
} as const;

// Booking statuses
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const;
