import { eq } from "drizzle-orm";
import { db } from "@/db"; // Assuming you have a db.ts file with your database connection
import { companies, CompanySelect } from "@/db/schema"; // Import the company table from your schema file
import { verifyToken } from "./auth";

// Define the shape of the Company data for insert and update
type CompanyDataWithoutId = Omit<
  CompanySelect,
  "id" | "createdAt" | "updatedAt"
>;

// Insert action
export async function insertCompany(
  companyData: CompanyDataWithoutId
): Promise<CompanySelect> {
  try {
    await verifyToken(localStorage.getItem("token") || "");

    const result = await db.insert(companies).values(companyData).returning();
    return result[0];
  } catch (error) {
    console.error("Error inserting Company:", error);
    throw error;
  }
}

// Update action
export async function updateCompany(
  companyData: CompanySelect
): Promise<CompanySelect> {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .update(companies)
      .set({
        ...companyData,
        updatedAt: new Date(), // Ensure the updatedAt field is set
      })
      .where(eq(companies.id, companyData.id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error updating Company:", error);
    throw error;
  }
}

// Delete action
export async function deleteCompany(companyId: number) {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .delete(companies)
      .where(eq(companies.id, companyId))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error deleting Company:", error);
    throw error;
  }
}
