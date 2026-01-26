CREATE TYPE "public"."subscription_type" AS ENUM('MONTHLY', 'YEARLY');--> statement-breakpoint
ALTER TABLE "premium_club_status" ADD COLUMN "subscription_type" "subscription_type" DEFAULT 'MONTHLY';--> statement-breakpoint
ALTER TABLE "premium_club_status" ADD COLUMN "billing_period" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "premium_club_status" ADD COLUMN "next_billing_date" timestamp;--> statement-breakpoint
ALTER TABLE "premium_club_status" ADD COLUMN "billing_amount" integer;--> statement-breakpoint
CREATE INDEX "idx_premium_club_status_subscription_type" ON "premium_club_status" USING btree ("subscription_type");--> statement-breakpoint
CREATE INDEX "idx_premium_club_status_next_billing_date" ON "premium_club_status" USING btree ("next_billing_date");--> statement-breakpoint
-- Data migration: Update existing premium subscriptions to YEARLY (backward compatibility)
-- Existing subscriptions were created with old pricing (199 lei/year), so set them as YEARLY
UPDATE "premium_club_status" 
SET 
    "subscription_type" = 'YEARLY',
    "billing_period" = 12,
    "billing_amount" = 19900
WHERE "is_premium" = true 
  AND "subscription_type" IS NULL;