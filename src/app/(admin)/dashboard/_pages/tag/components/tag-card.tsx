"use client";
import { TagSelect } from "@/db/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { TagForm } from "./tag-form";
import TagService from "@/services/tag/TagService";

export function TagCard({ tag }: { tag: TagSelect }) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this tag?")) {
      const response = await TagService.delete({ id: tag.id });
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
      key={tag.id}
      className="border p-4 rounded-lg flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="text-lg font-semibold">{tag.name}</h3>
          <h5 className="text-sm">{tag.term}</h5>
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
            <TagForm initialData={tag} />
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
