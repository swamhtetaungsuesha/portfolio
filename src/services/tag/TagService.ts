import { TagSelect } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { TagDataWithoutId } from "./Tag";

class TagService {
  async getList(): Promise<ResponseData<TagSelect[]>> {
    try {
      const res: ResponseData<TagSelect[]> = await ApiService.call(
        "/api/secured/tag/get",
        "GET"
      );

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }

  async create(payload: TagDataWithoutId): Promise<ResponseData<TagSelect>> {
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
  async update(payload: TagSelect): Promise<ResponseData<TagSelect>> {
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

  async delete(payload: { id: number }): Promise<ResponseData<TagSelect>> {
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

export default new TagService();
