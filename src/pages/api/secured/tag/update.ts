import { db } from "@/db";
import { tags, TagSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<TagSelect>,
  res: ExtendedNextApiReponse<TagSelect>
) {
  if (req.method === "POST") {
    try {
      const tagData = req.body;

      const result = await db
        .update(tags)
        .set({
          ...tagData,
          updatedAt: new Date(),
        })
        .where(eq(tags.id, tagData.id))
        .returning();
      res.status(200).json({
        success: true,
        message: "You are updated a tag successfully!",
        data: result[0],
      });
    } catch (error) {
      console.error("Insert Company Error:", error);
      res.status(500).json({ success: false, message: "Failed to insert tag" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
