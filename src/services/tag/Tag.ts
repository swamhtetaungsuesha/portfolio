import { TagSelect } from "@/db/schema";

export type TagDataWithoutId = Omit<TagSelect, "id">;
