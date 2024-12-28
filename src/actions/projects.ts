import { db } from "@/db";
import {
  images,
  ImageSelect,
  links,
  projects,
  projectTags,
  ProjectWithLinkAndTags,
  tags,
} from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

const populateImage = sql<ImageSelect>`JSONB_BUILD_OBJECT(
    'id', ${images.id},
        'name', ${images.name},
        'uri', ${images.uri},
        'thumbnail_uri', ${images.thumbnailUri},
        'blur_hash', ${images.blurHash},
        'metadata', ${images.metadata},
        'created_at', ${images.createdAt},
        'updated_at', ${images.updatedAt}
)`;

export const getProjects = async (): Promise<ProjectWithLinkAndTags[]> => {
  const result: ProjectWithLinkAndTags[] = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      liveUrl: links.uri,
      githubUrl: links.uri,
      image: populateImage.as("image"),
      tags: sql<string[]>`ARRAY_AGG(${tags.name})`.as("tags"),
      isActive: projects.isActive,
      startedAt: projects.startedAt,
      endedAt: projects.endedAt,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .innerJoin(links, eq(links.id, projects.liveLinkId))
    .innerJoin(links, eq(links.id, projects.githubLinkId))
    .leftJoin(images, eq(images.id, projects.imageId))
    .leftJoin(projectTags, eq(projectTags.projectId, projects.id))
    .leftJoin(tags, eq(tags.id, projectTags.tagId))
    .groupBy(projects.id, links.id)
    .orderBy(desc(projects.startedAt));

  //   const data = await Promise.all(
  //     result.map(async (project) => {
  //       return getGithubData(project);
  //     })
  //   );

  return result;
};
