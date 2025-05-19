import { db } from "@/db";
import { companies, CompanySelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { CompanyDataWithoutId } from "@/services/company/Company";

export default async function handler(
  req: ExtendedNextApiRequest<CompanyDataWithoutId>,
  res: ExtendedNextApiReponse<CompanySelect>
) {
  if (req.method === "POST") {
    try {
      const companyData = req.body;

      const result = await db.insert(companies).values(companyData).returning();
      res.status(200).json({
        success: true,
        message: "You are created a company successfully!",
        data: result[0],
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to insert company" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
