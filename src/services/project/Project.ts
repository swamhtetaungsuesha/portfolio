import { ProjectSelect } from "@/db/schema";

export type ProjectDataWithoutId = Omit<ProjectSelect, "id"> & {
  tags: string[];
};

export type ProjectData = Omit<ProjectSelect, "createdAt" | "updatedAt"> & {
  tags: string[];
};
