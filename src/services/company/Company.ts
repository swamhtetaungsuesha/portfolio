import { CompanySelect } from "@/db/schema";

export type CompanyDataWithoutId = Omit<
  CompanySelect,
  "id" | "createdAt" | "updatedAt"
>;
