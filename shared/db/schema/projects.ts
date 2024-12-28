import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { links } from "./links";
import { images, ImageSelect } from "./images";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  liveLinkId: integer("live_link_id")
    .notNull()
    .references(() => links.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  githubLinkId: integer("github_link_id")
    .notNull()
    .references(() => links.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  imageId: integer("image_id").references(() => images.id, {
    onUpdate: "cascade",
    onDelete: "restrict",
  }),
  isActive: boolean("is_active").notNull(),
  startedAt: date("started_at").notNull(),
  endedAt: date("ended_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ProjectSelect = typeof projects.$inferSelect;
export type ProjectWithLinkAndTags = Omit<
  ProjectSelect,
  "liveLinkId" | "githubLinkId" | "imageId"
> & {
  liveUrl: string;
  githubUrl: string;
  image: ImageSelect;
  tags: string[];
};
