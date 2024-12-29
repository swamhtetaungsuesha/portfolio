import { MdNavigateNext } from "react-icons/md";
const ProjectCard = ({ data, index }) => {
  return (
    <div className="border-b border-white/10 p-10 py-10 hover:bg-white/10 transition-all duration-700">
      <div className="flex flex-row items-center gap-10 justify-between">
        <h1 className="h1 mb-0 w-20">0{index}</h1>
        <h3 className="h3 w-44">{data.name}</h3>
        <div className="flex items-center gap-5">
          <span className="border border-white/10 w-10 h-10 rounded-full flex items-center justify-center ">
            {data.name.split("")[0]}
          </span>
          <p className="w-96">{data.description}</p>
        </div>
        <div className="flex gap-3 w-80 flex-wrap">
          {data.tags.map((item, i) => (
            <p
              key={i}
              className="uppercase border border-white/10  rounded-full px-2 py-1 text-xs text-nowrap"
            >
              {item}
            </p>
          ))}
        </div>
        <div className="border border-white/10 w-10 h-10 rounded-full flex items-center justify-center">
          <MdNavigateNext />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
