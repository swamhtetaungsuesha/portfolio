import { db } from "@/db";
import { companies, CompanySelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { getTableColumns } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<void>,
  res: ExtendedNextApiReponse<CompanySelect[]>
) {
  if (req.method === "GET") {
    try {
      const {
        createdAt: _createdAt,
        updatedAt: _updatedAt,
        ...rest
      } = getTableColumns(companies);
      const result = await db.select({ ...rest }).from(companies);
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({
        success: true,
        message: "Success",
        data: result,
      });
    } catch {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(500)
        .json({ success: false, message: "Failed to get list of company" });
    }
  } else {
    res.setHeader("Content-Type", "application/json");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
