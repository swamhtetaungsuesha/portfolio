import { db } from "@/db";
import { socials, SocialWithoutUser, users, UserSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq, sql } from "drizzle-orm";
const populateSocials = sql<SocialWithoutUser[]>`ARRAY_AGG(
JSONB_BUILD_OBJECT(
    'id', ${socials.id},
    'name', ${socials.name},
    'link', ${socials.link},
  ),
)`;

export default async function handler(
  req: ExtendedNextApiRequest<{}>,
  res: ExtendedNextApiReponse<UserSelect[]>
) {
  if (req.method === "GET") {
    try {
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
        })
        .from(users)
        .leftJoin(socials, eq(socials.userId, users.id))
        .groupBy(users.id)
        .limit(1)
        .orderBy();
      res.status(200).json({
        success: true,
        message: "Success",
        data: result,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to get list of user" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
