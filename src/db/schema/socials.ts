import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const socials = pgTable("socials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  link: varchar("link", { length: 255 }).notNull(),
  userId: integer("user_id").references(() => users.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SocialSelect = typeof socials.$inferSelect;
export type SocialWithoutUser = Omit<SocialSelect, "userId">;
