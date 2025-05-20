"use server";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CompanySelect } from "@/db/schema";
import CompanyForm from "./CompanyForm";
import CompanyCard from "./CompanyCard";
export default async function CompanyView(props: {
  companies: CompanySelect[];
}) {
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
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
        {props.companies.map((company) => (
          <CompanyCard company={company} key={company.id} />
        ))}
      </div>
    </div>
  );
}
