import { eq, inArray } from "drizzle-orm";
import { db } from "@/db"; // Assuming you have a db.ts file with your database connection
import {
  projects,
  ProjectSelect,
  ProjectWithTags,
  tags,
  projectTags,
} from "@/db/schema";
import { verifyToken } from "./auth";

type ProjectInsertData = Omit<
  ProjectSelect,
  "id" | "createdAt" | "updatedAt"
> & {
  tags: string[];
};
type ProjectUpdateData = Partial<Omit<ProjectInsertData, "tags">>;

export async function insertProject(
  projectData: ProjectInsertData
): Promise<ProjectWithTags> {
  const { tags: tagNames, ...projectDetails } = projectData;
  await verifyToken(localStorage.getItem("token") || "");
  return await db.transaction(async (tx) => {
    // Insert the project
    const [insertedProject] = await tx
      .insert(projects)
      .values(projectDetails)
      .returning();

    // Find or create tags and associate them with the project
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

    // Insert project-tag associations
    await tx.insert(projectTags).values(
      tagIds.map((tagId) => ({
        projectId: insertedProject.id,
        tagId,
      }))
    );

    return { ...insertedProject, tags: tagNames };
  });
}

export async function updateProject(
  projectId: number,
  projectData: ProjectUpdateData
) {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .update(projects)
      .set({
        ...projectData,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

export async function deleteProject(projectId: number) {
  try {
    await verifyToken(localStorage.getItem("token") || "");
    const result = await db
      .delete(projects)
      .where(eq(projects.id, projectId))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

export async function updateProjectTags(projectId: number, tagNames: string[]) {
  await verifyToken(localStorage.getItem("token") || "");
  return await db.transaction(async (tx) => {
    // Find or create tags
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

    // Delete existing project-tag associations
    await tx.delete(projectTags).where(eq(projectTags.projectId, projectId));

    // Insert new project-tag associations
    await tx.insert(projectTags).values(
      tagIds.map((tagId) => ({
        projectId,
        tagId,
      }))
    );

    return tagNames;
  });
}
