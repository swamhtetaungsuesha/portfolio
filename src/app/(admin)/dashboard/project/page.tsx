import ProjectCard from "@/components/card/project";
import ProjectForm from "@/components/form/project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/db";
import { projects, projectTags, ProjectWithTags, tags } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

const Project = async () => {
  const result: ProjectWithTags[] = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      liveUrl: projects.liveUrl,
      githubUrl: projects.githubUrl,
      thumbnailImage: projects.thumbnailImage,
      image: projects.thumbnailImage,
      tags: sql<string[]>`ARRAY_AGG(${tags.name})`.as("tags"),
      isActive: projects.isActive,
      startedAt: projects.startedAt,
      endedAt: projects.endedAt,
    })
    .from(projects)
    .leftJoin(projectTags, eq(projectTags.projectId, projects.id))
    .leftJoin(tags, eq(tags.id, projectTags.tagId))
    .groupBy(projects.id)
    .orderBy(desc(projects.startedAt));
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Company Management</h1> */}
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
        {result.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default Project;
