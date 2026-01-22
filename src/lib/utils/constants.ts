/**
 * App-wide Constants
 *
 * Shared constants used throughout the application.
 *
 * Note: For routes and paths, use `@/lib/routes` instead.
 */

// Sports types
// Note: Sport names match database seed data format (e.g., "inot" not "înot", "gimnastica" not "gimnastică")
// All sport types available in the database seed data
export const SPORT_TYPES = [
  "atletism",
  "badminton",
  "baschet",
  "baseball",
  "box",
  "ciclism",
  "dans",
  "echitatie",
  "escalada",
  "fotbal",
  "gimnastica",
  "handbal",
  "hochei",
  "hochei-ghata",
  "inot",
  "judo",
  "karate",
  "karting",
  "kickboxing",
  "lupte",
  "multi-sport",
  "patinaj",
  "patinaj-ghata",
  "polo-apa",
  "rugby",
  "schi",
  "scrima",
  "snowboard",
  "taekwondo",
  "tenis",
  "tenis-de-masa",
  "volei",
] as const;

// Doctor specialties
export const DOCTOR_SPECIALTIES = [
  "medic pediatru",
  "kineziterapeut",
  "nutriționist",
  "psiholog",
] as const;

// Common doctor credentials
export const COMMON_DOCTOR_CREDENTIALS = [
  "Dr.",
  "Dr. med.",
  "Conf. Dr.",
  "Prof. Dr.",
  "Medic specialist",
  "Medic primar",
  "Specialist",
  "Primar",
  "MD",
  "PhD",
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
