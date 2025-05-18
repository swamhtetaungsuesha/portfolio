import SkillsSlider from "@/components/SkillsSlider";
import TopLeftImg from "@/components/TopLeftImg";
import Flower from "@/components/Flower";
import { SkillWithTag } from "@/db/schema";

const SkillsView = (props: { skills: SkillWithTag[] }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center w-full relative">
      <TopLeftImg />
      <Flower />
      <SkillsSlider skills={props.skills} />
    </div>
  );
};

export default SkillsView;
