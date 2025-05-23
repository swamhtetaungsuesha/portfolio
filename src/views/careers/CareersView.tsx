"use client";
import { ExperienceWithCompany } from "@/db/schema";
import { addInitialZero, formatDateString } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
const CareersView = (props: { experiences: ExperienceWithCompany[] }) => {
  const { experiences } = props;
  const [currentCompany, setCurrentCompany] = useState(0);
  const currentExperience = experiences[currentCompany];
  const handlePrevious = () => {
    if (currentCompany > 0) {
      setCurrentCompany(currentCompany - 1);
    }
  };

  const handleNext = () => {
    if (currentCompany < experiences.length - 1) {
      setCurrentCompany(currentCompany + 1);
    }
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className=" lg:p-20 p-10 bg-black/20">
        <h3 className="uppercase lg:h3 font-bold mb-5 text-accent">Company</h3>
        <h1 className="lg:h1 h3">Who I&apos;ve Worked At</h1>
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
          {/* <div className="flex flex-row lg:static absolute left-0 bottom-5 w-full justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentCompany === 0}
              className="flex-1 lg:w-full w-20 h-20 border-b border-b-white/10 hover:border-b-accent flex justify-center items-center hover:bg-white/10 transition-all duration-100 cursor-pointer"
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={currentCompany === experiences.length - 1}
              className="flex-1 lg:w-full w-20 h-20 border-b border-b-white/10 hover:border-b-accent flex justify-center items-center hover:bg-white/10 transition-all duration-100 cursor-pointer"
            >
              <MdKeyboardArrowRight />
            </button>
          </div> */}
        </div>
        <div>
          <h2 className="lg:text-3xl text-xl font-semibold mb-4">
            {currentExperience.company.name}
          </h2>
          <div>
            {currentExperience.description.map((desc, i) => (
              <p key={i} className="lg:text-base text-sm">
                {desc}
              </p>
            ))}
          </div>
          <div className="my-2">
            <p className="lg:text-base text-sm">
              {formatDateString(currentExperience.startedAt)} -{" "}
              {currentExperience.endedAt
                ? formatDateString(currentExperience.endedAt)
                : "Present"}
            </p>
          </div>
          <Link
            href={currentExperience.company.link}
            target="_blank"
            className="flex flex-row items-center gap-2 mt-10 group hover:opacity-85"
          >
            Explore More
            <HiArrowRight className="group-hover:translate-x-4 group-hover:text-accent transition" />
          </Link>
          <div className="md:px-10 flex items-center flex-1 md:gap-10 gap-5 xl:absolute xl:top-10 lg:right-20 top-10 right-0 xl:w-auto w-full justify-center mt-10">
            <button
              onClick={handlePrevious}
              disabled={currentCompany <= 0}
              className="text-xl text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <HiArrowLeft />
            </button>
            <p className="text-accent">{addInitialZero(currentCompany + 1)}</p>
            <p>/</p>
            <p>{addInitialZero(experiences.length)}</p>
            <button
              onClick={handleNext}
              disabled={currentCompany + 1 >= experiences.length}
              className="text-xl text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <HiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersView;
