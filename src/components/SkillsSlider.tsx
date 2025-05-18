"use client";

import { SkillWithTag } from "@/db/schema";
import { getTimeAgo } from "@/utils/format";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SkillsSlider(props: { skills: SkillWithTag[] }) {
  const [skills, setSkills] = useState(props.skills.slice(0, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setSkills((currentSkills) => {
        const nextSkill =
          props.skills[
            (props.skills.findIndex(
              (skill) => skill.id === currentSkills[4].id
            ) +
              1) %
              props.skills.length
          ];
        return [nextSkill, ...currentSkills.slice(0, 4)];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto md:px-8 px-4 md:py-8 ">
      <h1 className="text-4xl font-bold mb-4">Skills</h1>
      <p className="text-center mb-8">
        Specialized in full-stack development with expertise in various
        technologies and frameworks
      </p>

      <div className="relative h-[360px] w-full overflow-hidden">
        <AnimatePresence initial={false}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: -120 }}
              animate={{
                opacity: index === 1 ? 1 : 0.6,
                y: index * 120,
                scale: index === 1 ? 1 : 0.9,
                // zIndex: 5 - Math.abs(index - 2),
              }}
              exit={{ opacity: 0, y: 360 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5,
              }}
              className="absolute w-full"
            >
              <div
                className={`bg-black/30 rounded-lg shadow-sm p-6 flex items-center gap-4 transition-all duration-300 ${
                  index === 2 ? "shadow-md" : ""
                }`}
              >
                {/* <img
                  src={skill.icon}
                  alt={`${skill.name} icon`}
                  className="w-10 h-10 object-contain"
                /> */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold md:text-lg   text-sm">
                      {skill.tag}
                    </h3>
                    <span className="md:text-sm text-xs text-gray-500">
                      {getTimeAgo(skill.startedAt)}
                    </span>
                  </div>
                  <p className="md:text-sm text-xs">{skill.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
