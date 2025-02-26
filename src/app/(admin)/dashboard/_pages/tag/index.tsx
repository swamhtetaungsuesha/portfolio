import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/db";
import { tags } from "@/db/schema";
import { TagForm } from "./components/tag-form";
import { TagCard } from "./components/tag-card";

const Tag = async () => {
  const result = await db.select().from(tags);
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="w-[450px]">
            <DialogHeader>
              <DialogTitle>Add New</DialogTitle>
            </DialogHeader>
            <TagForm />
          </DialogContent>
        </Dialog>
      </div>
      {result.map((tag) => (
        <TagCard tag={tag} key={tag.id} />
      ))}
    </div>
  );
};

export default Tag;
