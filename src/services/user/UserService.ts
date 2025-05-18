import { db } from "@/db";
import { users, UserSelect } from "@/db/schema";
import { getTableColumns } from "drizzle-orm";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";

class TagService {
  async get(): Promise<ResponseData<UserSelect>> {
    try {
      const { createdAt, updatedAt, ...rest } = getTableColumns(users);
      const result = await db
        .select({ ...rest })
        .from(users)
        .limit(1);

      const res: ResponseData<UserSelect> = {
        success: true,
        message: "Success Get User",
        data: result[0],
      };

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }

  async update(payload: UserSelect): Promise<ResponseData<UserSelect>> {
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

export default new TagService();
