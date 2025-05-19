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

export * from "./companies";
export * from "./credentials";
export * from "./experiences";
export * from "./project-tags";
export * from "./projects";
export * from "./skills";
export * from "./socials";
export * from "./tags";
export * from "./users";
