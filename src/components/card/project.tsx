// ProjectDataCard.tsx
"use client";
import React from "react";
import { ProjectWithTags } from "@/db/schema";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ProjectForm from "../form/project";
import ProjectService from "@/services/project/ProjectService";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDateString } from "@/utils/format";
import { Badge } from "../ui/badge";
import { LinkIcon } from "lucide-react";
import { TbBrandGithub } from "react-icons/tb";
import { FaGithub, FaGithubSquare } from "react-icons/fa";
import Link from "next/link";

interface ProjectDataCardProps {
  project: ProjectWithTags;
}

const ProjectCard: React.FC<ProjectDataCardProps> = ({ project }) => {
  const onDelete = async (id: number) => {
    const res = await ProjectService.delete({ id });
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
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex gap-2">
          {project.liveUrl && (
            <Link href={project.liveUrl}>
              <Button variant={"outline"} size={"icon"}>
                <LinkIcon />
              </Button>
            </Link>
          )}
          <Link href={project.githubUrl}>
            <Button variant={"outline"} size={"icon"}>
              <FaGithubSquare />
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">
            {formatDateString(project.startedAt)} -{" "}
            {project.endedAt ? formatDateString(project.endedAt) : "Still"}
          </p>
          <Badge variant={"outline"}>
            {project.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="mt-2 flex gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onDelete(project.id)}
          >
            Delete
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Update
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[650px]">
              <DialogHeader>
                <DialogTitle>Update Company</DialogTitle>
              </DialogHeader>
              <ProjectForm defaultValues={project} />
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
