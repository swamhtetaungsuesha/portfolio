import { companies } from "./companies";
import { experiences } from "./experiences";
import { images } from "./images";
import { links } from "./links";
import { projects } from "./projects";
import { skills } from "./skills";
import { socials } from "./socials";
import { tags } from "./tags";
import { users } from "./users";

export const schema = {
  users,
  links,
  projects,
  tags,
  experiences,
  companies,
  images,
  socials,
  skills,
};

export * from "./users";
export * from "./links";
export * from "./projects";
export * from "./tags";
export * from "./project-tags";
export * from "./experiences";
export * from "./companies";
export * from "./socials";
export * from "./images";
export * from "./skills";
