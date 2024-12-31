"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  id: number;
  icon: string;
  name: string;
  timeAgo: string;
  category: string;
}

const initialSkills: Skill[] = [
  {
    id: 1,
    icon: "/logo.svg?height=40&width=40",
    name: "AWS",
    timeAgo: "12 months ago",
    category: "Cloud",
  },
  {
    id: 2,
    icon: "/logo.svg?height=40&width=40",
    name: "Angular",
    timeAgo: "about 7 years ago",
    category: "Frontend",
  },
  {
    id: 3,
    icon: "/logo.svg?height=40&width=40",
    name: "Tailwind CSS",
    timeAgo: "about 2 years ago",
    category: "Frontend",
  },
  {
    id: 4,
    icon: "/logo.svg?height=40&width=40",
    name: "MongoDB",
    timeAgo: "about 1 year ago",
    category: "Database",
  },
  {
    id: 5,
    icon: "/logo.svg?height=40&width=40",
    name: "React",
    timeAgo: "about 5 years ago",
    category: "Frontend",
  },
  {
    id: 6,
    icon: "/logo.svg?height=40&width=40",
    name: "Node.js",
    timeAgo: "about 6 years ago",
    category: "Backend",
  },
];

export default function SkillsSlider() {
  const [skills, setSkills] = useState(initialSkills.slice(0, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setSkills((currentSkills) => {
        const nextSkill =
          initialSkills[
            (initialSkills.findIndex(
              (skill) => skill.id === currentSkills[4].id
            ) +
              1) %
              initialSkills.length
          ];
        return [nextSkill, ...currentSkills.slice(0, 4)];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Skills</h1>
      <p className="text-gray-600 text-center mb-8">
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
                opacity: index === 2 ? 1 : 0.6,
                y: (index - 2) * 120,
                scale: index === 2 ? 1 : 0.9,
                zIndex: 5 - Math.abs(index - 2),
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
                className={`bg-black/20 rounded-lg shadow-sm p-6 flex items-center gap-4 transition-all duration-300 ${
                  index === 2 ? "shadow-md" : ""
                }`}
              >
                <img
                  src={skill.icon}
                  alt={`${skill.name} icon`}
                  className="w-10 h-10 object-contain"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <span className="text-sm text-gray-500">
                      {skill.timeAgo}
                    </span>
                  </div>
                  <p>{skill.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
