/**
 * Database Schema - UPDATED FOR ONBOARDING
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
 * - onboarding_progress: Cross-session onboarding state tracking (NEW)
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

// Users table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  stackUserId: text("stack_user_id").notNull().unique(),
  email: text("email").notNull().unique(),
  role: userRoleEnum("role").notNull().default("parent"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),

  // NEW: Onboarding tracking fields
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  profileCompletionPercentage: integer("profile_completion_percentage").default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Children table
export const children = pgTable("children", {
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
});

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
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes for quiz queries
    childIdIdx: index("idx_quizzes_child_id").on(table.childId),
    createdAtIdx: index("idx_quizzes_created_at").on(table.createdAt),
    childCreatedIdx: index("idx_quizzes_child_created").on(table.childId, table.createdAt),
  })
);

// Clubs table
export const clubs = pgTable("clubs", {
  id: text("id").primaryKey(),
  adminUserId: text("admin_user_id").references(() => users.id), // Link to club admin user

  // Basic info
  name: text("name").notNull(),
  slug: text("slug").unique(), // SEO-friendly URL slug
  description: text("description"),
  sportType: text("sport_type").notNull(),

  // Location
  city: text("city").notNull(),
  district: text("district"), // Sector/District (e.g., "Sector 1" in București)
  address: text("address"),
  latitude: text("latitude"),
  longitude: text("longitude"),

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
});

// Doctors table
export const doctors = pgTable("doctors", {
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
  city: text("city").notNull(),
  district: text("district"),
  address: text("address"),

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
});

// Bookings table
export const bookings = pgTable("bookings", {
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
});

// Favorites table
export const favorites = pgTable("favorites", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  clubId: text("club_id").references(() => clubs.id),
  doctorId: text("doctor_id").references(() => doctors.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reviews table
export const reviews = pgTable("reviews", {
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
});

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
