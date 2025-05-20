import SkillQueryService from "@/services/skill/QueryService";
import SkillView from "@/views/admin/skill/SkillView";

const SkillPage = async () => {
  const result = await SkillQueryService.getList();
  if (!result.success) {
    return <div>500 Server Error</div>;
  }
  return <SkillView skills={result.data} />;
};

export default SkillPage;
