import { SkillSelect } from "@/db/schema";

export type SkillDataWithoutId = Omit<SkillSelect, "id" | "tagId"> & {
  tag: string;
};
