import { db } from "@/db";
import { skills, SkillSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<{ id: number }>,
  res: ExtendedNextApiReponse<SkillSelect>
) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;

      const result = await db
        .delete(skills)
        .where(eq(skills.id, id))
        .returning();
      res.status(200).json({
        success: true,
        message: "You are deleted a skill successfully!",
        data: result[0],
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete skill" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
