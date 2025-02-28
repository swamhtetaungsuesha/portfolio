ALTER TABLE "experiences" ALTER COLUMN "started_at" SET DATA TYPE varchar(6);--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "ended_at" SET DATA TYPE varchar(6);--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "ended_at" DROP DEFAULT;