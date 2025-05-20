import { db } from "@/db";
import {
  companies,
  CompanySelect,
  experiences,
  ExperienceWithCompany,
} from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

class ExperienceQueryService {
  static async getList(): Promise<ExperienceWithCompany[]> {
    const populateCompany = sql<CompanySelect>`JSONB_BUILD_OBJECT(
              'id', ${companies.id},
              'image', ${companies.image},
              'name', ${companies.name},
              'link', ${companies.link}
          )`;
    const result = await db
      .select({
        id: experiences.id,
        company: populateCompany.as("company"),
        position: experiences.position,
        description: experiences.description,
        startedAt: experiences.startedAt,
        endedAt: experiences.endedAt,
        isActive: experiences.isActive,
      })
      .from(experiences)
      .leftJoin(companies, eq(experiences.companyId, companies.id))
      .groupBy(experiences.id, companies.id)
      .orderBy(desc(experiences.startedAt));

    return result;
  }
}

export default ExperienceQueryService;
