import { db } from "@/db";
import { socials, SocialSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<{ id: number }>,
  res: ExtendedNextApiReponse<SocialSelect>
) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;

      const result = await db
        .delete(socials)
        .where(eq(socials.id, id))
        .returning();
      res.status(200).json({
        success: true,
        message: "You are deleted a social successfully!",
        data: result[0],
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete social" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
