CREATE TYPE "public"."location_type" AS ENUM('county', 'city', 'sector');--> statement-breakpoint
CREATE TABLE "locations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "location_type" NOT NULL,
	"parent_id" text,
	"code" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
-- Add self-referential foreign key constraint
ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
CREATE INDEX "idx_locations_type" ON "locations" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_locations_parent_id" ON "locations" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "idx_locations_code" ON "locations" USING btree ("code");--> statement-breakpoint
CREATE INDEX "idx_locations_is_active" ON "locations" USING btree ("is_active");--> statement-breakpoint
-- Unique index for cities and sectors (with parent_id)
CREATE UNIQUE INDEX "idx_locations_name_type_parent_unique" ON "locations" USING btree ("name","type","parent_id");--> statement-breakpoint
-- Partial unique index for counties (where parent_id IS NULL) to ensure county name uniqueness
CREATE UNIQUE INDEX "idx_locations_county_name_unique" ON "locations" USING btree ("name","type") WHERE ("type" = 'county' AND "parent_id" IS NULL);--> statement-breakpoint
CREATE INDEX "idx_locations_type_parent" ON "locations" USING btree ("type","parent_id");--> statement-breakpoint
CREATE INDEX "idx_locations_code_type" ON "locations" USING btree ("code","type");