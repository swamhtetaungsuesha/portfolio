import { CompanySelect } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { CompanyDataWithoutId } from "./Company";

class CompanyService {
  async getList(): Promise<ResponseData<CompanySelect[]>> {
    try {
      const res: ResponseData<CompanySelect[]> = await ApiService.call(
        "/api/secured/company/get",
        "GET"
      );
      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }

  async create(
    payload: CompanyDataWithoutId
  ): Promise<ResponseData<CompanySelect>> {
    try {
      const response: ResponseData<CompanySelect> = await ApiService.call(
        "/api/secured/company/create",
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
  async update(payload: CompanySelect): Promise<ResponseData<CompanySelect>> {
    try {
      const response: ResponseData<CompanySelect> = await ApiService.call(
        "/api/secured/company/update",
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

  async delete(payload: { id: number }): Promise<ResponseData<CompanySelect>> {
    try {
      const response: ResponseData<CompanySelect> = await ApiService.call(
        "/api/secured/company/delete",
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

export default new CompanyService();
