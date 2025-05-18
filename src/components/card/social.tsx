// SocialDataCard.tsx
"use client";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SocialSelect } from "@/db/schema";
import SocialService from "@/services/social/SocialService";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import SocialForm from "../form/social";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{social.name}</CardTitle>

        <Link href={social.link} target="_blank">
          <Button variant={"link"}>
            <LinkIcon />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex w-full gap-2">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onDelete(social.id)}
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
                <DialogTitle>Update Company</DialogTitle>
              </DialogHeader>
              <SocialForm defaultValues={social} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialCard;
