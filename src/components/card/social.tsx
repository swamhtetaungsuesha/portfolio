// SocialDataCard.tsx
"use client";
import React from "react";
import { SocialSelect } from "@/db/schema";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SocialForm from "../form/social";
import SocialService from "@/services/social/SocialService";
import { toast } from "sonner";

interface SocialDataCardProps {
  social: SocialSelect;
}

const SocialCard: React.FC<SocialDataCardProps> = ({ social }) => {
  const onDelete = async (id: number) => {
    const res = await SocialService.delete({ id });
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
      <h3 className="text-lg font-semibold">{social.name}</h3>
      <p>
        <strong>Link:</strong>{" "}
        <a
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {social.link}
        </a>
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(social.id)}
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
            <SocialForm defaultValues={social} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SocialCard;
