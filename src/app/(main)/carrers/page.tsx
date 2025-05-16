import { db } from "@/db";
import { companies, CompanySelect, experiences } from "@/db/schema";
import CareersView from "@/views/careers/CareersView";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const CarrersPage = async () => {
  // const { createdAt, updatedAt, ...rest } = getTableColumns(companies);
  // const companiesResult = await db.select({ ...rest }).from(companies);
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
  return <CareersView experiences={result} />;
};

export default CarrersPage;
