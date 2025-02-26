import { db } from "@/db";
import { projects, projectTags, ProjectWithTags, tags } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { desc, eq, sql } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<{}>,
  res: ExtendedNextApiReponse<ProjectWithTags[]>
) {
  if (req.method === "GET") {
    try {
      const result: ProjectWithTags[] = await db
        .select({
          id: projects.id,
          name: projects.name,
          description: projects.description,
          liveUrl: projects.liveUrl,
          githubUrl: projects.githubUrl,
          thumbnailImage: projects.thumbnailImage,
          image: projects.thumbnailImage,
          tags: sql<string[]>`ARRAY_AGG(${tags.name})`.as("tags"),
          isActive: projects.isActive,
          startedAt: projects.startedAt,
          endedAt: projects.endedAt,
          createdAt: projects.createdAt,
          updatedAt: projects.updatedAt,
        })
        .from(projects)
        .leftJoin(projectTags, eq(projectTags.projectId, projects.id))
        .leftJoin(tags, eq(tags.id, projectTags.tagId))
        .groupBy(projects.id)
        .orderBy(desc(projects.startedAt));
      res.status(200).json({
        success: true,
        message: "Success",
        data: result,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to get list of project" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
