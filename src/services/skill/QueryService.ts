import { db } from "@/db";
import { skills, SkillWithTag, tags } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { ResponseData } from "../ApiResponse";
import { APIServiceError } from "../ApiServiceError";

class SkillQueryService {
  static async getList(): Promise<ResponseData<SkillWithTag[]>> {
    try {
      const result = await db
        .select({
          id: skills.id,
          category: skills.category,
          startedAt: skills.startedAt,
          tag: sql<string>`${tags.name}`.as("tag"),
        })
        .from(skills)
        .leftJoin(tags, eq(skills.tagId, tags.id));

      const res: ResponseData<SkillWithTag[]> = {
        success: true,
        message: "Success Get Skills!",
        data: result,
      };

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }
}

export default SkillQueryService;
