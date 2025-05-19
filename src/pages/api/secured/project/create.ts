import { db } from "@/db";
import { projects, projectTags, ProjectWithTags, tags } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { ProjectDataWithoutId } from "@/services/project/Project";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<ProjectDataWithoutId>,
  res: ExtendedNextApiReponse<ProjectWithTags>
) {
  if (req.method === "POST") {
    try {
      const projectData = req.body;
      const { tags: tagNames, ...projectDetails } = projectData;

      const insertedProject = await db.transaction(async (tx) => {
        const [insertedProject] = await tx
          .insert(projects)
          .values(projectDetails)
          .returning();

        const tagIds = await Promise.all(
          tagNames.map(async (tagName) => {
            const [existingTag] = await tx
              .select()
              .from(tags)
              .where(eq(tags.name, tagName));

            if (existingTag) {
              return existingTag.id;
            } else {
              const [newTag] = await tx
                .insert(tags)
                .values({ name: tagName, term: tagName.toLowerCase() })
                .returning({ id: tags.id });
              return newTag.id;
            }
          })
        );

        await tx.insert(projectTags).values(
          tagIds.map((tagId) => ({
            projectId: insertedProject.id,
            tagId,
          }))
        );

        return { ...insertedProject, tags: tagNames };
      });

      res.status(200).json({
        success: true,
        message: "You are created a project successfully!",
        data: insertedProject,
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to insert project" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
