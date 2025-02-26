import { ProjectSelect } from "@/db/schema";

export type ProjectDataWithoutId = Omit<
  ProjectSelect,
  "id" | "createdAt" | "updatedAt"
> & {
  tags: string[];
};
