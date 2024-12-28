import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from "../db";

async function main() {
  console.log("Starting migration...");
  await migrate(db, { migrationsFolder: "./supabase/migrations" });
  console.log("Migration completed successfully.");
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
