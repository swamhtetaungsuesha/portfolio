import { db } from "@/db";
import { tags, TagSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { getTableColumns } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<void>,
  res: ExtendedNextApiReponse<TagSelect[]>
) {
  if (req.method === "GET") {
    try {
      const {
        createdAt: _createdAt,
        updatedAt: _updatedAt,
        ...rest
      } = getTableColumns(tags);
      const result = await db.select({ ...rest }).from(tags);
      res.status(200).json({
        success: true,
        message: "Success",
        data: result,
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to get list of tag" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
