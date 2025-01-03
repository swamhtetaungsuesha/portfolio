import { eq } from "drizzle-orm";
import { db } from "@/db"; // Assume this is your database connection
import { credentials } from "@/db/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// In a real application, this should be an environment variable
const SECRET_KEY = process.env.SECRET_KEY!;

export async function initializeAuth(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(credentials).values({
      username,
      password: hashedPassword,
      isAuthenticated: false,
    });

    return { success: true, message: "Auth initialized successfully" };
  } catch (error) {
    console.error("Error initializing auth:", error);
    return { success: false, error: "Error initializing auth" };
  }
}

export async function authenticate(username: string, password: string) {
  const [auth] = await db.select().from(credentials).limit(1);

  if (!auth) {
    return { success: false, error: "Auth not initialized" };
  }

  if (auth.isAuthenticated) {
    return { success: false, error: "Another user is already authenticated" };
  }

  if (
    auth.username !== username ||
    !(await bcrypt.compare(password, auth.password))
  ) {
    return { success: false, error: "Invalid credentials" };
  }

  const token = jwt.sign({ id: auth.id }, SECRET_KEY);

  await db
    .update(credentials)
    .set({ isAuthenticated: true })
    .where(eq(credentials.id, auth.id));

  return { success: true, token };
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
    const [auth] = await db
      .select()
      .from(credentials)
      .where(eq(credentials.id, decoded.id))
      .limit(1);

    if (!auth || !auth.isAuthenticated) {
      throw Error("Invalid token or not authenticated");
    }

    return { success: true, id: auth.id };
  } catch (error) {
    throw error;
  }
}

export async function logout(token: string) {
  const verificationResult = await verifyToken(token);

  if (!verificationResult.success) {
    return verificationResult;
  }

  await db
    .update(credentials)
    .set({ isAuthenticated: false })
    .where(eq(credentials.id, verificationResult.id!));

  return { success: true, message: "Logged out successfully" };
}

export async function updateCredentials(
  token: string,
  newUsername: string,
  newPassword: string
) {
  const verificationResult = await verifyToken(token);

  if (!verificationResult.success) {
    return verificationResult;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db
    .update(credentials)
    .set({
      username: newUsername,
      password: hashedPassword,
    })
    .where(eq(credentials.id, verificationResult.id!));

  return { success: true, message: "Credentials updated successfully" };
}
