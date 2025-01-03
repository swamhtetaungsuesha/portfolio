import { eq } from "drizzle-orm";
import { db } from "@/db"; // Assuming you have a db.ts file with your database connection
import { users, UserSelect } from "@/db/schema"; // Import the users table from your schema file
import { verifyToken } from "./auth";

// Update action
export const updateUser = async (userData: UserSelect): Promise<UserSelect> => {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(), // Ensure the updatedAt field is set
      })
      .where(eq(users.id, userData.id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
