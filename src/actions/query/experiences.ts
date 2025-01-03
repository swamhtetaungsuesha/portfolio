import { db } from "@/db";
import {
  companies,
  // CompanyWithImageAndLink,
  CompanySelect,
  experiences,
  ExperienceWithCompany,
} from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

const populateCompany = sql<CompanySelect>`JSONB_BUILD_OBJECT(
    'id', ${companies.id},
    'image', ${companies.image},
    'name', ${companies.name},
    'uri', ${companies.link},
    'created_at', ${companies.createdAt},
    'updated_at', ${companies.updatedAt}
)`;

export const getExperiences = async (): Promise<ExperienceWithCompany[]> => {
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

  return result;
};
