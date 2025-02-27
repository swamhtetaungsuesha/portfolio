// TagDataCard.tsx
"use client";
import React from "react";
import { TagSelect } from "@/db/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TagForm from "../form/tag";
import TagService from "@/services/tag/TagService";
import { toast } from "sonner";

interface TagDataCardProps {
  tag: TagSelect;
}

const TagCard: React.FC<TagDataCardProps> = ({ tag }) => {
  const onDelete = async (id: number) => {
    const res = await TagService.delete({ id });
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
      </CardHeader>
      <CardContent>
        <p>
          <strong>Term:</strong> {tag.term}
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(tag.id)}
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
              <TagForm defaultValues={tag} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default TagCard;
