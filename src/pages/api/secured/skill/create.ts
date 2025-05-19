import { db } from "@/db";
import { skills, SkillWithTag, tags } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { SkillDataWithoutId } from "@/services/skill/Skill";
import { eq, getTableColumns } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<SkillDataWithoutId>,
  res: ExtendedNextApiReponse<SkillWithTag>
) {
  if (req.method === "POST") {
    try {
      const skillData = req.body;
      const { tag: tagName, ...skillDetail } = skillData;
      const insertedSkill = await db.transaction(async (tx) => {
        const tag = await (async () => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { createdAt, updatedAt, ...rest } = getTableColumns(tags);
          const [existingTag] = await tx
            .select({ ...rest })
            .from(tags)
            .where(eq(tags.name, tagName));

          if (existingTag) {
            return existingTag;
          } else {
            const [newTag] = await tx
              .insert(tags)
              .values({ name: tagName, term: tagName.toLowerCase() })
              .returning({ ...rest });

            return newTag;
          }
        })();

        const [insertedSkill] = await tx
          .insert(skills)
          .values({ tagId: tag.id, ...skillDetail })
          .returning();

        return { ...insertedSkill, tag: tag.name };
      });
      res.status(200).json({
        success: true,
        message: "You are created a skill successfully!",
        data: insertedSkill,
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to insert skill" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
