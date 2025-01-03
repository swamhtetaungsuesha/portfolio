import { eq } from "drizzle-orm";
import { db } from "@/db"; // Assuming you have a db.ts file with your database connection
import { socials, SocialSelect } from "@/db/schema"; // Import the socials table from your schema file
import { verifyToken } from "./auth";

// Define the shape of the social data for insert and update
type SocialDataWithoutId = Omit<SocialSelect, "id" | "createdAt" | "updatedAt">;

// Insert action
export async function insertSocial(
  socialData: SocialDataWithoutId
): Promise<SocialSelect> {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db.insert(socials).values(socialData).returning();
    return result[0];
  } catch (error) {
    console.error("Error inserting social:", error);
    throw error;
  }
}

// Update action
export async function updateSocial(
  socialData: SocialSelect
): Promise<SocialSelect> {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .update(socials)
      .set({
        ...socialData,
        updatedAt: new Date(), // Ensure the updatedAt field is set
      })
      .where(eq(socials.id, socialData.id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error updating social:", error);
    throw error;
  }
}

// Delete action
export async function deleteSocial(socialId: number) {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .delete(socials)
      .where(eq(socials.id, socialId))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error deleting social:", error);
    throw error;
  }
}
