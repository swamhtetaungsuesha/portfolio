import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const credentials = pgTable("credentials", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  password: text("password").notNull(),
  token: text("token"),
  isAuthenticated: boolean("is_authenticated").default(false),
});

export type CredentialSelect = typeof credentials.$inferSelect;
