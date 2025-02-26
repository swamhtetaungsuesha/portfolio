import { CompanySelect, SkillSelect } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { SkillDataWithoutId } from "./Skill";

class SkillService {
  async getList(): Promise<ResponseData<SkillSelect[]>> {
    try {
      const res: ResponseData<SkillSelect[]> = await ApiService.call(
        "/api/secured/skill/get",
        "GET"
      );

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }

  async create(
    payload: SkillDataWithoutId
  ): Promise<ResponseData<SkillSelect>> {
    try {
      const response: ResponseData<SkillSelect> = await ApiService.call(
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
  async update(payload: CompanySelect): Promise<ResponseData<null>> {
    try {
      const response: ResponseData<null> = await ApiService.call(
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

  async delete(payload: { id: string }): Promise<ResponseData<SkillSelect>> {
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

export default new SkillService();
