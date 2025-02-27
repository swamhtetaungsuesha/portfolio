import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { tags } from "./tags";

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tags.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  category: varchar("category", { length: 255 }).notNull(),
  startedAt: varchar("started_at", { length: 6 }).notNull(), // mmYYYY
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SkillSelect = Omit<
  typeof skills.$inferSelect,
  "createdAt" | "updatedAt"
>;
export type SkillWithTag = Omit<SkillSelect, "tagId"> & {
  tag: string;
};
