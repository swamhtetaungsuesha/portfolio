import { db } from "@/db";
import { tags, TagSelect } from "@/db/schema";

export async function getTags(): Promise<TagSelect[]> {
  try {
    const result = await db.select().from(tags);
    return result;
  } catch (error) {
    console.error("Error fetching socials for user:", error);
    throw error;
  }
}
