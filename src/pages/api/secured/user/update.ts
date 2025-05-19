import { db } from "@/db";
import { users, UserSelect } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import { eq } from "drizzle-orm";

export default async function handler(
  req: ExtendedNextApiRequest<UserSelect>,
  res: ExtendedNextApiReponse<UserSelect>
) {
  if (req.method === "POST") {
    try {
      const userData = req.body;

      const result = await db
        .update(users)
        .set({
          ...userData,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userData.id))
        .returning();
      res.status(200).json({
        success: true,
        message: "You are updated a user successfully!",
        data: result[0],
      });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Failed to insert user" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
