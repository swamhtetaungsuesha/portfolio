ALTER TABLE "projects" ALTER COLUMN "started_at" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "ended_at" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "category" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "started_at" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "tags" DROP COLUMN "category";--> statement-breakpoint
ALTER TABLE "skills" DROP COLUMN "min";--> statement-breakpoint
ALTER TABLE "skills" DROP COLUMN "max";