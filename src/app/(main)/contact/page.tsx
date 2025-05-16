import { socials, users } from "@/db/schema";
import { db } from "@/db";
import ContactView from "@/views/contact/ContactView";
import { getTableColumns } from "drizzle-orm";

const ContactPage = async () => {
  const { createdAt, updatedAt, ...rest } = getTableColumns(users);
  const user = await db
    .select({ ...rest })
    .from(users)
    .limit(1);
  const socialsResult = await db.select().from(socials);
  return <ContactView socials={socialsResult} user={user[0]} />;
};

export default ContactPage;
