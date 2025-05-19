import { db } from "@/db";
import { companies, CompanySelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<{ id: number }>,
  res: ExtendedNextApiReponse<CompanySelect>
) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;

      const result = await db
        .delete(companies)
        .where(eq(companies.id, id))
        .returning();
      res.status(200).json({
        success: true,
        message: "You are deleted a company successfully!",
        data: result[0],
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete company" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
