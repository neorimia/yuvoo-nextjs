/**
 * PostHog Event Names
 *
 * Naming Convention: UPPERCASE_WITH_UNDERSCORES
 * Use descriptive, action-oriented names
 */
export const PostHogEvents = {
  // Authentication Events
  USER_SIGNED_UP: "user_signed_up",
  USER_LOGGED_IN: "user_logged_in",
  USER_LOGGED_OUT: "user_logged_out",
  EMAIL_VERIFIED: "email_verified",
  PASSWORD_RESET_REQUESTED: "password_reset_requested",
  PASSWORD_RESET_COMPLETED: "password_reset_completed",

  // Quiz Events
  QUIZ_STARTED: "quiz_started",
  QUIZ_STEP_COMPLETED: "quiz_step_completed",
  QUIZ_COMPLETED: "quiz_completed",
  QUIZ_ABANDONED: "quiz_abandoned",

  // Child Profile Events
  CHILD_PROFILE_CREATED: "child_profile_created",
  CHILD_PROFILE_UPDATED: "child_profile_updated",
  CHILD_PROFILE_DELETED: "child_profile_deleted",

  // Club Events
  CLUB_VIEWED: "club_viewed",
  CLUB_SEARCHED: "club_searched",
  CLUB_FILTERED: "club_filtered",
  CLUB_FAVORITED: "club_favorited",
  CLUB_UNFAVORITED: "club_unfavorited",
  CLUB_BOOKING_CREATED: "club_booking_created",
  CLUB_BOOKING_CONFIRMED: "club_booking_confirmed",
  CLUB_BOOKING_CANCELLED: "club_booking_cancelled",
  CLUBS_LANDING_CTA_CLICKED: "clubs_landing_cta_clicked",

  // Doctor Events
  DOCTOR_VIEWED: "doctor_viewed",
  DOCTOR_SEARCHED: "doctor_searched",
  DOCTOR_FILTERED: "doctor_filtered",
  DOCTOR_FAVORITED: "doctor_favorited",
  DOCTOR_UNFAVORITED: "doctor_unfavorited",
  DOCTOR_CONSULTATION_CREATED: "doctor_consultation_created",
  DOCTOR_CONSULTATION_CONFIRMED: "doctor_consultation_confirmed",
  DOCTOR_CONSULTATION_CANCELLED: "doctor_consultation_cancelled",
  DOCTOR_CONSULTATION_COMPLETED: "doctor_consultation_completed",

  // Onboarding Events
  ONBOARDING_STARTED: "onboarding_started",
  ONBOARDING_STEP_COMPLETED: "onboarding_step_completed",
  ONBOARDING_COMPLETED: "onboarding_completed",
  ONBOARDING_ABANDONED: "onboarding_abandoned",

  // Review Events
  REVIEW_SUBMITTED: "review_submitted",
  REVIEW_APPROVED: "review_approved",
  REVIEW_REJECTED: "review_rejected",

  // Email Events
  EMAIL_UNSUBSCRIBED: "email_unsubscribed",
  EMAIL_PREFERENCES_UPDATED: "email_preferences_updated",
  EMAIL_RESUBSCRIBED: "email_resubscribed",
} as const;

/**
 * PostHog Event Properties
 *
 * Naming Convention: camelCase
 * Use consistent property names across events
 */
export const PostHogProperties = {
  // User Properties
  USER_ID: "userId",
  USER_ROLE: "userRole",
  USER_EMAIL: "userEmail", // Only if explicitly needed and GDPR compliant

  // Quiz Properties
  QUIZ_ID: "quizId",
  CHILD_ID: "childId",
  CHILD_AGE: "childAge",
  QUIZ_STEP: "quizStep",
  TOTAL_STEPS: "totalSteps",
  RECOMMENDATIONS_COUNT: "recommendationsCount",

  // Club Properties
  CLUB_ID: "clubId",
  CLUB_SLUG: "clubSlug",
  CLUB_SPORT: "clubSport",
  CLUB_CITY: "clubCity",
  BOOKING_ID: "bookingId",
  BOOKING_STATUS: "bookingStatus",

  // Doctor Properties
  DOCTOR_ID: "doctorId",
  DOCTOR_SLUG: "doctorSlug",
  DOCTOR_SPECIALTY: "doctorSpecialty",
  CONSULTATION_ID: "consultationId",
  CONSULTATION_STATUS: "consultationStatus",

  // Onboarding Properties
  ONBOARDING_ROLE: "onboardingRole",
  ONBOARDING_STEP: "onboardingStep",
  ONBOARDING_TOTAL_STEPS: "onboardingTotalSteps",

  // Email Properties
  UNSUBSCRIBE_METHOD: "unsubscribeMethod", // "form" or "token"
  EMAIL_PREFERENCES: "emailPreferences",

  // Search/Filter Properties
  SEARCH_QUERY: "searchQuery",
  FILTER_TYPE: "filterType",
  FILTER_VALUE: "filterValue",

  // Review Properties
  REVIEW_ID: "reviewId",
  REVIEW_RATING: "reviewRating",
  REVIEW_TYPE: "reviewType", // "club" | "doctor"
} as const;

/**
 * Type-safe event tracking types
 */
export type PostHogEventName = (typeof PostHogEvents)[keyof typeof PostHogEvents];

/**
 * PostHog event properties type
 * Supports standard properties and PostHog person properties ($set, $set_once)
 */
export type PostHogEventProperties = {
  $set?: Record<string, string | number | boolean | undefined>;
  $set_once?: Record<string, string | number | boolean | undefined>;
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | Record<string, string | number | boolean | undefined>;
};
