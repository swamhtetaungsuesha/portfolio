import ProjectsView from "@/views/projects/ProjectsView";
import { projects, projectTags, ProjectWithTags, tags } from "@/db/schema";
import { db } from "@/db";
import { desc, eq, sql } from "drizzle-orm";

const ITEMS_PER_PAGE = 4;
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

  return <ProjectsView projects={result} />;
};

export default Project;
