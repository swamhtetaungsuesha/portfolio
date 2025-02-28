import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { companies, CompanySelect } from "./companies";

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .notNull()
    .references(() => companies.id, {
      onUpdate: "cascade",
      onDelete: "restrict",
    }),
  position: varchar("position", { length: 255 }).notNull(),
  description: text("description").array().notNull(),
  startedAt: varchar("started_at", { length: 6 }).notNull(),
  endedAt: varchar("ended_at", { length: 6 }),
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ExperienceSelect = Omit<
  typeof experiences.$inferSelect,
  "updatedAt" | "createdAt"
>;
export type ExperienceWithCompany = Omit<ExperienceSelect, "companyId"> & {
  company: CompanySelect;
};
