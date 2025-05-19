import { db } from "@/db";
import { projects, projectTags, ProjectWithTags, tags } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { ProjectData } from "@/services/project/Project";
import { eq, notInArray } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<ProjectData>,
  res: ExtendedNextApiReponse<ProjectWithTags>
) {
  if (req.method === "POST") {
    try {
      const projectData = req.body;
      const { tags: tagNames, ...projectDetails } = projectData;

      const updatedProject = await db.transaction(async (tx) => {
        // Update project details
        const [updatedProject] = await tx
          .update(projects)
          .set({
            ...projectDetails,
            updatedAt: new Date(),
          })
          .where(eq(projects.id, projectData.id))
          .returning();

        if (!updatedProject) {
          throw new Error("Project not found");
        }

        // Fetch existing tag IDs
        const existingTags = await tx
          .select()
          .from(tags)
          .where(notInArray(tags.name, tagNames));

        const existingTagMap = new Map(
          existingTags.map((tag) => [tag.name, tag.id])
        );

        // Insert new tags if not exist
        const newTagIds = await Promise.all(
          tagNames.map(async (tagName) => {
            if (existingTagMap.has(tagName)) {
              return existingTagMap.get(tagName);
            } else {
              const [newTag] = await tx
                .insert(tags)
                .values({ name: tagName, term: tagName.toLowerCase() })
                .returning({ id: tags.id });
              return newTag.id;
            }
          })
        );

        // Remove old tag associations
        await tx
          .delete(projectTags)
          .where(eq(projectTags.projectId, updatedProject.id));

        // Insert updated tag associations
        await tx.insert(projectTags).values(
          newTagIds
            .filter((tagId): tagId is number => tagId !== undefined) // Ensure only valid IDs
            .map((tagId) => ({
              projectId: updatedProject.id,
              tagId,
            }))
        );

        return { ...updatedProject, tags: tagNames };
      });

      res.status(200).json({
        success: true,
        message: "You have updated a project successfully!",
        data: updatedProject,
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to update project" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
