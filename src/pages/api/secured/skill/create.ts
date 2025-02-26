import { db } from "@/db";
import { skills, SkillSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { SkillDataWithoutId } from "@/services/skill/Skill";

export default async function handler(
  req: ExtendedNextApiRequest<SkillDataWithoutId>,
  res: ExtendedNextApiReponse<SkillSelect>
) {
  if (req.method === "POST") {
    try {
      const skillData = req.body;

      const result = await db.insert(skills).values(skillData).returning();
      res.status(200).json({
        success: true,
        message: "You are created a skill successfully!",
        data: result[0],
      });
    } catch (error) {
      console.error("Insert Skill Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to insert skill" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
