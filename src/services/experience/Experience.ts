import { ExperienceSelect } from "@/db/schema";

export type ExperienceDataWithoutId = Omit<ExperienceSelect, "id">;

export type ExperienceData = Omit<ExperienceSelect, "createdAt" | "updatedAt">;
