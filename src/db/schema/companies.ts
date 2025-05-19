import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  image: varchar("image", { length: 255 }),
  name: varchar("name", { length: 255 }).notNull(),
  link: varchar("link", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type CompanySelect = Omit<
  typeof companies.$inferSelect,
  "createdAt" | "updatedAt"
>;
