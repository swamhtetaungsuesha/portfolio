import { db } from "@/db";
import { experiences, ExperienceSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { ExperienceDataWithoutId } from "@/services/experience/Experience";

export default async function handler(
  req: ExtendedNextApiRequest<ExperienceDataWithoutId>,
  res: ExtendedNextApiReponse<ExperienceSelect>
) {
  if (req.method === "POST") {
    try {
      const experienceData = req.body;

      const result = await db
        .insert(experiences)
        .values(experienceData)
        .returning();
      res.status(200).json({
        success: true,
        message: "You are created a experience successfully!",
        data: result[0],
      });
    } catch (error) {
      console.error("Insert Experience Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to insert experience" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
