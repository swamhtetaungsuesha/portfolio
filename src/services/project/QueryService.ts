import { db } from "@/db";
import { projects, projectTags, ProjectWithTags, tags } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

class ProjectQueryService {
  static async getList(): Promise<ProjectWithTags[]> {
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
      })
      .from(projects)
      .leftJoin(projectTags, eq(projectTags.projectId, projects.id))
      .leftJoin(tags, eq(tags.id, projectTags.tagId))
      .groupBy(projects.id)
      .orderBy(desc(projects.startedAt));

    return result;
  }
}

export default ProjectQueryService;
