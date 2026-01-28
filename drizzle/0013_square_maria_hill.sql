ALTER TABLE "lead_payments" ADD COLUMN "is_guest_payment" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "lead_payments" ADD COLUMN "guest_email" text;--> statement-breakpoint
CREATE INDEX "idx_lead_payments_guest_email" ON "lead_payments" USING btree ("guest_email");--> statement-breakpoint
CREATE INDEX "idx_lead_payments_is_guest_payment" ON "lead_payments" USING btree ("is_guest_payment");