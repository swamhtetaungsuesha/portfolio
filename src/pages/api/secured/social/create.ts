import { db } from "@/db";
import { socials, SocialSelect, users } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { SocialDataWithoutId } from "@/services/social/Social";

export default async function handler(
  req: ExtendedNextApiRequest<SocialDataWithoutId>,
  res: ExtendedNextApiReponse<SocialSelect>
) {
  if (req.method === "POST") {
    try {
      const socialData = req.body;
      const [userId] = await db
        .select({
          id: users.id,
        })
        .from(users);
      const result = await db
        .insert(socials)
        .values({ userId: userId.id, ...socialData })
        .returning();
      res.status(200).json({
        success: true,
        message: "You are created a social successfully!",
        data: result[0],
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to insert social" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
