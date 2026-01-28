ALTER TABLE "users" ADD COLUMN "sector_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_sector_id_locations_id_fk" FOREIGN KEY ("sector_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_users_sector_id" ON "users" USING btree ("sector_id");