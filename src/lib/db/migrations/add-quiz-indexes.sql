-- Database Indexes for Quiz Performance Optimization
-- 
-- This migration adds indexes to optimize quiz-related queries.
-- Run this migration after the quizzes table is created.
--
-- Indexes:
-- 1. childId index - Optimizes quiz history queries
-- 2. createdAt index - Optimizes sorting by date
-- 3. Composite index - Optimizes queries filtering by child and date

-- Index on childId for fast quiz history lookups
CREATE INDEX IF NOT EXISTS idx_quizzes_child_id ON quizzes(child_id);

-- Index on createdAt for date-based sorting
CREATE INDEX IF NOT EXISTS idx_quizzes_created_at ON quizzes(created_at DESC);

-- Composite index for common query pattern: child quizzes ordered by date
CREATE INDEX IF NOT EXISTS idx_quizzes_child_created ON quizzes(child_id, created_at DESC);

-- Note: These indexes are automatically created by Drizzle ORM when using
-- the index() helper in the schema definition. This SQL file serves as
-- documentation and can be used for manual index creation if needed.

