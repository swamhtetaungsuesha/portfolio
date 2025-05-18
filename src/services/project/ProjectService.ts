import {
  projects,
  ProjectSelect,
  projectTags,
  ProjectWithTags,
  tags,
} from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { ProjectData, ProjectDataWithoutId } from "./Project";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";

class ProjectService {
  async getList(): Promise<ResponseData<ProjectWithTags[]>> {
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

  async create(
    payload: ProjectDataWithoutId
  ): Promise<ResponseData<ProjectWithTags>> {
    try {
      const response: ResponseData<ProjectWithTags> = await ApiService.call(
        "/api/secured/project/create",
        "POST",
        payload
      );

      return response;
    } catch (e) {
      const error = e as APIServiceError;

      return {
        success: false,
        message: error.message,
      };
    }
  }
  async update(payload: ProjectData): Promise<ResponseData<ProjectWithTags>> {
    try {
      const response: ResponseData<ProjectWithTags> = await ApiService.call(
        "/api/secured/project/update",
        "POST",
        payload
      );

      return response;
    } catch (e) {
      const error = e as APIServiceError;

      return {
        success: false,
        message: error.message,
      };
    }
  }

  async delete(payload: { id: number }): Promise<ResponseData<ProjectSelect>> {
    try {
      const response: ResponseData<ProjectSelect> = await ApiService.call(
        "/api/secured/project/delete",
        "POST",
        payload
      );
      return response;
    } catch (e) {
      const error = e as APIServiceError;

      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default new ProjectService();
