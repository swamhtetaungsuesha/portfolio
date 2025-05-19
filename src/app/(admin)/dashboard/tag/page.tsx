import TagCard from "@/components/card/tag";
import TagQueryService from "@/services/tag/QueryService";

const Tag = async () => {
  const result = await TagQueryService.getList();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return (
    <div className="grid grid-cols-5 gap-2">
      {result.data.map((tag) => (
        <TagCard tag={tag} key={tag.id} />
      ))}
    </div>
  );
};

export default Tag;
