// CompanyDataCard.tsx
"use client";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import { CompanySelect } from "@/db/schema";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CompanyCommandService from "@/services/company/CommandService";
import CompanyForm from "./CompanyForm";

interface CompanyCardProps {
  company: CompanySelect;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const onDelete = async (id: number) => {
    const res = await CompanyCommandService.delete({ id });
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
    <Card key={company.id} className="bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{company.name}</CardTitle>
        <Link href={company.link}>
          <Button variant={"outline"} size={"icon"}>
            <Eye />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {company.image && (
          <img
            src={company.image}
            alt={`${company.name}-logo`}
            width="100%"
            className="rounded-sm"
          />
        )}
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2 w-full">
          <Dialog>
            <DialogTrigger asChild className="w-full">
              <Button variant="outline" className="w-full">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Company</DialogTitle>
              </DialogHeader>
              <CompanyForm defaultValues={company} />
            </DialogContent>
          </Dialog>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onDelete(company.id)}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
