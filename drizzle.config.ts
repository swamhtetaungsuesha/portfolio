import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres.lnjjsvkburqzgztmjbkf:SF1dcb58eiSdF2kU@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
    host: process.env.POSTGRES_HOST,
  },
});
