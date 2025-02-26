import { ProjectSelect, ProjectWithTags } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { ProjectDataWithoutId } from "./Project";

class ProjectService {
  async getList(): Promise<ResponseData<ProjectWithTags[]>> {
    try {
      const res: ResponseData<ProjectWithTags[]> = await ApiService.call(
        "/api/secured/project/get",
        "GET"
      );

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
  async update(payload: ProjectSelect): Promise<ResponseData<ProjectSelect>> {
    try {
      const response: ResponseData<ProjectSelect> = await ApiService.call(
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

  async delete(payload: { id: string }): Promise<ResponseData<ProjectSelect>> {
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
