/**
 * Database Schema
 *
 * Drizzle ORM schema definitions for Yuvoo.
 *
 * Tables:
 * - users: Parent, club admin, doctor, admin roles
 * - children: Child profiles linked to parents
 * - quizzes: Quiz answers and AI recommendations
 * - clubs: Sports club information
 * - doctors: Pediatric specialist profiles
 * - bookings: Club trials and doctor consultations
 * - favorites: Saved clubs and doctors
 * - reviews: Club and doctor reviews (moderated)
 */

import { pgTable, text, timestamp, boolean, integer, jsonb, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const userRoleEnum = pgEnum("user_role", ["parent", "club_admin", "doctor", "admin"]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
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
export const quizzes = pgTable("quizzes", {
  id: text("id").primaryKey(),
  childId: text("child_id")
    .notNull()
    .references(() => children.id),
  answers: jsonb("answers").notNull(), // Quiz answers as JSON
  recommendations: jsonb("recommendations"), // AI recommendations as JSON
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Clubs table
export const clubs = pgTable("clubs", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  sportType: text("sport_type").notNull(),
  city: text("city").notNull(),
  address: text("address"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  logoUrl: text("logo_url"),
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
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  specialty: text("specialty").notNull(),
  bio: text("bio"),
  city: text("city").notNull(),
  phone: text("phone"),
  email: text("email"),
  photoUrl: text("photo_url"),
  verified: boolean("verified").default(false).notNull(),
  acceptingNewPatients: boolean("accepting_new_patients").default(true).notNull(),
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
