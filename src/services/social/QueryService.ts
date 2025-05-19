import { db } from "@/db";
import { socials, SocialSelect } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import { APIServiceError } from "../ApiServiceError";

class SocialQueryService {
  static async getList(): Promise<ResponseData<SocialSelect[]>> {
    try {
      const result = await db.select().from(socials);
      const res: ResponseData<SocialSelect[]> = {
        success: true,
        message: "Success Get Socials",
        data: result,
      };

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }
}

export default SocialQueryService;
