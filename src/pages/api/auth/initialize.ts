import { db } from "@/db";
import { credentials } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.insert(credentials).values({
        username,
        password: hashedPassword,
        isAuthenticated: false,
      });

      res
        .status(200)
        .json({ success: true, message: "Auth initialized successfully" });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Error initializing auth" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
