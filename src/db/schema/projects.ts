import {
  boolean,
  date,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { ImageSelect } from "./images";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url").notNull(),
  thumbnailImage: text("thumbnail_image"),
  isActive: boolean("is_active").notNull(),
  startedAt: date("started_at").notNull(),
  endedAt: date("ended_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ProjectSelect = typeof projects.$inferSelect;
export type ProjectWithTags = ProjectSelect & {
  tags: string[];
};
