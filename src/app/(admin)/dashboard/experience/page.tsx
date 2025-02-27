import ExperienceCard from "@/components/card/experience";
import ExperienceForm from "@/components/form/experience";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/db";
import { companies, CompanySelect, experiences } from "@/db/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
const populateCompany = sql<CompanySelect>`JSONB_BUILD_OBJECT(
    'id', ${companies.id},
    'image', ${companies.image},
    'name', ${companies.name},
    'uri', ${companies.link}
)`;
const Experience = async () => {
  const { createdAt, updatedAt, ...rest } = getTableColumns(companies);
  const companiesResult = await db.select({ ...rest }).from(companies);
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
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle>Add New Experience</DialogTitle>
            </DialogHeader>
            <ExperienceForm companies={companiesResult} />
          </DialogContent>
        </Dialog>
      </div>
      {result.map((experience) => (
        <ExperienceCard
          experience={experience}
          companies={companiesResult}
          key={experience.id}
        />
      ))}
    </div>
  );
};

export default Experience;
