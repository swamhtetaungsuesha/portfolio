"use client";
// icons
import Circles from "@/components/Circles";
import ProjectsBtn from "@/components/ProjectsBtn";
import { fadeIn } from "@/utils/variants";
import { motion } from "framer-motion";
// import BurnCircle from "../../components/";
import Bulb from "@/components/Bulb";
import { UserSelect } from "@/db/schema";

const AboutView = (props: { user: UserSelect }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="lg:w-1/2 w-3/4">
        <h1 className="h1 lg:mb-20 mb-10 text-white">
          About <span className="text-accent">Me</span>
        </h1>
        <div className="flex flex-col gap-10">
          <motion.p
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="lg:text-base text-xs"
          >
            {props.user.aboutMeContent[0]}
          </motion.p>
          <motion.p
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="lg:text-base text-xs"
          >
            {props.user.aboutMeContent[1]}
          </motion.p>
          <div className="absolute lg:right-20 right-5 lg:top-20 top-5">
            <ProjectsBtn />
          </div>
        </div>
      </div>
      {/* <TopRightImg /> */}
      <Bulb />
      <Circles />
    </div>
  );
};

export default AboutView;
