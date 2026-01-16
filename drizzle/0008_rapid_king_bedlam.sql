DROP INDEX "idx_clubs_city";--> statement-breakpoint
DROP INDEX "idx_clubs_sport_city";--> statement-breakpoint
DROP INDEX "idx_doctors_city";--> statement-breakpoint
DROP INDEX "idx_doctors_specialty_city";--> statement-breakpoint
CREATE INDEX "idx_clubs_sport_city_id" ON "clubs" USING btree ("sport_type","city_id");--> statement-breakpoint
CREATE INDEX "idx_clubs_sport_county_id" ON "clubs" USING btree ("sport_type","county_id");--> statement-breakpoint
CREATE INDEX "idx_doctors_specialty_city_id" ON "doctors" USING btree ("specialty","city_id");--> statement-breakpoint
CREATE INDEX "idx_doctors_specialty_county_id" ON "doctors" USING btree ("specialty","county_id");