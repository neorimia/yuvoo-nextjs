CREATE TYPE "public"."lead_payment_method" AS ENUM('pay_per_lead', 'premium');--> statement-breakpoint
CREATE TYPE "public"."lead_payment_status" AS ENUM('pending', 'succeeded', 'failed');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('nou', 'in_asteptare', 'acceptat', 'expirat');--> statement-breakpoint
CREATE TABLE "lead_payments" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" text NOT NULL,
	"club_id" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'EUR' NOT NULL,
	"payment_method" "lead_payment_method" NOT NULL,
	"stripe_payment_intent_id" text NOT NULL,
	"status" "lead_payment_status" NOT NULL,
	"paid_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"club_id" text NOT NULL,
	"parent_id" text,
	"parent_name" text NOT NULL,
	"parent_email" text NOT NULL,
	"parent_phone" text,
	"child_age" integer NOT NULL,
	"message" text,
	"sport_type" text,
	"location_id" text,
	"status" "lead_status" DEFAULT 'nou' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"accepted_at" timestamp,
	"payment_id" text,
	"payment_method" "lead_payment_method",
	"created_by" text
);
--> statement-breakpoint
CREATE TABLE "premium_club_status" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"club_id" text NOT NULL,
	"is_premium" boolean DEFAULT false NOT NULL,
	"premium_start_date" timestamp,
	"premium_end_date" timestamp,
	"stripe_subscription_id" text,
	"stripe_customer_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "premium_club_status_club_id_unique" UNIQUE("club_id")
);
--> statement-breakpoint
ALTER TABLE "lead_payments" ADD CONSTRAINT "lead_payments_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_payments" ADD CONSTRAINT "lead_payments_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_payment_id_lead_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."lead_payments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "premium_club_status" ADD CONSTRAINT "premium_club_status_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_lead_payments_lead_id" ON "lead_payments" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "idx_lead_payments_club_id" ON "lead_payments" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "idx_lead_payments_stripe_payment_intent_id" ON "lead_payments" USING btree ("stripe_payment_intent_id");--> statement-breakpoint
CREATE INDEX "idx_lead_payments_status" ON "lead_payments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_lead_payments_club_status" ON "lead_payments" USING btree ("club_id","status");--> statement-breakpoint
CREATE INDEX "idx_leads_club_id" ON "leads" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "idx_leads_parent_email" ON "leads" USING btree ("parent_email");--> statement-breakpoint
CREATE INDEX "idx_leads_status" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_leads_expires_at" ON "leads" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_leads_created_at" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_leads_club_status" ON "leads" USING btree ("club_id","status");--> statement-breakpoint
CREATE INDEX "idx_leads_status_expires_at" ON "leads" USING btree ("status","expires_at");--> statement-breakpoint
CREATE INDEX "idx_premium_club_status_club_id" ON "premium_club_status" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "idx_premium_club_status_is_premium" ON "premium_club_status" USING btree ("is_premium");--> statement-breakpoint
CREATE INDEX "idx_premium_club_status_end_date" ON "premium_club_status" USING btree ("premium_end_date");