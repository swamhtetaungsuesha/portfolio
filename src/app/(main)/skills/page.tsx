import SkillQueryService from "@/services/skill/QueryService";
import SkillsView from "@/views/skills/SkillsView";

const SkillsPage = async () => {
  const result = await SkillQueryService.getList();

  return <SkillsView skills={result} />;
};

export default SkillsPage;
