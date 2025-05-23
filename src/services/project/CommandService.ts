import { ProjectSelect, ProjectWithTags } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { ProjectData, ProjectDataWithoutId } from "./Project";

class ProjectCommandService {
  static async create(
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
  static async update(
    payload: ProjectData
  ): Promise<ResponseData<ProjectWithTags>> {
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

  static async delete(payload: {
    id: number;
  }): Promise<ResponseData<ProjectSelect>> {
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

export default ProjectCommandService;
