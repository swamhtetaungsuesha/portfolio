// ExperienceDataCard.tsx
"use client";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import { CompanySelect, ExperienceWithCompany } from "@/db/schema";
import { formatDateString } from "@/utils/format";
import React from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
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
import ExperienceCommandService from "@/services/experience/CommandService";
import ExperienceForm from "./ExperienceForm";

interface ExperienceDataCardProps {
  experience: ExperienceWithCompany;
  companies: CompanySelect[];
}

const ExperienceCard: React.FC<ExperienceDataCardProps> = ({
  experience,
  companies,
}) => {
  const onDelete = async (id: number) => {
    const res = await ExperienceCommandService.delete({ id });
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
    <Card>
      <CardHeader>
        <CardTitle>{experience.position}</CardTitle>
        <CardDescription>{experience.company.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm">
            {formatDateString(experience.startedAt)} -{" "}
            {experience.endedAt
              ? formatDateString(experience.endedAt)
              : "Still"}
          </p>
          <Badge variant={"outline"}>
            {experience.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="mt-2">
          {experience.description.map((item, index) => (
            <p key={index} className="text-sm">
              {item}
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2 w-full">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onDelete(experience.id)}
          >
            Delete
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Update
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[450px]">
              <DialogHeader>
                <DialogTitle>Update Experience</DialogTitle>
              </DialogHeader>
              <ExperienceForm
                defaultValues={experience}
                companies={companies}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExperienceCard;
