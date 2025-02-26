import { db } from "@/db";
import { tags, TagSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<{ id: number }>,
  res: ExtendedNextApiReponse<TagSelect>
) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;

      const result = await db.delete(tags).where(eq(tags.id, id)).returning();
      res.status(200).json({
        success: true,
        message: "You are deleted a tag successfully!",
        data: result[0],
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete tag" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
