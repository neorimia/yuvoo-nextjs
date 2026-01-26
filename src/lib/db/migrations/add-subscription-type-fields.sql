-- Migration: Add Subscription Type Fields to Premium Club Status
-- 
-- This migration adds subscription type tracking fields to the premium_club_status table.
-- Run this migration after updating the schema.ts file.
--
-- Changes:
-- 1. Create subscription_type enum (MONTHLY, YEARLY)
-- 2. Add subscription_type column to premium_club_status table
-- 3. Add billing_period column (integer, months)
-- 4. Add next_billing_date column (timestamp)
-- 5. Add billing_amount column (integer, in bani)
-- 6. Add indexes for performance

-- Step 1: Create subscription_type enum
DO $$ BEGIN
    CREATE TYPE subscription_type AS ENUM ('MONTHLY', 'YEARLY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 2: Add subscription_type column with default value
ALTER TABLE premium_club_status
ADD COLUMN IF NOT EXISTS subscription_type subscription_type DEFAULT 'MONTHLY';

-- Step 3: Add billing_period column (number of months: 1 for monthly, 12 for yearly)
ALTER TABLE premium_club_status
ADD COLUMN IF NOT EXISTS billing_period INTEGER DEFAULT 1;

-- Step 4: Add next_billing_date column (when next payment is due)
ALTER TABLE premium_club_status
ADD COLUMN IF NOT EXISTS next_billing_date TIMESTAMP;

-- Step 5: Add billing_amount column (amount paid in bani: 9900 for monthly, 99000 for yearly)
ALTER TABLE premium_club_status
ADD COLUMN IF NOT EXISTS billing_amount INTEGER;

-- Step 6: Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_premium_club_status_subscription_type 
ON premium_club_status(subscription_type);

CREATE INDEX IF NOT EXISTS idx_premium_club_status_next_billing_date 
ON premium_club_status(next_billing_date);

-- Step 7: Update existing premium subscriptions to have default values
-- Set existing premium subscriptions to YEARLY (backward compatibility with old 199 lei/year pricing)
UPDATE premium_club_status
SET 
    subscription_type = 'YEARLY',
    billing_period = 12,
    billing_amount = 19900 -- Old pricing: 199 lei = 19900 bani
WHERE is_premium = true 
  AND subscription_type IS NULL;

-- Note: For new subscriptions, the application will set:
-- - MONTHLY: billing_period = 1, billing_amount = 9900 (99 lei)
-- - YEARLY: billing_period = 12, billing_amount = 99000 (990 lei)
