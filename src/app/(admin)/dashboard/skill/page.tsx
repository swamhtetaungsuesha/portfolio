import SkillQueryService from "@/services/skill/QueryService";
import SkillView from "@/views/admin/skill/SkillView";

const SkillPage = async () => {
  const result = await SkillQueryService.getList();

  return <SkillView skills={result} />;
};

export default SkillPage;
