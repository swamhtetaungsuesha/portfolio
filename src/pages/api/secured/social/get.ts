import { db } from "@/db";
import { socials, SocialSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { getTableColumns } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<void>,
  res: ExtendedNextApiReponse<SocialSelect[]>
) {
  if (req.method === "GET") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, updatedAt, ...rest } = getTableColumns(socials);
      const result = await db.select({ ...rest }).from(socials);
      res.status(200).json({
        success: true,
        message: "Success",
        data: result,
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to get list of social" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
