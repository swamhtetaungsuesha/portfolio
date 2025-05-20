import { db } from "@/db";
import { users, UserSelect } from "@/db/schema";
import { getTableColumns } from "drizzle-orm";

class UserQueryService {
  static async get(): Promise<UserSelect> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, ...rest } = getTableColumns(users);
    const result = await db
      .select({ ...rest })
      .from(users)
      .limit(1);

    return result[0];
  }
}

export default UserQueryService;
