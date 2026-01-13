DO $$ BEGIN
 CREATE TYPE "public"."payment_status" AS ENUM('pending', 'completed', 'failed', 'refunded');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"quiz_id" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'RON' NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"payment_provider" text NOT NULL,
	"payment_provider_id" text,
	"payment_provider_metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report_access" (
	"id" text PRIMARY KEY NOT NULL,
	"quiz_id" text NOT NULL,
	"payment_id" text NOT NULL,
	"access_token" text NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_accessed_at" timestamp,
	CONSTRAINT "report_access_access_token_unique" UNIQUE("access_token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzes" ADD COLUMN "email" text;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzes" ADD COLUMN "location" text;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_access" ADD CONSTRAINT "report_access_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_access" ADD CONSTRAINT "report_access_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_payments_quiz_id" ON "payments" USING btree ("quiz_id");--> statement-breakpoint
CREATE INDEX "idx_payments_user_id" ON "payments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_payments_status" ON "payments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_payments_provider_id" ON "payments" USING btree ("payment_provider_id");--> statement-breakpoint
CREATE INDEX "idx_payments_quiz_status" ON "payments" USING btree ("quiz_id","status");--> statement-breakpoint
CREATE INDEX "idx_report_access_quiz_id" ON "report_access" USING btree ("quiz_id");--> statement-breakpoint
CREATE INDEX "idx_report_access_payment_id" ON "report_access" USING btree ("payment_id");--> statement-breakpoint
CREATE INDEX "idx_report_access_token" ON "report_access" USING btree ("access_token");--> statement-breakpoint
CREATE INDEX "idx_report_access_token_expires" ON "report_access" USING btree ("access_token","expires_at");--> statement-breakpoint
CREATE INDEX "idx_quizzes_email" ON "quizzes" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_quizzes_location" ON "quizzes" USING btree ("location");