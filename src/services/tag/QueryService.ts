import { db } from "@/db";
import { tags, TagSelect } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import { APIServiceError } from "../ApiServiceError";

class TagQueryService {
  static async getList(): Promise<ResponseData<TagSelect[]>> {
    try {
      const result = await db.select().from(tags);

      const res: ResponseData<TagSelect[]> = {
        success: true,
        message: "Success Get Tags",
        data: result,
      };

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }
}

export default TagQueryService;
