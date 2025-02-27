// ExperienceDataCard.tsx
"use client";
import React from "react";
import { companies, CompanySelect, ExperienceWithCompany } from "@/db/schema";
import { format } from "date-fns";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import ExperienceService from "@/services/experience/ExperienceService";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ExperienceForm from "../form/experience";

interface ExperienceDataCardProps {
  experience: ExperienceWithCompany;
  companies: CompanySelect[];
}

const ExperienceCard: React.FC<ExperienceDataCardProps> = ({
  experience,
  companies,
}) => {
  const onDelete = async (id: number) => {
    const res = await ExperienceService.delete({ id });
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
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{experience.position}</h3>
      <p className="text-sm text-muted-foreground">{experience.company.name}</p>
      <div className="mt-2">
        <p>
          <strong>Started:</strong> {format(experience.startedAt, "MMMM yyyy")}
        </p>
        {experience.endedAt && (
          <p>
            <strong>Ended:</strong> {format(experience.endedAt, "MMMM yyyy")}
          </p>
        )}
        <p>
          <strong>Active:</strong> {experience.isActive ? "Yes" : "No"}
        </p>
      </div>
      <div className="mt-2">
        <p>
          <strong>Description:</strong>
        </p>
        <ul className="list-disc list-inside">
          {experience.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(experience.id)}
        >
          Delete
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Update</Button>
          </DialogTrigger>
          <DialogContent className="w-[450px]">
            <DialogHeader>
              <DialogTitle>Update Experience</DialogTitle>
            </DialogHeader>
            <ExperienceForm defaultValues={experience} companies={companies} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ExperienceCard;
