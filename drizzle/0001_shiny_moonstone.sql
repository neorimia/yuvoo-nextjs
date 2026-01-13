CREATE TABLE IF NOT EXISTS "audit_logs" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text NOT NULL,
	"old_value" jsonb,
	"new_value" jsonb,
	"metadata" jsonb,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "uploads" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"url" text NOT NULL,
	"public_id" text NOT NULL,
	"resource_type" text NOT NULL,
	"folder" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "waitlist_emails" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"user_type" text,
	"source" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctors" ADD COLUMN "slug" text;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD COLUMN "email_notification_preferences" jsonb;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_audit_logs_user_id" ON "audit_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_entity_type" ON "audit_logs" USING btree ("entity_type");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_entity_id" ON "audit_logs" USING btree ("entity_id");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_action" ON "audit_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_created_at" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_entity_type_id" ON "audit_logs" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_user_action" ON "audit_logs" USING btree ("user_id","action");--> statement-breakpoint
CREATE INDEX "idx_uploads_user_id" ON "uploads" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_uploads_url" ON "uploads" USING btree ("url");--> statement-breakpoint
CREATE INDEX "idx_uploads_public_id" ON "uploads" USING btree ("public_id");--> statement-breakpoint
CREATE INDEX "idx_uploads_user_url" ON "uploads" USING btree ("user_id","url");--> statement-breakpoint
CREATE INDEX "idx_waitlist_emails_email" ON "waitlist_emails" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_waitlist_emails_user_type" ON "waitlist_emails" USING btree ("user_type");--> statement-breakpoint
CREATE INDEX "idx_waitlist_emails_source" ON "waitlist_emails" USING btree ("source");--> statement-breakpoint
CREATE INDEX "idx_waitlist_emails_created_at" ON "waitlist_emails" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_bookings_parent_id" ON "bookings" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "idx_bookings_child_id" ON "bookings" USING btree ("child_id");--> statement-breakpoint
CREATE INDEX "idx_bookings_club_id" ON "bookings" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "idx_bookings_doctor_id" ON "bookings" USING btree ("doctor_id");--> statement-breakpoint
CREATE INDEX "idx_bookings_status" ON "bookings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_bookings_scheduled_at" ON "bookings" USING btree ("scheduled_at");--> statement-breakpoint
CREATE INDEX "idx_bookings_parent_status" ON "bookings" USING btree ("parent_id","status");--> statement-breakpoint
CREATE INDEX "idx_bookings_scheduled_status" ON "bookings" USING btree ("scheduled_at","status");--> statement-breakpoint
CREATE INDEX "idx_children_parent_id" ON "children" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "idx_clubs_slug" ON "clubs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_clubs_sport_type" ON "clubs" USING btree ("sport_type");--> statement-breakpoint
CREATE INDEX "idx_clubs_city" ON "clubs" USING btree ("city");--> statement-breakpoint
CREATE INDEX "idx_clubs_verified" ON "clubs" USING btree ("verified");--> statement-breakpoint
CREATE INDEX "idx_clubs_featured" ON "clubs" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "idx_clubs_verification_status" ON "clubs" USING btree ("verification_status");--> statement-breakpoint
CREATE INDEX "idx_clubs_sport_city" ON "clubs" USING btree ("sport_type","city");--> statement-breakpoint
CREATE INDEX "idx_clubs_verified_featured" ON "clubs" USING btree ("verified","featured");--> statement-breakpoint
CREATE INDEX "idx_doctors_slug" ON "doctors" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_doctors_specialty" ON "doctors" USING btree ("specialty");--> statement-breakpoint
CREATE INDEX "idx_doctors_city" ON "doctors" USING btree ("city");--> statement-breakpoint
CREATE INDEX "idx_doctors_verified" ON "doctors" USING btree ("verified");--> statement-breakpoint
CREATE INDEX "idx_doctors_verification_status" ON "doctors" USING btree ("verification_status");--> statement-breakpoint
CREATE INDEX "idx_doctors_specialty_city" ON "doctors" USING btree ("specialty","city");--> statement-breakpoint
CREATE INDEX "idx_doctors_verified_specialty" ON "doctors" USING btree ("verified","specialty");--> statement-breakpoint
CREATE INDEX "idx_favorites_user_id" ON "favorites" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_favorites_club_id" ON "favorites" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "idx_favorites_doctor_id" ON "favorites" USING btree ("doctor_id");--> statement-breakpoint
CREATE INDEX "idx_favorites_user_club" ON "favorites" USING btree ("user_id","club_id");--> statement-breakpoint
CREATE INDEX "idx_favorites_user_doctor" ON "favorites" USING btree ("user_id","doctor_id");--> statement-breakpoint
CREATE INDEX "idx_quizzes_child_id" ON "quizzes" USING btree ("child_id");--> statement-breakpoint
CREATE INDEX "idx_quizzes_created_at" ON "quizzes" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_quizzes_child_created" ON "quizzes" USING btree ("child_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_reviews_user_id" ON "reviews" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_reviews_club_id" ON "reviews" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "idx_reviews_doctor_id" ON "reviews" USING btree ("doctor_id");--> statement-breakpoint
CREATE INDEX "idx_reviews_moderated" ON "reviews" USING btree ("moderated");--> statement-breakpoint
CREATE INDEX "idx_reviews_rating" ON "reviews" USING btree ("rating");--> statement-breakpoint
CREATE INDEX "idx_reviews_club_moderated" ON "reviews" USING btree ("club_id","moderated");--> statement-breakpoint
CREATE INDEX "idx_reviews_doctor_moderated" ON "reviews" USING btree ("doctor_id","moderated");--> statement-breakpoint
CREATE INDEX "idx_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_users_stack_user_id" ON "users" USING btree ("stack_user_id");--> statement-breakpoint
CREATE INDEX "idx_users_role" ON "users" USING btree ("role");--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_slug_unique" UNIQUE("slug");