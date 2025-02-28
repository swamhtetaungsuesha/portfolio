import TagCard from "@/components/card/tag";
import { db } from "@/db";
import { tags } from "@/db/schema";

const Tag = async () => {
  const result = await db.select().from(tags);
  return (
    <div className="grid grid-cols-5 gap-2">
      {result.map((tag) => (
        <TagCard tag={tag} key={tag.id} />
      ))}
    </div>
  );
};

export default Tag;
