"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import ParticlesContainer from "../../components/ParticlesContainer";
import ProjectBtn from "../../components/ProjectsBtn";

export default function Home() {
  return (
    <div className=" h-full w-full">
      <div className="w-3/5 h-full absolute right-0 bottom-0">
        <div className="bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0 z-10"></div>
        <ParticlesContainer />
      </div>
      <div className="w-full h-full bg-gradient-to-r from-black/30 from-10% via-black via-40% to-black/50">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto xl:items-start items-center">
          <h1 className="h1">
            Transforming Ideas <br /> Into{" "}
            <span className="text-accent">Digital Reality</span>
          </h1>
          <motion.p
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl max-auto xl:max-0 mb-10 xl:mb-16"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </motion.p>
          <div className="flex justify-center xl:hidden relative">
            <ProjectBtn />
          </div>
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex"
          >
            <ProjectBtn />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
