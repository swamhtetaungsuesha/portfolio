import { db } from "@/db";
import { projects, projectTags, ProjectWithTags, tags } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { ResponseData } from "../ApiResponse";
import { APIServiceError } from "../ApiServiceError";

class ProjectQueryService {
  static async getList(): Promise<ResponseData<ProjectWithTags[]>> {
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
        })
        .from(projects)
        .leftJoin(projectTags, eq(projectTags.projectId, projects.id))
        .leftJoin(tags, eq(tags.id, projectTags.tagId))
        .groupBy(projects.id)
        .orderBy(desc(projects.startedAt));
      const res: ResponseData<ProjectWithTags[]> = {
        success: true,
        message: "Success Get Projects",
        data: result,
      };

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }
}

export default ProjectQueryService;
