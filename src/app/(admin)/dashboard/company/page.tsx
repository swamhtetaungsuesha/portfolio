"use server";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { companies } from "@/db/schema";
import { db } from "@/db";
import CompanyCard from "@/components/card/company";
import CompanyForm from "@/components/form/company";
export default async function Page() {
  const result = await db.select().from(companies);
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Company Management</h1> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="w-[450px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <CompanyForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {result.map((company) => (
          <CompanyCard company={company} key={company.id} />
        ))}
      </div>
      {/* <Suspense fallback={<div>Loading companies...</div>}> */}
      {/* </Suspense> */}
    </div>
  );
}
