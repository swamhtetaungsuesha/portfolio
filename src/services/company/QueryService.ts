import { companies, CompanySelect } from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import { APIServiceError } from "../ApiServiceError";
import { getTableColumns } from "drizzle-orm";
import { db } from "@/db";

class CompanyQueryService {
  static async getList(): Promise<ResponseData<CompanySelect[]>> {
    try {
      const {
        createdAt: _createdAt,
        updatedAt: _updatedAt,
        ...rest
      } = getTableColumns(companies);
      const result = await db.select({ ...rest }).from(companies);
      const res: ResponseData<CompanySelect[]> = {
        success: true,
        message: "Success Get Companies",
        data: result,
      };
      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }
}

export default CompanyQueryService;
