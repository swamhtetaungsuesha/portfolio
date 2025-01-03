import { companies } from "./companies";
import { credentials } from "./credentials";
import { experiences } from "./experiences";
import { projectTags } from "./project-tags";
import { projects } from "./projects";
import { skills } from "./skills";
import { socials } from "./socials";
import { tags } from "./tags";
import { users } from "./users";

export const schema = {
  users,
  projects,
  tags,
  experiences,
  credentials,
  companies,
  socials,
  projectTags,
  skills,
};

export * from "./users";
export * from "./projects";
export * from "./tags";
export * from "./project-tags";
export * from "./experiences";
export * from "./companies";
export * from "./socials";
export * from "./credentials";
export * from "./skills";
