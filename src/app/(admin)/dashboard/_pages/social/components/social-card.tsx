"use client";
import { SocialSelect } from "@/db/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import SocialService from "@/services/social/SocialService";
import { SocialForm } from "./social-form";

export function SocialCard({ social }: { social: SocialSelect }) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this company?")) {
      const response = await SocialService.delete({ id: social.id });
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
    <div className="border p-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="text-lg font-semibold">{social.name}</h3>
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {social.link}
          </a>
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
            <SocialForm initialData={social} />
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
