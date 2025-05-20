import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectWithTags } from "@/db/schema";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

const ProjectView = (props: { projects: ProjectWithTags[] }) => {
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="w-[450px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <ProjectForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {props.projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default ProjectView;
