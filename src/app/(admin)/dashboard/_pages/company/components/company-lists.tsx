import { db } from "@/db";
import { companies } from "@/db/schema";
import { CompanyCard } from "./company-card";

export async function CompanyList() {
  //   const companyList = await db.select().from(companies);

  return (
    <div className="space-y-4">
      {/* {companyList.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))} */}
    </div>
  );
}
