import { eq } from "drizzle-orm";
import { db } from "@/db"; // Assuming you have a db.ts file with your database connection
import { experiences, ExperienceSelect } from "@/db/schema"; // Import the Experience table from your schema file
import { verifyToken } from "./auth";

// Define the shape of the Experience data for insert and update
type ExperienceDataWithoutId = Omit<
  ExperienceSelect,
  "id" | "createdAt" | "updatedAt"
>;

// Insert action
export async function insertExperience(
  experienceData: ExperienceDataWithoutId
): Promise<ExperienceSelect> {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .insert(experiences)
      .values(experienceData)
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error inserting Experience:", error);
    throw error;
  }
}

// Update action
export async function updateExperience(
  experienceData: ExperienceSelect
): Promise<ExperienceSelect> {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .update(experiences)
      .set({
        ...experienceData,
        updatedAt: new Date(), // Ensure the updatedAt field is set
      })
      .where(eq(experiences.id, experienceData.id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error updating Experience:", error);
    throw error;
  }
}

// Delete action
export async function deleteExperience(experienceId: number) {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .delete(experiences)
      .where(eq(experiences.id, experienceId))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error deleting Experience:", error);
    throw error;
  }
}
