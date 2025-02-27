import { SkillSelect, SocialSelect, SocialWithoutUser } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { SocialDataWithoutId } from "./Social";

class SocialService {
  async getList(): Promise<ResponseData<SocialSelect[]>> {
    try {
      const res: ResponseData<SocialSelect[]> = await ApiService.call(
        "/api/secured/social/get",
        "GET"
      );

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }

  async create(
    payload: SocialDataWithoutId
  ): Promise<ResponseData<SocialSelect>> {
    try {
      const response: ResponseData<SocialSelect> = await ApiService.call(
        "/api/secured/social/create",
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
  async update(
    payload: SocialWithoutUser
  ): Promise<ResponseData<SocialSelect>> {
    try {
      const response: ResponseData<SocialSelect> = await ApiService.call(
        "/api/secured/social/update",
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

  async delete(payload: { id: number }): Promise<ResponseData<SocialSelect>> {
    try {
      const response: ResponseData<SocialSelect> = await ApiService.call(
        "/api/secured/social/delete",
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

export default new SocialService();
