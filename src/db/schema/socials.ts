import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { links } from "./links";
import { users } from "./users";

export const socials = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  linkId: integer("link_id")
    .notNull()
    .references(() => links.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
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
export type SocialWithoutUser = Omit<SocialSelect, "userId" | "linkId"> & {
  link: string;
};
