import TagQueryService from "@/services/tag/QueryService";
import TagView from "@/views/admin/tag/TagView";

const TagPage = async () => {
  const result = await TagQueryService.getList();
  return <TagView tags={result} />;
};

export default TagPage;
