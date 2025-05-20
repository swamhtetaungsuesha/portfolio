import Explosion from "@/components/elements/Explosion";
import SkillsSlider from "./SkillsSlider";
import TopLeftImg from "@/components/elements/TopLeftImg";
import { SkillWithTag } from "@/db/schema";

const SkillsView = (props: { skills: SkillWithTag[] }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center w-full relative">
      <TopLeftImg />
      <Explosion />
      <SkillsSlider skills={props.skills} />
    </div>
  );
};

export default SkillsView;
