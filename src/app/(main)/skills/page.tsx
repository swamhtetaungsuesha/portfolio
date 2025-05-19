import SkillQueryService from "@/services/skill/QueryService";
import SkillsView from "@/views/skills/SkillsView";

const Skills = async () => {
  const res = await SkillQueryService.getList();
  if (!res.success) {
    return <div>500 Server Error</div>;
  }
  return <SkillsView skills={res.data} />;
};

export default Skills;
