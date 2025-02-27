import UserForm from "@/components/form/user";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getTableColumns } from "drizzle-orm";

const User = async () => {
  const { createdAt, updatedAt, ...rest } = getTableColumns(users);
  const result = await db
    .select({ ...rest })
    .from(users)
    .limit(1);
  return (
    <div>
      <UserForm defaultValues={result[0]} />
    </div>
  );
};

export default User;
