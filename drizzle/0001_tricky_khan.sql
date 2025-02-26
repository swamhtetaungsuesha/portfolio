CREATE TABLE "credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" text NOT NULL,
	"token" text,
	"is_authenticated" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "socials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"link" varchar(255) NOT NULL,
	"user_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "images" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "links" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "images" CASCADE;--> statement-breakpoint
DROP TABLE "links" CASCADE;--> statement-breakpoint
ALTER TABLE "companies" DROP CONSTRAINT "companies_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "companies" DROP CONSTRAINT "companies_link_id_links_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_live_link_id_links_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_github_link_id_links_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "tags" DROP CONSTRAINT "tags_link_id_links_id_fk";
--> statement-breakpoint
ALTER TABLE "tags" DROP CONSTRAINT "tags_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "position" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "nickname" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phone_no" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "is_active" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "image" varchar(255);--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "link" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "about_me_content" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "resume" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "live_url" varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "github_url" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "thumbnail_image" varchar(255);--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "term" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "socials" ADD CONSTRAINT "socials_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "companies" DROP COLUMN "image_id";--> statement-breakpoint
ALTER TABLE "companies" DROP COLUMN "link_id";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "live_link_id";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "github_link_id";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "image_id";--> statement-breakpoint
ALTER TABLE "tags" DROP COLUMN "link_id";--> statement-breakpoint
ALTER TABLE "tags" DROP COLUMN "user_id";