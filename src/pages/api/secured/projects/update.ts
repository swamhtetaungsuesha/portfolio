import { db } from "@/db";
import { projects, ProjectSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<ProjectSelect>,
  res: ExtendedNextApiReponse<ProjectSelect>
) {
  if (req.method === "POST") {
    try {
      const projectData = req.body;

      const updatedProject = await db
        .update(projects)
        .set({
          ...projectData,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, projectData.id))
        .returning();

      if (updatedProject.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Project not found" });
      }

      res
        .status(200)
        .json({
          success: true,
          message: "You are updated a project successfully!",
          data: updatedProject[0],
        });
    } catch (error) {
      console.error("Insert Company Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to insert company" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
