import { ExperienceSelect } from "@/db/schema";

export type ExperienceDataWithoutId = Omit<
  ExperienceSelect,
  "id" | "createdAt" | "updatedAt"
>;
