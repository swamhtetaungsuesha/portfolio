"use client";
import { ProjectWithTags } from "@/db/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { addInitialZero } from "@/utils/format";
import Image from "next/image";
import { MdNavigateNext } from "react-icons/md";
const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectWithTags;
  index: number;
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="border-b border-white/10 px-10 h-full flex flex-row items-center w-full hover:bg-white/10 transition-all duration-700 group overflow-hidden xl:py-0 py-5">
      <div className="flex xl:flex-row flex-col xl:items-center items-start xl:gap-10 gap-2 xl:justify-between justify-evenly w-full h-full">
        <h1 className="h1 mb-0 xl:w-20">{addInitialZero(index)}</h1>
        <h3 className="h3 xl:w-44">{project.name}</h3>
        <div className="flex xl:flex-row flex-col xl:items-center gap-5 relative xl:h-full">
          <span className="border border-white/10 w-10 h-10 rounded-full flex items-center justify-center xl:group-hover:opacity-0">
            {project.name.split("")[0]}
          </span>
          <p className="xl:w-96 w-full xl:group-hover:opacity-0">
            {project.description}
          </p>
          {project.thumbnailImage && !isMobile && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 xl:group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent z-[1]" />
              <Image
                alt={project.name}
                width={300}
                height={200}
                src={project.thumbnailImage}
                className="group-hover:opacity-100 opacity-0 absolute group-hover:-bottom-20 -bottom-56 right-1/2 translate-x-1/2 transition-all ease-in-out duration-700"
              />
            </div>
          )}
          {/* <Image
            alt=""
            width={300}
            height={200}
            src={"/project-website.png"}
            className="group-hover:opacity-100 opacity-0 absolute group-hover:-bottom-40 -bottom-56 right-1/2 translate-x-1/2 transition-all ease-in-out duration-300"
          /> */}
        </div>
        <div className="flex gap-3 xl:w-80 flex-wrap">
          {project.tags.map((item: string, i: number) => (
            <p
              key={i}
              className="uppercase border border-white/10  rounded-full px-2 py-1 text-xs text-nowrap"
            >
              {item}
            </p>
          ))}
        </div>
        <div className="border border-white/10 group-hover:border-white/50 text-accent transition-all duration-700 w-16 h-16 rounded-full flex items-center justify-center text-xl">
          <MdNavigateNext />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
