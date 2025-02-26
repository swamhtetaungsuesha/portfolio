import { db } from "@/db";
import { skills, SkillSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<SkillSelect>,
  res: ExtendedNextApiReponse<SkillSelect>
) {
  if (req.method === "POST") {
    try {
      const skillData = req.body;

      const result = await db
        .update(skills)
        .set({
          ...skillData,
          updatedAt: new Date(),
        })
        .where(eq(skills.id, skillData.id))
        .returning();
      res.status(200).json({
        success: true,
        message: "You are updated a skill successfully!",
        data: result[0],
      });
    } catch (error) {
      console.error("Insert Company Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to insert skill" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
