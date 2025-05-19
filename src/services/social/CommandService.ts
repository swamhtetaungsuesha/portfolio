import { SocialSelect, SocialWithoutUser } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { SocialDataWithoutId } from "./Social";

class SocialCommandService {
  static async create(
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
  static async update(
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

  static async delete(payload: {
    id: number;
  }): Promise<ResponseData<SocialSelect>> {
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

export default SocialCommandService;
