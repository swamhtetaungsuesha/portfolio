"use client";
import { CompanySelect, ExperienceWithCompany } from "@/db/schema";
import { addInitialZero, formatDateString } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const CareersView = (props: { experiences: ExperienceWithCompany[] }) => {
  const { experiences } = props;
  const [currentCompany, setCurrentCompany] = useState(0);
  const currentExperience = experiences[currentCompany];
  return (
    <div className="w-full h-full flex flex-col">
      <div className="lg:flex-1 lg:p-20 p-10 bg-black/20">
        <h3 className="uppercase lg:h3 font-bold mb-5 text-accent">Company</h3>
        <h1 className="lg:h1 h3">Who I've Worked At</h1>
      </div>
      <div className="flex-1 lg:p-20 p-5 flex lg:flex-row flex-col gap-20 lg:items-center items-start relative">
        <div>
          <div className="lg:w-52 lg:h-52 w-20 h-20 bg-accent">
            {currentExperience.company.image && (
              <Image
                width={208}
                height={208}
                alt={currentExperience.company.name}
                src={currentExperience.company.image}
              />
            )}
          </div>
          <div className="flex flex-row lg:static absolute bottom-5">
            <div className="flex-1 lg:w-full w-20 h-20 border-b border-b-white/10 hover:border-b-accent flex justify-center items-center hover:bg-white/10 transition-all duration-100 cursor-pointer">
              <MdKeyboardArrowLeft />
            </div>
            <div className="flex-1 lg:w-full w-20 h-20 border-b border-b-white/10 hover:border-b-accent flex justify-center items-center hover:bg-white/10 transition-all duration-100 cursor-pointer">
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
        <div>
          <h2 className="lg:text-3xl text-xl font-semibold mb-4">
            {currentExperience.company.name}
          </h2>
          <div>
            {currentExperience.description.map((desc, i) => (
              <p key={i} className="lg:text-base text-xs">
                {desc}
              </p>
            ))}
          </div>
          <div className="my-2">
            <p className="lg:text-base text-xs">
              {formatDateString(currentExperience.startedAt)} -{" "}
              {currentExperience.endedAt
                ? formatDateString(currentExperience.endedAt)
                : "Still"}
            </p>
          </div>
          <Link
            href={currentExperience.company.link}
            className="flex flex-row items-center gap-2 mt-4 group hover:opacity-85"
          >
            Learn More{" "}
            <MdKeyboardArrowRight className="group-hover:translate-x-4 group-hover:text-accent transition" />
          </Link>
          <div className="px-10 flex items-center flex-1 gap-10 absolute lg:top-20 lg:right-20 top-10 right-0">
            <p className="text-accent">{addInitialZero(currentCompany + 1)}</p>
            <p>/</p>
            <p>{addInitialZero(experiences.length)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersView;
