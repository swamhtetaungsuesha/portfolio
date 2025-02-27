// SkillDataCard.tsx
"use client";
import React from "react";
import { SkillWithTag } from "@/db/schema";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SkillForm from "../form/skill";
import SkillService from "@/services/skill/SkillService";
import { toast } from "sonner";

interface SkillCardProps {
  skill: SkillWithTag;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const onDelete = async (id: number) => {
    const res = await SkillService.delete({ id });
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
      <h3 className="text-lg font-semibold">{skill.tag}</h3>
      <p className="text-sm text-muted-foreground">
        Category: {skill.category}
      </p>
      <div className="mt-2">
        <p>
          <strong>Started:</strong> {skill.startedAt}
        </p>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(skill.id)}
        >
          Delete
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Update</Button>
          </DialogTrigger>
          <DialogContent className="w-[450px]">
            <DialogHeader>
              <DialogTitle>Update Company</DialogTitle>
            </DialogHeader>
            <SkillForm defaultValues={skill} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SkillCard;
