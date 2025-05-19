import { SkillSelect, SkillWithTag } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { SkillDataWithoutId } from "./Skill";

class SkillCommandService {
  static async create(
    payload: SkillDataWithoutId
  ): Promise<ResponseData<SkillWithTag>> {
    try {
      const response: ResponseData<SkillWithTag> = await ApiService.call(
        "/api/secured/skill/create",
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
    payload: SkillWithTag
  ): Promise<ResponseData<SkillWithTag>> {
    try {
      const response: ResponseData<SkillWithTag> = await ApiService.call(
        "/api/secured/skill/update",
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
  }): Promise<ResponseData<SkillSelect>> {
    try {
      const response: ResponseData<SkillSelect> = await ApiService.call(
        "/api/secured/skill/delete",
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

export default SkillCommandService;
