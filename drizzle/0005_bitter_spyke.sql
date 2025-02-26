ALTER TABLE "skills" ALTER COLUMN "started_at" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "min" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "max" integer NOT NULL;