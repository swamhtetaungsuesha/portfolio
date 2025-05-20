import { db } from "@/db";
import { socials, SocialSelect } from "@/db/schema";

class SocialQueryService {
  static async getList(): Promise<SocialSelect[]> {
    const result = await db.select().from(socials);

    return result;
  }
}

export default SocialQueryService;
