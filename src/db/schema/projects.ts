import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  liveUrl: varchar("live_url", { length: 255 }),
  githubUrl: varchar("github_url", { length: 255 }).notNull(),
  thumbnailImage: varchar("thumbnail_image", { length: 255 }),
  isActive: boolean("is_active").notNull().default(true),
  startedAt: varchar("started_at", { length: 6 }).notNull(),
  endedAt: varchar("ended_at", { length: 6 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ProjectSelect = Omit<
  typeof projects.$inferSelect,
  "createdAt" | "updatedAt"
>;
export type ProjectWithTags = ProjectSelect & {
  tags: string[];
};
