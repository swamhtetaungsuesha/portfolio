import { db } from "@/db";
import { socials, SocialSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";

export default async function handler(
  req: ExtendedNextApiRequest<{}>,
  res: ExtendedNextApiReponse<SocialSelect[]>
) {
  if (req.method === "GET") {
    try {
      const result = await db.select().from(socials);
      res.status(200).json({
        success: true,
        message: "Success",
        data: result,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to get list of social" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
