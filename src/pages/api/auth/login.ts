import { db } from "@/db";
import { credentials } from "@/db/schema";
import { ExtendedNextApiRequest } from "@/services/ApiRequest";
import { ExtendedNextApiReponse } from "@/services/ApiResponse";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!;

export default async function handler(
  req: ExtendedNextApiRequest<{ username: string; password: string }>,
  res: ExtendedNextApiReponse<void>
) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      const [auth] = await db.select().from(credentials).limit(1);

      if (!auth) {
        return res
          .status(400)
          .json({ success: false, message: "Auth not initialized" });
      }

      // if (auth.isAuthenticated) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Another user is already authenticated",
      //   });
      // }

      if (
        auth.username !== username ||
        !(await bcrypt.compare(password, auth.password))
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: auth.id }, SECRET_KEY);

      // Set the cookie
      res.setHeader("Set-Cookie", [
        `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`, // Example: 1 hour expiration
      ]); // HttpOnly for security, Secure for HTTPS, SameSite for CSRF protection

      await db
        .update(credentials)
        .set({ isAuthenticated: true })
        .where(eq(credentials.id, auth.id));

      return res
        .status(200)
        .json({ success: true, message: "Login successful", data: undefined }); // No token sent back
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ success: false, message: "An error occurred: " + err.message });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
