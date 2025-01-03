import { db } from "@/db";
import { socials, SocialWithoutUser } from "@/db/schema";
import { users, UserWithLinks } from "@/db/schema/users";
import { and, eq, ilike, or, sql } from "drizzle-orm";

const populateSocials = sql<SocialWithoutUser[]>`ARRAY_AGG(
JSONB_BUILD_OBJECT(
    'id', ${socials.id},
    'name', ${socials.name},
    'link', ${socials.link},
    'created_at', ${socials.createdAt},
    'updated_at', ${socials.updatedAt}
  ),
)`;

export const getMe = async (): Promise<UserWithLinks> => {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      nickname: users.nickname,
      phoneNo: users.phoneNo,
      email: users.email,
      slogan: users.slogan,
      message: users.message,
      resumeUrl: users.resumeUrl,
      aboutMeContent: users.aboutMeContent,
      socials: populateSocials.as("socials"),
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .leftJoin(socials, eq(socials.userId, users.id))
    .groupBy(users.id)
    .limit(1)
    .orderBy();

  if (!result[0]) {
    throw new Error("User not found");
  }

  return result[0];
};
