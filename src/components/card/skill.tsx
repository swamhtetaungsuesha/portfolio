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
import { formatDateString } from "@/utils/format";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
