import { db } from "@/db";
import {
  companies,
  CompanySelect,
  experiences,
  ExperienceWithCompany,
} from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { desc, eq, sql } from "drizzle-orm";
const populateCompany = sql<CompanySelect>`JSONB_BUILD_OBJECT(
    'id', ${companies.id},
    'image', ${companies.image},
    'name', ${companies.name},
    'uri', ${companies.link},
    'created_at', ${companies.createdAt},
    'updated_at', ${companies.updatedAt}
)`;

export default async function handler(
  req: ExtendedNextApiRequest<{}>,
  res: ExtendedNextApiReponse<ExperienceWithCompany[]>
) {
  if (req.method === "GET") {
    try {
      const result = await db
        .select({
          id: experiences.id,
          company: populateCompany.as("company"),
          position: experiences.position,
          description: experiences.description,
          startedAt: experiences.startedAt,
          endedAt: experiences.endedAt,
          isActive: experiences.isActive,
          createdAt: experiences.createdAt,
          updatedAt: experiences.updatedAt,
        })
        .from(experiences)
        .leftJoin(companies, eq(experiences.companyId, companies.id))
        .groupBy(experiences.id, companies.id)
        .orderBy(desc(experiences.startedAt));
      res.status(200).json({
        success: true,
        message: "Success",
        data: result,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to get list of company" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
