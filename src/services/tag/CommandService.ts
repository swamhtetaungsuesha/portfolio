import { TagSelect } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { TagDataWithoutId } from "./Tag";

class TagCommandService {
  static async create(
    payload: TagDataWithoutId
  ): Promise<ResponseData<TagSelect>> {
    try {
      const response: ResponseData<TagSelect> = await ApiService.call(
        "/api/secured/tag/create",
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
  static async update(payload: TagSelect): Promise<ResponseData<TagSelect>> {
    try {
      const response: ResponseData<TagSelect> = await ApiService.call(
        "/api/secured/tag/update",
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
  }): Promise<ResponseData<TagSelect>> {
    try {
      const response: ResponseData<TagSelect> = await ApiService.call(
        "/api/secured/tag/delete",
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

export default TagCommandService;
