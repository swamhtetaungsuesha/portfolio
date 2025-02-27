import { db } from "@/db";
import { companies, CompanySelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<CompanySelect>,
  res: ExtendedNextApiReponse<CompanySelect>
) {
  if (req.method === "POST") {
    try {
      const companyData = req.body;
      const result = await db
        .update(companies)
        .set({
          ...companyData,
          updatedAt: new Date(),
        })
        .where(eq(companies.id, companyData.id))
        .returning();
      res.status(200).json({
        success: true,
        message: "You are updated a company successfully!",
        data: result[0],
      });
    } catch (error) {
      console.error("Insert Company Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to insert company" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
