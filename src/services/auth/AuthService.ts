import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";

class AuthService {
  async login(payload: {
    username: string;
    password: string;
  }): Promise<ResponseData<{}>> {
    try {
      const res: ResponseData<{}> = await ApiService.call(
        "/api/auth/login",
        "POST",
        payload
      );

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }

  async logout(payload: { id: string }): Promise<ResponseData<{}>> {
    try {
      const response: ResponseData<{}> = await ApiService.call(
        "/api/auth/logout",
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

export default new AuthService();
