import { db } from "@/db";
import { skills, SkillSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";

export default async function handler(
  req: ExtendedNextApiRequest<{}>,
  res: ExtendedNextApiReponse<SkillSelect[]>
) {
  if (req.method === "GET") {
    try {
      const result = await db.select().from(skills);
      res.status(200).json({
        success: true,
        message: "Success",
        data: result,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to get list of skill" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
