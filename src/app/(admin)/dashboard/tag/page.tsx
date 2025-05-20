import TagQueryService from "@/services/tag/QueryService";
import TagView from "@/views/admin/tag/TagView";

const TagPage = async () => {
  const result = await TagQueryService.getList();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return <TagView tags={result.data} />;
};

export default TagPage;
