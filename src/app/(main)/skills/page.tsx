import SkillService from "@/services/skill/SkillService";
import SkillsView from "@/views/skills/SkillsView";

const Skills = async () => {
  const res = await SkillService.getList();
  if (!res.success) {
    return <div>500 Server Error</div>;
  }
  return <SkillsView skills={res.data} />;
};

export default Skills;
