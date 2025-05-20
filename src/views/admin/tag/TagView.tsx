import { TagSelect } from "@/db/schema";
import TagCard from "./TagCard";

const TagView = async (props: { tags: TagSelect[] }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {props.tags.map((tag) => (
        <TagCard tag={tag} key={tag.id} />
      ))}
    </div>
  );
};

export default TagView;
