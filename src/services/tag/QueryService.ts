import { db } from "@/db";
import { tags, TagSelect } from "@/db/schema";

class TagQueryService {
  static async getList(): Promise<TagSelect[]> {
    const result = await db.select().from(tags);

    return result;
  }
}

export default TagQueryService;
