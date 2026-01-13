ALTER TABLE "quizzes" ADD COLUMN "location" text;--> statement-breakpoint
CREATE INDEX "idx_quizzes_location" ON "quizzes" USING btree ("location");