ALTER TABLE "clubs" ADD COLUMN "city_id" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "sector_id" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "county_id" text;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "city_id" text;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "sector_id" text;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "county_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "city_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "county_id" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_city_id_locations_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_sector_id_locations_id_fk" FOREIGN KEY ("sector_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_county_id_locations_id_fk" FOREIGN KEY ("county_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_city_id_locations_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_sector_id_locations_id_fk" FOREIGN KEY ("sector_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_county_id_locations_id_fk" FOREIGN KEY ("county_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_city_id_locations_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_county_id_locations_id_fk" FOREIGN KEY ("county_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_clubs_city_id" ON "clubs" USING btree ("city_id");--> statement-breakpoint
CREATE INDEX "idx_clubs_sector_id" ON "clubs" USING btree ("sector_id");--> statement-breakpoint
CREATE INDEX "idx_clubs_county_id" ON "clubs" USING btree ("county_id");--> statement-breakpoint
CREATE INDEX "idx_doctors_city_id" ON "doctors" USING btree ("city_id");--> statement-breakpoint
CREATE INDEX "idx_doctors_sector_id" ON "doctors" USING btree ("sector_id");--> statement-breakpoint
CREATE INDEX "idx_doctors_county_id" ON "doctors" USING btree ("county_id");--> statement-breakpoint
CREATE INDEX "idx_users_city_id" ON "users" USING btree ("city_id");--> statement-breakpoint
CREATE INDEX "idx_users_county_id" ON "users" USING btree ("county_id");