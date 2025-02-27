// CompanyDataCard.tsx
"use client";
import React from "react";
import { CompanySelect } from "@/db/schema";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CompanyForm from "../form/company";
import CompanyService from "@/services/company/CompanyService";
import { toast } from "sonner";

interface CompanyCardProps {
  company: CompanySelect;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const onDelete = async (id: number) => {
    const res = await CompanyService.delete({ id });
    if (res.success) {
      toast("Success", {
        description: res.message,
      });
    } else {
      toast("Error", {
        description: res.message,
      });
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
            width={60}
            height={60}
            className="rounded-sm"
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
            <CompanyForm defaultValues={company} />
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={() => onDelete(company.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CompanyCard;
