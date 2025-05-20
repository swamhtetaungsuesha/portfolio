import { db } from "@/db";
import { skills, SkillWithTag, tags } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

class SkillQueryService {
  static async getList(): Promise<SkillWithTag[]> {
    const result = await db
      .select({
        id: skills.id,
        category: skills.category,
        startedAt: skills.startedAt,
        tag: sql<string>`${tags.name}`.as("tag"),
      })
      .from(skills)
      .leftJoin(tags, eq(skills.tagId, tags.id));

    return result;
  }
}

export default SkillQueryService;
