-- Fix: Add location column to quizzes table
-- This column is needed for storing user location after email collection
-- Run this SQL directly in your database if the migration hasn't been applied

DO $$ BEGIN
  ALTER TABLE "quizzes" ADD COLUMN "location" text;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

-- Create index for location column
CREATE INDEX IF NOT EXISTS "idx_quizzes_location" ON "quizzes" USING btree ("location");
