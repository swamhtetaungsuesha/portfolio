import { db } from "@/db";
import { companies, CompanySelect } from "@/db/schema";
export async function getCompanies(): Promise<CompanySelect[]> {
  try {
    const result = await db.select().from(companies);
    return result;
  } catch (error) {
    console.error("Error fetching socials for user:", error);
    throw error;
  }
}
