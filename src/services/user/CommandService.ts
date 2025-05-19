import { UserSelect } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";

class UserCommandService {
  static async update(payload: UserSelect): Promise<ResponseData<UserSelect>> {
    try {
      const response: ResponseData<UserSelect> = await ApiService.call(
        "/api/secured/user/update",
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

export default UserCommandService;
