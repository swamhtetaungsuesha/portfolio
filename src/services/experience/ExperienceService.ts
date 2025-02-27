import { ExperienceSelect, ExperienceWithCompany } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { ExperienceData, ExperienceDataWithoutId } from "./Experience";

class ExperienceService {
  async getList(): Promise<ResponseData<ExperienceWithCompany[]>> {
    try {
      const res: ResponseData<ExperienceWithCompany[]> = await ApiService.call(
        "/api/secured/experience/get",
        "GET"
      );

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }

  async create(
    payload: ExperienceDataWithoutId
  ): Promise<ResponseData<ExperienceSelect>> {
    try {
      const response: ResponseData<ExperienceSelect> = await ApiService.call(
        "/api/secured/experience/create",
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
    payload: ExperienceData
  ): Promise<ResponseData<ExperienceSelect>> {
    try {
      const response: ResponseData<ExperienceSelect> = await ApiService.call(
        "/api/secured/experience/update",
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

  async delete(payload: {
    id: number;
  }): Promise<ResponseData<ExperienceSelect>> {
    try {
      const response: ResponseData<ExperienceSelect> = await ApiService.call(
        "/api/secured/experience/delete",
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

export default new ExperienceService();
