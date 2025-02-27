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
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p className="text-sm text-muted-foreground">{project.description}</p>
      <div className="mt-2">
        <p>
          <strong>Live URL:</strong>{" "}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {project.liveUrl}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>GitHub URL:</strong>{" "}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {project.githubUrl}
          </a>
        </p>
        <p>
          <strong>Started:</strong> {project.startedAt}
        </p>
        {project.endedAt && (
          <p>
            <strong>Ended:</strong> {project.endedAt}
          </p>
        )}
        <p>
          <strong>Active:</strong> {project.isActive ? "Yes" : "No"}
        </p>
      </div>
      <div className="mt-2">
        <p>
          <strong>Tags:</strong> {project.tags.join(", ")}
        </p>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Update</Button>
          </DialogTrigger>
          <DialogContent className="w-[650px]">
            <DialogHeader>
              <DialogTitle>Update Company</DialogTitle>
            </DialogHeader>
            <ProjectForm defaultValues={project} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectCard;
