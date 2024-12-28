import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { LinkWithoutUser } from "./links";
import { SocialWithoutUser } from "./socials";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nickname: text("nickname").notNull(),
  email: text("email").notNull(),
  phoneNo: text("phone_no").notNull(),
  slogan: text("slogan").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type UserSelect = typeof users.$inferSelect;
export type UserWithLinks = UserSelect & {
  socials: SocialWithoutUser[];
};
