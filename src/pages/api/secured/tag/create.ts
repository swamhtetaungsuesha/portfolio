import { db } from "@/db";
import { tags, TagSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { TagDataWithoutId } from "@/services/tag/Tag";

export default async function handler(
  req: ExtendedNextApiRequest<TagDataWithoutId>,
  res: ExtendedNextApiReponse<TagSelect>
) {
  if (req.method === "POST") {
    try {
      const tagData = req.body;

      const result = await db.insert(tags).values(tagData).returning();
      res.status(200).json({
        success: true,
        message: "You are created a tag successfully!",
        data: result[0],
      });
    } catch (error) {
      console.error("Insert Tag Error:", error);
      res.status(500).json({ success: false, message: "Failed to insert tag" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
