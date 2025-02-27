import { SocialSelect } from "@/db/schema";

export type SocialDataWithoutId = Omit<SocialSelect, "id" | "userId">;
