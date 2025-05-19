import { db } from "@/db";
import { skills, SkillWithTag, tags } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq, sql } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<void>,
  res: ExtendedNextApiReponse<SkillWithTag[]>
) {
  if (req.method === "GET") {
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
      res.status(200).json({
        success: true,
        message: "Success",
        data: result,
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to get list of skill" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
