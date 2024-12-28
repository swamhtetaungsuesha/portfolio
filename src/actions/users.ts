import { db } from "@/db";
import { links, LinkType, socials, SocialWithoutUser } from "@/db/schema";
import { users, UserWithLinks } from "@/db/schema/users";
import { and, eq, ilike, or, sql } from "drizzle-orm";

const populateSocials = sql<SocialWithoutUser[]>`ARRAY_AGG(
JSONB_BUILD_OBJECT(
    'id', ${socials.id},
    'name', ${socials.name},
    'link', JSONB_BUILD_OBJECT(
    'id', ${links.id},
    'name', ${links.name},
    'type', ${links.type},
    'uri', ${links.uri},
    'created_at', ${links.createdAt},
    'updated_at', ${links.updatedAt}
  ),
    'created_at', ${links.createdAt},
    'updated_at', ${links.updatedAt}
  )
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
      socials: populateSocials.as("socials"),
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .leftJoin(socials, eq(socials.userId, socials.id))
    .leftJoin(
      links,
      and(
        eq(socials.linkId, links.id),
        or(eq(links.type, LinkType.SOCIAL), ilike(links.name, "resume"))
      )
    )
    .groupBy(users.id)
    .limit(1)
    .orderBy();

  if (!result[0]) {
    throw new Error("User not found");
  }

  return result[0];
};
