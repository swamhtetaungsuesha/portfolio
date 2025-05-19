// db.ts
import "@/shared/configs/env";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";
import { sql } from "drizzle-orm";

export const db = drizzle(sql, { schema });
