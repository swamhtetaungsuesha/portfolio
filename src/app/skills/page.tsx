import SkillCard from "../../components/SkillCard";
import { BiLogoReact, BiLogoTailwindCss } from "react-icons/bi";
import { TbBrandNextjs } from "react-icons/tb";
import { SiAntdesign } from "react-icons/si";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const skills = [
  {
    id: 1,
    name: "React JS",
    icon: <BiLogoReact />,
    max: 5,
    min: 3,
  },
  {
    id: 2,
    name: "Ant Design",
    icon: <SiAntdesign />,
    max: 5,
    min: 3,
  },
  {
    id: 3,
    name: "TailwindCSS",
    icon: <BiLogoTailwindCss />,
    max: 5,
    min: 3,
  },
  {
    id: 4,
    name: "Next JS  ",
    icon: <TbBrandNextjs />,
    max: 5,
    min: 3,
  },
  {
    id: 5,
    name: "React Native",
    icon: <BiLogoReact />,
    max: 5,
    min: 3,
  },
];
const Skills = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-start  divide-x divide-white/10 w-max">
        <div className="h-full flex flex-row gap-2 items-center justify-center w-72">
          <div className="border border-white/10 w-10 h-10 rounded-full flex items-center justify-center">
            <MdNavigateBefore />
          </div>
          <div className="border border-white/10 w-10 h-10 rounded-full flex items-center justify-center">
            <MdNavigateNext />
          </div>
        </div>
        {skills.map((item, index) => (
          <SkillCard key={item.id} data={item} index={index + 1} />
        ))}
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

export default Skills;
