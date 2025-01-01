import { companies } from "./companies";
import { credentials } from "./credentials";
import { experiences } from "./experiences";
import { images } from "./images";
import { links, linkTypeEnum } from "./links";
import { projectTags } from "./project-tags";
import { projects } from "./projects";
import { socials } from "./socials";
import { tags } from "./tags";
import { users } from "./users";

export const schema = {
  linkTypeEnum,
  users,
  links,
  projects,
  tags,
  experiences,
  credentials,
  companies,
  images,
  socials,
  projectTags,
};

export * from "./users";
export * from "./links";
export * from "./projects";
export * from "./tags";
export * from "./project-tags";
export * from "./experiences";
export * from "./companies";
export * from "./images";
export * from "./socials";
export * from "./credentials";
