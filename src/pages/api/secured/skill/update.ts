import { db } from "@/db";
import { skills, SkillWithTag, tags } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<SkillWithTag>,
  res: ExtendedNextApiReponse<SkillWithTag>
) {
  if (req.method === "POST") {
    try {
      const skillData = req.body;
      const { tag: tagName, ...skillDetail } = skillData;
      const updatedSkill = await db.transaction(async (tx) => {
        const tag = await (async () => {
          const [existingTag] = await tx
            .select()
            .from(tags)
            .where(eq(tags.name, tagName));

          if (existingTag) {
            return existingTag;
          } else {
            const [newTag] = await tx
              .insert(tags)
              .values({ name: tagName, term: tagName.toLowerCase() })
              .returning();

            return newTag;
          }
        })();

        const [insertedSkill] = await tx
          .update(skills)
          .set({
            tagId: tag.id,
            ...skillDetail,
            updatedAt: new Date(),
          })
          .where(eq(skills.id, skillData.id))
          .returning();

        return { ...insertedSkill, tag: tag.name };
      });

      res.status(200).json({
        success: true,
        message: "You are updated a skill successfully!",
        data: updatedSkill,
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to update skill" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
