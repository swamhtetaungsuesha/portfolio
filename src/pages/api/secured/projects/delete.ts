import { db } from "@/db";
import { projects, ProjectSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<{ id: number }>,
  res: ExtendedNextApiReponse<ProjectSelect>
) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;

      const result = await db
        .delete(projects)
        .where(eq(projects.id, id))
        .returning();
      res.status(200).json({
        success: true,
        message: "You are deleted a project successfully!",
        data: result[0],
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete project" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
