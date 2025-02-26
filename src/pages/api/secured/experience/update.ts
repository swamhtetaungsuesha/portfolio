import { db } from "@/db";
import { experiences, ExperienceSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<ExperienceSelect>,
  res: ExtendedNextApiReponse<ExperienceSelect>
) {
  if (req.method === "POST") {
    try {
      const experienceData = req.body;

      const result = await db
        .update(experiences)
        .set({
          ...experienceData,
          updatedAt: new Date(), // Ensure the updatedAt field is set
        })
        .where(eq(experiences.id, experienceData.id))
        .returning();
      res.status(200).json({
        success: true,
        message: "You are updated a experience successfully!",
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
