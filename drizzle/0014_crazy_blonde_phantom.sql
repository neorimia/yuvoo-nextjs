CREATE TYPE "public"."breach_severity" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."consent_status" AS ENUM('granted', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."consent_type" AS ENUM('child_data_recommendations', 'health_data_recommendations', 'share_with_clubs', 'specialist_suggestions', 'marketing_communications');--> statement-breakpoint
CREATE TYPE "public"."data_export_request_status" AS ENUM('pending', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."data_export_request_type" AS ENUM('access', 'portability', 'erasure');--> statement-breakpoint
CREATE TABLE "breach_register" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"severity" "breach_severity" NOT NULL,
	"data_categories" text[] NOT NULL,
	"affected_count" integer,
	"discovered_at" timestamp NOT NULL,
	"discovered_by" text NOT NULL,
	"anspdcp_notified" boolean DEFAULT false NOT NULL,
	"anspdcp_notified_at" timestamp,
	"anspdcp_reference" text,
	"individuals_notified" boolean DEFAULT false NOT NULL,
	"individuals_notified_at" timestamp,
	"remediation_steps" jsonb,
	"remediation_completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consent_audit_log" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_consent_id" text NOT NULL,
	"action" text NOT NULL,
	"previous_status" "consent_status",
	"new_status" "consent_status" NOT NULL,
	"privacy_policy_version" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "data_export_requests" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"request_type" "data_export_request_type" NOT NULL,
	"status" "data_export_request_status" DEFAULT 'pending' NOT NULL,
	"requested_data" text[],
	"export_format" text,
	"export_url" text,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"expires_at" timestamp,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "privacy_policy_versions" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" text NOT NULL,
	"effective_date" timestamp NOT NULL,
	"content_hash" text NOT NULL,
	"major_changes" jsonb,
	"is_active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "privacy_policy_versions_version_unique" UNIQUE("version")
);
--> statement-breakpoint
CREATE TABLE "user_consents" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"child_id" text,
	"consent_type" "consent_type" NOT NULL,
	"status" "consent_status" DEFAULT 'granted' NOT NULL,
	"consent_version" text NOT NULL,
	"consent_text" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"granted_at" timestamp DEFAULT now() NOT NULL,
	"withdrawn_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "consent_audit_log" ADD CONSTRAINT "consent_audit_log_user_consent_id_user_consents_id_fk" FOREIGN KEY ("user_consent_id") REFERENCES "public"."user_consents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_export_requests" ADD CONSTRAINT "data_export_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_child_id_children_id_fk" FOREIGN KEY ("child_id") REFERENCES "public"."children"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_breach_register_severity" ON "breach_register" USING btree ("severity");--> statement-breakpoint
CREATE INDEX "idx_breach_register_discovered_at" ON "breach_register" USING btree ("discovered_at");--> statement-breakpoint
CREATE INDEX "idx_breach_register_anspdcp_notified" ON "breach_register" USING btree ("anspdcp_notified");--> statement-breakpoint
CREATE INDEX "idx_breach_register_severity_notified" ON "breach_register" USING btree ("severity","anspdcp_notified");--> statement-breakpoint
CREATE INDEX "idx_consent_audit_log_consent_id" ON "consent_audit_log" USING btree ("user_consent_id");--> statement-breakpoint
CREATE INDEX "idx_consent_audit_log_created_at" ON "consent_audit_log" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_consent_audit_log_action" ON "consent_audit_log" USING btree ("action");--> statement-breakpoint
CREATE INDEX "idx_data_export_requests_user_id" ON "data_export_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_data_export_requests_status" ON "data_export_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_data_export_requests_type" ON "data_export_requests" USING btree ("request_type");--> statement-breakpoint
CREATE INDEX "idx_data_export_requests_requested_at" ON "data_export_requests" USING btree ("requested_at");--> statement-breakpoint
CREATE INDEX "idx_data_export_requests_status_requested" ON "data_export_requests" USING btree ("status","requested_at");--> statement-breakpoint
CREATE INDEX "idx_privacy_policy_versions_version" ON "privacy_policy_versions" USING btree ("version");--> statement-breakpoint
CREATE INDEX "idx_privacy_policy_versions_active" ON "privacy_policy_versions" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_privacy_policy_versions_effective_date" ON "privacy_policy_versions" USING btree ("effective_date");--> statement-breakpoint
CREATE INDEX "idx_user_consents_user_id" ON "user_consents" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_user_consents_child_id" ON "user_consents" USING btree ("child_id");--> statement-breakpoint
CREATE INDEX "idx_user_consents_type" ON "user_consents" USING btree ("consent_type");--> statement-breakpoint
CREATE INDEX "idx_user_consents_status" ON "user_consents" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_consents_user_type_unique" ON "user_consents" USING btree ("user_id","child_id","consent_type");