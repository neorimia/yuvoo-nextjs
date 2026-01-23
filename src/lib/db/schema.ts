/**
 * Database Schema - UPDATED FOR CLUB MONETIZATION
 *
 * Drizzle ORM schema definitions for Yuvoo.
 *
 * Tables:
 * - users: Parent, club admin, doctor, admin roles (UPDATED)
 * - children: Child profiles linked to parents
 * - quizzes: Quiz answers and AI recommendations
 * - clubs: Sports club information (UPDATED)
 * - doctors: Pediatric specialist profiles (UPDATED)
 * - bookings: Club trials and doctor consultations
 * - favorites: Saved clubs and doctors
 * - reviews: Club and doctor reviews (moderated)
 * - onboarding_progress: Cross-session onboarding state tracking
 * - uploads: File upload tracking for ownership verification
 * - audit_logs: Admin action audit trail for security and compliance
 * - locations: Single source of truth for Romanian counties, cities, and sectors
 * - payments: One-time payments for quiz reports
 * - report_access: Persistent access tokens for paid reports
 * - leads: Parent interest in clubs (locked until payment) (NEW)
 * - premium_club_status: Premium club subscription tracking (NEW)
 * - lead_payments: Pay-per-lead payments (3€ per lead) (NEW)
 */

import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", ["parent", "club_admin", "doctor", "admin"]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

// NEW: Verification status enum for clubs and doctors
export const verificationStatusEnum = pgEnum("verification_status", [
  "pending", // Initial state, no documents submitted
  "in_review", // Documents submitted, admin reviewing
  "approved", // Verified and approved
  "rejected", // Rejected, needs resubmission
]);

// Payment status enum
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending", // Payment created but not completed
  "completed", // Payment successfully completed
  "failed", // Payment failed
  "refunded", // Payment refunded
]);

// Lead status enum
export const leadStatusEnum = pgEnum("lead_status", [
  "nou", // New lead, just created
  "in_asteptare", // Waiting for club response (after reminder)
  "acceptat", // Accepted by club (payment completed or premium)
  "expirat", // Expired (5 days passed without acceptance)
]);

// Lead payment method enum
export const leadPaymentMethodEnum = pgEnum("lead_payment_method", [
  "pay_per_lead", // One-time payment per lead (3€)
  "premium", // Premium club subscription (unlimited leads)
]);

// Lead payment status enum (for Stripe payment intents)
export const leadPaymentStatusEnum = pgEnum("lead_payment_status", [
  "pending", // Payment intent created
  "succeeded", // Payment completed
  "failed", // Payment failed
]);

// Location type enum for Romania locations table
export const locationTypeEnum = pgEnum("location_type", [
  "county", // Județ (41 counties + Bucharest)
  "city", // Municipiu or oraș (cities)
  "sector", // Sector (Bucharest sectors 1-6)
]);

// Users table
export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    stackUserId: text("stack_user_id").notNull().unique(),
    email: text("email").notNull().unique(),
    role: userRoleEnum("role").notNull().default("parent"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    phone: text("phone"),

    // NEW: Location foreign keys (Phase 1: nullable, optional for parent location preferences)
    cityId: text("city_id").references(() => locations.id, { onDelete: "set null" }), // Optional foreign key to locations (type='city')
    sectorId: text("sector_id").references(() => locations.id, { onDelete: "set null" }), // Optional foreign key to locations (type='sector', for Bucharest parents)
    countyId: text("county_id").references(() => locations.id, { onDelete: "set null" }), // Optional denormalized foreign key to locations (type='county')

    // NEW: Onboarding tracking fields
    onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
    profileCompletionPercentage: integer("profile_completion_percentage").default(0),

    // Email notification preferences (JSONB for flexibility)
    emailNotificationPreferences: jsonb("email_notification_preferences"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes for user queries
    emailIdx: index("idx_users_email").on(table.email),
    stackUserIdIdx: index("idx_users_stack_user_id").on(table.stackUserId),
    roleIdx: index("idx_users_role").on(table.role),
    // NEW: Foreign key indexes for location queries (Phase 1)
    cityIdIdx: index("idx_users_city_id").on(table.cityId),
    sectorIdIdx: index("idx_users_sector_id").on(table.sectorId),
    countyIdIdx: index("idx_users_county_id").on(table.countyId),
  })
);

// Children table
export const children = pgTable(
  "children",
  {
    id: text("id").primaryKey(),
    parentId: text("parent_id")
      .notNull()
      .references(() => users.id),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    dateOfBirth: timestamp("date_of_birth").notNull(),
    gender: text("gender"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes for children queries
    parentIdIdx: index("idx_children_parent_id").on(table.parentId),
  })
);

// Quizzes table
export const quizzes = pgTable(
  "quizzes",
  {
    id: text("id").primaryKey(),
    childId: text("child_id")
      .notNull()
      .references(() => children.id),
    answers: jsonb("answers").notNull(), // Quiz answers as JSON
    recommendations: jsonb("recommendations"), // AI recommendations as JSON
    email: text("email"), // Email collected at gate (for payment flow)
    location: text("location"), // City/location for local club recommendations
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes for quiz queries
    childIdIdx: index("idx_quizzes_child_id").on(table.childId),
    createdAtIdx: index("idx_quizzes_created_at").on(table.createdAt),
    childCreatedIdx: index("idx_quizzes_child_created").on(table.childId, table.createdAt),
    emailIdx: index("idx_quizzes_email").on(table.email),
    locationIdx: index("idx_quizzes_location").on(table.location),
  })
);

// Clubs table
export const clubs = pgTable(
  "clubs",
  {
    id: text("id").primaryKey(),
    adminUserId: text("admin_user_id").references(() => users.id), // Link to club admin user

    // Basic info
    name: text("name").notNull(),
    slug: text("slug").unique(), // SEO-friendly URL slug
    description: text("description"),
    sportType: text("sport_type").notNull(),

    // Location
    // Phase 6: Removed city and district text columns - use foreign keys (cityId, sectorId) instead
    address: text("address"),
    latitude: text("latitude"),
    longitude: text("longitude"),

    // Location foreign keys (Phase 3: NOT NULL enforced after data migration)
    cityId: text("city_id")
      .notNull()
      .references(() => locations.id, { onDelete: "restrict" }), // Foreign key to locations (type='city') - REQUIRED
    sectorId: text("sector_id").references(() => locations.id, { onDelete: "restrict" }), // Foreign key to locations (type='sector', optional for Bucharest)
    countyId: text("county_id")
      .notNull()
      .references(() => locations.id, { onDelete: "restrict" }), // Denormalized foreign key to locations (type='county') for performance - REQUIRED

    // Contact
    phone: text("phone"),
    email: text("email"),
    website: text("website"),

    // Schedule (JSONB array of schedule entries)
    schedule: jsonb("schedule").default(sql`'[]'::jsonb`),

    // Pricing (JSONB array of pricing options)
    pricing: jsonb("pricing").default(sql`'[]'::jsonb`),

    // Age groups and levels
    ageGroups: integer("age_groups")
      .array()
      .default(sql`'{}'::integer[]`),
    experienceLevels: text("experience_levels")
      .array()
      .default(sql`'{}'::text[]`),

    // Media
    logoUrl: text("logo_url"),
    galleryUrls: text("gallery_urls")
      .array()
      .default(sql`'{}'::text[]`),

    // NEW: Verification fields
    profileComplete: boolean("profile_complete").notNull().default(false),
    verificationStatus: verificationStatusEnum("verification_status").notNull().default("pending"),
    verificationDocuments: text("verification_documents")
      .array()
      .default(sql`'{}'::text[]`),

    // Legacy fields (keep for compatibility)
    verified: boolean("verified").default(false).notNull(),
    featured: boolean("featured").default(false).notNull(),
    rating: integer("rating").default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes for club queries
    slugIdx: index("idx_clubs_slug").on(table.slug),
    sportTypeIdx: index("idx_clubs_sport_type").on(table.sportType),
    verifiedIdx: index("idx_clubs_verified").on(table.verified),
    featuredIdx: index("idx_clubs_featured").on(table.featured),
    verificationStatusIdx: index("idx_clubs_verification_status").on(table.verificationStatus),
    // Composite indexes for common query patterns
    verifiedFeaturedIdx: index("idx_clubs_verified_featured").on(table.verified, table.featured),
    // Foreign key indexes for location queries (Phase 1)
    cityIdIdx: index("idx_clubs_city_id").on(table.cityId),
    sectorIdIdx: index("idx_clubs_sector_id").on(table.sectorId),
    countyIdIdx: index("idx_clubs_county_id").on(table.countyId),
    // Composite indexes with foreign keys (Phase 4: Index Updates)
    sportCityIdIdx: index("idx_clubs_sport_city_id").on(table.sportType, table.cityId),
    sportCountyIdIdx: index("idx_clubs_sport_county_id").on(table.sportType, table.countyId),
  })
);

// Doctors table
export const doctors = pgTable(
  "doctors",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id),

    // Basic info
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    title: text("title"), // "Dr.", "Conf. Dr.", etc.
    slug: text("slug").unique(), // SEO-friendly URL slug

    // Professional info
    specialty: text("specialty").notNull(), // Primary specialty
    secondarySpecialties: text("secondary_specialties")
      .array()
      .default(sql`'{}'::text[]`),
    credentials: text("credentials")
      .array()
      .default(sql`'{}'::text[]`), // ["MD", "Board Certified", ...]
    bio: text("bio"),
    yearsOfExperience: integer("years_of_experience"),
    languages: text("languages")
      .array()
      .default(sql`'{}'::text[]`), // ["Română", "Engleză", ...]

    // Location
    // Phase 6: Removed city and district text columns - use foreign keys (cityId, sectorId) instead
    address: text("address"),

    // Location foreign keys (Phase 3: NOT NULL enforced after data migration)
    cityId: text("city_id")
      .notNull()
      .references(() => locations.id, { onDelete: "restrict" }), // Foreign key to locations (type='city') - REQUIRED
    sectorId: text("sector_id").references(() => locations.id, { onDelete: "restrict" }), // Foreign key to locations (type='sector', optional for Bucharest)
    countyId: text("county_id")
      .notNull()
      .references(() => locations.id, { onDelete: "restrict" }), // Denormalized foreign key to locations (type='county') for performance - REQUIRED

    // Contact
    phone: text("phone"),
    email: text("email"),
    website: text("website"),

    // Availability
    acceptingNewPatients: boolean("accepting_new_patients").default(true).notNull(),
    onlineConsultations: boolean("online_consultations").default(false).notNull(),

    // Schedule (JSONB array)
    schedule: jsonb("schedule").default(sql`'[]'::jsonb`),

    // Media
    photoUrl: text("photo_url"),

    // NEW: Verification fields
    profileComplete: boolean("profile_complete").notNull().default(false),
    verificationStatus: verificationStatusEnum("verification_status").notNull().default("pending"),
    verificationDocuments: text("verification_documents")
      .array()
      .default(sql`'{}'::text[]`),

    // Legacy fields
    verified: boolean("verified").default(false).notNull(),
    rating: integer("rating").default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes for doctor queries
    slugIdx: index("idx_doctors_slug").on(table.slug),
    specialtyIdx: index("idx_doctors_specialty").on(table.specialty),
    verifiedIdx: index("idx_doctors_verified").on(table.verified),
    verificationStatusIdx: index("idx_doctors_verification_status").on(table.verificationStatus),
    // Composite indexes for common query patterns
    verifiedSpecialtyIdx: index("idx_doctors_verified_specialty").on(
      table.verified,
      table.specialty
    ),
    // Foreign key indexes for location queries (Phase 1)
    cityIdIdx: index("idx_doctors_city_id").on(table.cityId),
    sectorIdIdx: index("idx_doctors_sector_id").on(table.sectorId),
    countyIdIdx: index("idx_doctors_county_id").on(table.countyId),
    // Composite indexes with foreign keys (Phase 4: Index Updates)
    specialtyCityIdIdx: index("idx_doctors_specialty_city_id").on(table.specialty, table.cityId),
    specialtyCountyIdIdx: index("idx_doctors_specialty_county_id").on(
      table.specialty,
      table.countyId
    ),
  })
);

// Bookings table
export const bookings = pgTable(
  "bookings",
  {
    id: text("id").primaryKey(),
    parentId: text("parent_id")
      .notNull()
      .references(() => users.id),
    childId: text("child_id").references(() => children.id),
    clubId: text("club_id").references(() => clubs.id),
    doctorId: text("doctor_id").references(() => doctors.id),
    type: text("type").notNull(), // "club_trial" or "doctor_consultation"
    status: bookingStatusEnum("status").default("pending").notNull(),
    scheduledAt: timestamp("scheduled_at"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes for booking queries
    parentIdIdx: index("idx_bookings_parent_id").on(table.parentId),
    childIdIdx: index("idx_bookings_child_id").on(table.childId),
    clubIdIdx: index("idx_bookings_club_id").on(table.clubId),
    doctorIdIdx: index("idx_bookings_doctor_id").on(table.doctorId),
    statusIdx: index("idx_bookings_status").on(table.status),
    scheduledAtIdx: index("idx_bookings_scheduled_at").on(table.scheduledAt),
    // Composite indexes for common query patterns
    parentStatusIdx: index("idx_bookings_parent_status").on(table.parentId, table.status),
    scheduledStatusIdx: index("idx_bookings_scheduled_status").on(table.scheduledAt, table.status),
  })
);

// Favorites table
export const favorites = pgTable(
  "favorites",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    clubId: text("club_id").references(() => clubs.id),
    doctorId: text("doctor_id").references(() => doctors.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes for favorites queries
    userIdIdx: index("idx_favorites_user_id").on(table.userId),
    clubIdIdx: index("idx_favorites_club_id").on(table.clubId),
    doctorIdIdx: index("idx_favorites_doctor_id").on(table.doctorId),
    // Composite index for user favorites lookup
    userClubIdx: index("idx_favorites_user_club").on(table.userId, table.clubId),
    userDoctorIdx: index("idx_favorites_user_doctor").on(table.userId, table.doctorId),
  })
);

// Reviews table
export const reviews = pgTable(
  "reviews",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    clubId: text("club_id").references(() => clubs.id),
    doctorId: text("doctor_id").references(() => doctors.id),
    rating: integer("rating").notNull(), // 1-5
    comment: text("comment"),
    moderated: boolean("moderated").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes for reviews queries
    userIdIdx: index("idx_reviews_user_id").on(table.userId),
    clubIdIdx: index("idx_reviews_club_id").on(table.clubId),
    doctorIdIdx: index("idx_reviews_doctor_id").on(table.doctorId),
    moderatedIdx: index("idx_reviews_moderated").on(table.moderated),
    ratingIdx: index("idx_reviews_rating").on(table.rating),
    // Composite indexes for common query patterns
    clubModeratedIdx: index("idx_reviews_club_moderated").on(table.clubId, table.moderated),
    doctorModeratedIdx: index("idx_reviews_doctor_moderated").on(table.doctorId, table.moderated),
  })
);

// NEW: Onboarding Progress table
export const onboardingProgress = pgTable("onboarding_progress", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(), // One progress record per user

  // Role determines which onboarding flow to use
  role: userRoleEnum("role").notNull(),

  // Progress tracking
  currentStep: integer("current_step").notNull().default(1),
  totalSteps: integer("total_steps").notNull(),
  completedSteps: text("completed_steps")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),

  // JSONB storage for partial form data (enables resume functionality)
  // Example structure: { "child_id": "uuid", "club_basic_info": { "name": "..." } }
  stepData: jsonb("step_data").default(sql`'{}'::jsonb`),

  // Completion status
  isCompleted: boolean("is_completed").notNull().default(false),

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Uploads tracking table - tracks all file uploads for ownership verification
export const uploads = pgTable(
  "uploads",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    url: text("url").notNull(), // Cloudinary URL
    publicId: text("public_id").notNull(), // Cloudinary public ID
    resourceType: text("resource_type").notNull(), // "image" or "raw" (document)
    folder: text("folder"), // Cloudinary folder path
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes
    userIdIdx: index("idx_uploads_user_id").on(table.userId),
    urlIdx: index("idx_uploads_url").on(table.url),
    publicIdIdx: index("idx_uploads_public_id").on(table.publicId),
    // Composite index for ownership checks
    userUrlIdx: index("idx_uploads_user_url").on(table.userId, table.url),
  })
);

// Audit logs table - tracks admin actions for security and compliance
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Admin who performed the action
    action: text("action").notNull(), // e.g., "verification_status_changed"
    entityType: text("entity_type").notNull(), // "club" or "doctor"
    entityId: text("entity_id").notNull(), // ID of the club or doctor
    oldValue: jsonb("old_value"), // Previous state (e.g., { verificationStatus: "pending" })
    newValue: jsonb("new_value"), // New state (e.g., { verificationStatus: "approved" })
    metadata: jsonb("metadata"), // Additional context (e.g., { reason: "..." })
    ipAddress: text("ip_address"), // IP address of the admin
    userAgent: text("user_agent"), // User agent string
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes
    userIdIdx: index("idx_audit_logs_user_id").on(table.userId),
    entityTypeIdx: index("idx_audit_logs_entity_type").on(table.entityType),
    entityIdIdx: index("idx_audit_logs_entity_id").on(table.entityId),
    actionIdx: index("idx_audit_logs_action").on(table.action),
    createdAtIdx: index("idx_audit_logs_created_at").on(table.createdAt),
    // Composite indexes for common queries
    entityTypeIdIdx: index("idx_audit_logs_entity_type_id").on(table.entityType, table.entityId),
    userActionIdx: index("idx_audit_logs_user_action").on(table.userId, table.action),
  })
);

// Waitlist emails table - stores early access signup emails
export const waitlistEmails = pgTable(
  "waitlist_emails",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text("email").notNull(),
    name: text("name"), // Optional name field
    userType: text("user_type"), // "parent", "club", "doctor", or null
    source: text("source"), // Route path where signup occurred (e.g., "/chestionar", "/parent/dashboard")
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes
    emailIdx: index("idx_waitlist_emails_email").on(table.email),
    userTypeIdx: index("idx_waitlist_emails_user_type").on(table.userType),
    sourceIdx: index("idx_waitlist_emails_source").on(table.source),
    createdAtIdx: index("idx_waitlist_emails_created_at").on(table.createdAt),
  })
);

// Payments table - tracks one-time payments for quiz reports
export const payments = pgTable(
  "payments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id), // Optional (for authenticated users)
    quizId: text("quiz_id")
      .notNull()
      .references(() => quizzes.id, { onDelete: "cascade" }),

    // Payment details
    amount: integer("amount").notNull(), // Amount in smallest currency unit (lei * 100 = bani)
    currency: text("currency").notNull().default("RON"),
    status: paymentStatusEnum("status").notNull().default("pending"), // pending | completed | failed | refunded

    // Payment provider
    paymentProvider: text("payment_provider").notNull(), // "stripe" | "paypal" | "netopia" | etc.
    paymentProviderId: text("payment_provider_id"), // Provider's transaction ID
    paymentProviderMetadata: jsonb("payment_provider_metadata"), // Additional provider data

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes
    quizIdIdx: index("idx_payments_quiz_id").on(table.quizId),
    userIdIdx: index("idx_payments_user_id").on(table.userId),
    statusIdx: index("idx_payments_status").on(table.status),
    paymentProviderIdIdx: index("idx_payments_provider_id").on(table.paymentProviderId),
    // Composite indexes for common query patterns
    quizStatusIdx: index("idx_payments_quiz_status").on(table.quizId, table.status),
  })
);

// Report access table - manages persistent access tokens for paid reports
export const reportAccess = pgTable(
  "report_access",
  {
    id: text("id").primaryKey(),
    quizId: text("quiz_id")
      .notNull()
      .references(() => quizzes.id, { onDelete: "cascade" }),
    paymentId: text("payment_id")
      .notNull()
      .references(() => payments.id, { onDelete: "cascade" }),

    // Access token (unique, non-guessable)
    accessToken: text("access_token").notNull().unique(),

    // Expiration (set to 10 years for "permanent" access)
    expiresAt: timestamp("expires_at"),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastAccessedAt: timestamp("last_accessed_at"), // Track usage
  },
  (table) => ({
    // Performance indexes
    quizIdIdx: index("idx_report_access_quiz_id").on(table.quizId),
    paymentIdIdx: index("idx_report_access_payment_id").on(table.paymentId),
    accessTokenIdx: index("idx_report_access_token").on(table.accessToken),
    // Composite index for access verification
    tokenExpiresIdx: index("idx_report_access_token_expires").on(
      table.accessToken,
      table.expiresAt
    ),
  })
);

// Locations table - Single source of truth for Romanian counties, cities, and sectors
export const locations = pgTable(
  "locations",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(), // Location name in Romanian (e.g., "București", "Cluj-Napoca")
    type: locationTypeEnum("type").notNull(), // "county" | "city" | "sector"
    parentId: text("parent_id"), // Self-referential: null for counties, county ID for cities, city ID for sectors
    // Note: Foreign key constraint to locations.id will be added in migration for self-reference
    code: text("code"), // County code (e.g., "B" for București, "CJ" for Cluj, "TM" for Timiș)
    isActive: boolean("is_active").notNull().default(true), // Soft delete flag
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes
    typeIdx: index("idx_locations_type").on(table.type),
    parentIdIdx: index("idx_locations_parent_id").on(table.parentId),
    codeIdx: index("idx_locations_code").on(table.code),
    isActiveIdx: index("idx_locations_is_active").on(table.isActive),
    // Composite unique index: prevent duplicate locations (same name, type, and parent)
    // Note: For counties (parentId IS NULL), we'll need a partial unique index in migration
    // to ensure county name uniqueness. This index handles cities and sectors.
    nameTypeParentUniqueIdx: uniqueIndex("idx_locations_name_type_parent_unique").on(
      table.name,
      table.type,
      table.parentId
    ),
    // Composite indexes for common query patterns
    typeParentIdx: index("idx_locations_type_parent").on(table.type, table.parentId),
    codeTypeIdx: index("idx_locations_code_type").on(table.code, table.type),
  })
);

// Leads table - tracks parent interest in clubs (locked until payment)
export const leads = pgTable(
  "leads",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    clubId: text("club_id")
      .notNull()
      .references(() => clubs.id, { onDelete: "cascade" }),
    parentId: text("parent_id").references(() => users.id, { onDelete: "set null" }), // Optional - can be anonymous
    parentName: text("parent_name").notNull(),
    parentEmail: text("parent_email").notNull(),
    parentPhone: text("parent_phone"), // Optional but recommended
    childAge: integer("child_age").notNull(),
    message: text("message"), // Optional message from parent
    sportType: text("sport_type"), // Sport name (matches clubs.sportType)
    locationId: text("location_id").references(() => locations.id, { onDelete: "set null" }), // City/location
    status: leadStatusEnum("status").notNull().default("nou"), // 'nou', 'in_asteptare', 'acceptat', 'expirat'
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at").notNull(), // 5 days from creation
    acceptedAt: timestamp("accepted_at"), // When club accepted (paid or premium)
    paymentId: text("payment_id"), // Link to lead_payments.id if pay-per-lead (foreign key added via migration)
    paymentMethod: leadPaymentMethodEnum("payment_method"), // 'pay_per_lead' | 'premium' (null if not accepted yet)
    createdBy: text("created_by"), // IP address or user ID for tracking
  },
  (table) => ({
    // Performance indexes for lead queries
    clubIdIdx: index("idx_leads_club_id").on(table.clubId),
    parentEmailIdx: index("idx_leads_parent_email").on(table.parentEmail),
    statusIdx: index("idx_leads_status").on(table.status),
    expiresAtIdx: index("idx_leads_expires_at").on(table.expiresAt),
    createdAtIdx: index("idx_leads_created_at").on(table.createdAt),
    // Composite indexes for common query patterns
    clubStatusIdx: index("idx_leads_club_status").on(table.clubId, table.status),
    statusExpiresAtIdx: index("idx_leads_status_expires_at").on(table.status, table.expiresAt),
  })
);

// Premium Club Status table - tracks which clubs have premium subscriptions
export const premiumClubStatus = pgTable(
  "premium_club_status",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    clubId: text("club_id")
      .notNull()
      .unique()
      .references(() => clubs.id, { onDelete: "cascade" }),
    isPremium: boolean("is_premium").notNull().default(false),
    premiumStartDate: timestamp("premium_start_date"),
    premiumEndDate: timestamp("premium_end_date"), // 1 year from start
    stripeSubscriptionId: text("stripe_subscription_id"), // Stripe subscription ID (if subscription model)
    stripeCustomerId: text("stripe_customer_id"), // Stripe customer ID
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes
    clubIdIdx: index("idx_premium_club_status_club_id").on(table.clubId),
    isPremiumIdx: index("idx_premium_club_status_is_premium").on(table.isPremium),
    premiumEndDateIdx: index("idx_premium_club_status_end_date").on(table.premiumEndDate),
  })
);

// Lead Payments table - tracks pay-per-lead payments (3€ per lead)
export const leadPayments = pgTable(
  "lead_payments",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    leadId: text("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    clubId: text("club_id")
      .notNull()
      .references(() => clubs.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(), // Amount in cents (300 = 3€)
    currency: text("currency").notNull().default("EUR"),
    paymentMethod: leadPaymentMethodEnum("payment_method").notNull(), // 'pay_per_lead' | 'premium'
    stripePaymentIntentId: text("stripe_payment_intent_id").notNull(),
    status: leadPaymentStatusEnum("status").notNull(), // 'pending', 'succeeded', 'failed'
    paidAt: timestamp("paid_at"), // When payment completed
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes
    leadIdIdx: index("idx_lead_payments_lead_id").on(table.leadId),
    clubIdIdx: index("idx_lead_payments_club_id").on(table.clubId),
    stripePaymentIntentIdIdx: index("idx_lead_payments_stripe_payment_intent_id").on(
      table.stripePaymentIntentId
    ),
    statusIdx: index("idx_lead_payments_status").on(table.status),
    // Composite indexes for common query patterns
    clubStatusIdx: index("idx_lead_payments_club_status").on(table.clubId, table.status),
  })
);
