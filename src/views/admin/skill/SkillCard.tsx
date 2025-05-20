// SkillDataCard.tsx
"use client";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import { SkillWithTag } from "@/db/schema";
import { formatDateString } from "@/utils/format";
import React from "react";
import { toast } from "sonner";
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
import SkillCommandService from "@/services/skill/CommandService";
import SkillForm from "./SkillForm";

interface SkillCardProps {
  skill: SkillWithTag;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const onDelete = async (id: number) => {
    const res = await SkillCommandService.delete({ id });
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
        <CardTitle>{skill.tag}</CardTitle>
        <CardDescription>{skill.category}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm">
          <strong>Started at - </strong> {formatDateString(skill.startedAt)}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full gap-2">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onDelete(skill.id)}
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
                <DialogTitle>Update Skill</DialogTitle>
              </DialogHeader>
              <SkillForm defaultValues={skill} />
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;
