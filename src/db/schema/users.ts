import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { SocialWithoutUser } from "./socials";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nickname: varchar("nickname", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNo: varchar("phone_no", { length: 255 }).notNull(),
  slogan: text("slogan").notNull(),
  message: text("message").notNull(),
  aboutMeContent: text("about_me_content")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  resumeUrl: varchar("resume", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type UserSelect = Omit<
  typeof users.$inferSelect,
  "updatedAt" | "createdAt"
>;
export type UserWithLinks = UserSelect & {
  socials: SocialWithoutUser[];
};
