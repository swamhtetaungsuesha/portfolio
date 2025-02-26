import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  term: varchar("term", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type TagSelect = typeof tags.$inferSelect;
