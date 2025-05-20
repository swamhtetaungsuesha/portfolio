import { db } from "@/db";
import { companies, CompanySelect } from "@/db/schema";
import { getTableColumns } from "drizzle-orm";

class CompanyQueryService {
  static async getList(): Promise<CompanySelect[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, ...rest } = getTableColumns(companies);
    const result = await db.select({ ...rest }).from(companies);

    return result;
  }
}

export default CompanyQueryService;
