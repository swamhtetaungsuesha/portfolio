import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tags, TagSelect } from "@/db/schema";
import { verifyToken } from "./auth";

type TagInsertData = Omit<TagSelect, "id" | "createdAt" | "updatedAt">;
type TagUpdateData = Partial<TagInsertData>;

export async function insertTag(tagData: TagInsertData) {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db.insert(tags).values(tagData).returning();
    return result[0];
  } catch (error) {
    console.error("Error inserting tag:", error);
    throw error;
  }
}

export async function updateTag(tagId: number, tagData: TagUpdateData) {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .update(tags)
      .set({
        ...tagData,
        updatedAt: new Date(),
      })
      .where(eq(tags.id, tagId))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error updating tag:", error);
    throw error;
  }
}

export async function deleteTag(tagId: number) {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db.delete(tags).where(eq(tags.id, tagId)).returning();
    return result[0];
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw error;
  }
}
