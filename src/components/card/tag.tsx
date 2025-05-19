// TagDataCard.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TagSelect } from "@/db/schema";
import React from "react";
import { toast } from "sonner";
import TagForm from "../form/tag";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TagCommandService from "@/services/tag/CommandService";

interface TagDataCardProps {
  tag: TagSelect;
}

const TagCard: React.FC<TagDataCardProps> = ({ tag }) => {
  const onDelete = async (id: number) => {
    const res = await TagCommandService.delete({ id });
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
        <CardTitle>{tag.name}</CardTitle>
        <CardDescription>{tag.term}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex justify-between w-full gap-2">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onDelete(tag.id)}
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
                <DialogTitle>Update Tag</DialogTitle>
              </DialogHeader>
              <TagForm defaultValues={tag} />
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TagCard;
