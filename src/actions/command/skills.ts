import { eq } from "drizzle-orm";
import { db } from "@/db"; // Assuming you have a db.ts file with your database connection
import { skills, SkillSelect } from "@/db/schema"; // Import the skills table from your schema file
import { verifyToken } from "./auth";

// Define the shape of the Skill data for insert and update
type SkillDataWithoutId = Omit<SkillSelect, "id" | "createdAt" | "updatedAt">;

// Insert action
export async function insertSkill(
  skillData: SkillDataWithoutId
): Promise<SkillSelect> {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db.insert(skills).values(skillData).returning();
    return result[0];
  } catch (error) {
    console.error("Error inserting Skill:", error);
    throw error;
  }
}

// Update action
export async function updateSkill(
  skillData: SkillSelect
): Promise<SkillSelect> {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .update(skills)
      .set({
        ...skillData,
        updatedAt: new Date(), // Ensure the updatedAt field is set
      })
      .where(eq(skills.id, skillData.id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error updating Skill:", error);
    throw error;
  }
}

// Delete action
export async function deleteSkill(skillId: number) {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .delete(skills)
      .where(eq(skills.id, skillId))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error deleting Skill:", error);
    throw error;
  }
}
