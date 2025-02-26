"use client";
import { CompanySelect } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { deleteCompany } from "@/actions/command/companies";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CompanyForm } from "./company-form";
import CompanyService from "@/services/company/CompanyService";
import { toast } from "sonner";

interface CompanyCardProps {
  company: CompanySelect;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this company?")) {
      const response = await CompanyService.delete({ id: company.id });
      if (response.success) {
        toast("Success", {
          description: response.message,
        });
      } else {
        toast("Error", {
          description: response.message,
        });
      }
    }
  };

  return (
    <div
      key={company.id}
      className="border p-4 rounded-lg flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        {company.image && (
          <img
            src={company.image}
            alt={`${company.name}-logo`}
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
        <div>
          <h3 className="text-lg font-semibold">{company.name}</h3>
          <a
            href={company.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {company.link}
          </a>
        </div>
      </div>
      <div className="space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Company</DialogTitle>
            </DialogHeader>
            <CompanyForm initialData={company} />
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
