ALTER TABLE "skills" ADD COLUMN "started_at" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "started_at";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "ended_at";--> statement-breakpoint
ALTER TABLE "skills" DROP COLUMN "min";--> statement-breakpoint
ALTER TABLE "skills" DROP COLUMN "max";