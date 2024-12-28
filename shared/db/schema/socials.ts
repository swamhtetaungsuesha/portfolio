import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const socials = pgTable("socials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  linkId: text("link_id").notNull(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SocialSelect = typeof socials.$inferSelect;
export type SocialWithoutUser = Omit<SocialSelect, "userId">;