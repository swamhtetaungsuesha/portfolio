import { db } from "@/db";
import { socials, SocialSelect } from "@/db/schema";
export async function getSocialsByUserId(): Promise<SocialSelect[]> {
  try {
    const result = await db.select().from(socials);
    return result;
  } catch (error) {
    console.error("Error fetching socials for user:", error);
    throw error;
  }
}
