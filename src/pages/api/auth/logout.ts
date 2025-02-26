import { eq } from "drizzle-orm";
import { db } from "@/db";
import { credentials } from "@/db/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";

export default async function handler(
  req: ExtendedNextApiRequest<{ id: number }>,
  res: ExtendedNextApiReponse<null>
) {
  if (req.method === "POST") {
    try {
      // Clear the cookie
      res.setHeader("Set-Cookie", [
        `auth_token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`, // Max-Age=0 to delete
      ]);

      await db
        .update(credentials)
        .set({ isAuthenticated: false })
        .where(eq(credentials.id, req.body.id));

      res
        .status(200)
        .json({
          success: true,
          message: "Logged out successfully",
          data: null,
        });
    } catch (error) {
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
