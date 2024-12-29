"use client";
// icons
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
} from "react-icons/si";
import ProjectsBtn from "../../components/ProjectsBtn";
import { fadeIn } from "@/utils/variants";
import Circles from "../../components/Circles";
import BurnCircle from "../../components/BurnCircle";
import Bulb from "../../components/Bulb";
import TopRightImg from "../../components/TopRightImg";

//  data
const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Web Development",
        icons: [
          <FaHtml5 />,
          <FaCss3 />,
          <FaJs />,
          <FaReact />,
          <SiNextdotjs />,
          <SiFramer />,
          <FaWordpress />,
        ],
      },
      {
        title: "UI/UX Design",
        icons: [<FaFigma />, <SiAdobexd />, <SiAdobephotoshop />],
      },
    ],
  },
  {
    title: "awards",
    info: [
      {
        title: "Webby Awards - Honoree",
        stage: "2011 - 2012",
      },
      {
        title: "Adobe Design Achievement Awards - Finalist",
        stage: "2009 - 2010",
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "UX/UI Designer - XYZ Company",
        stage: "2012 - 2023",
      },
      {
        title: "Web Developer - ABC Agency",
        stage: "2010 - 2012",
      },
      {
        title: "Intern - DEF Corporation",
        stage: "2008 - 2010",
      },
    ],
  },
  {
    title: "credentials",
    info: [
      {
        title: "Web Development - ABC University, LA, CA",
        stage: "2011",
      },
      {
        title: "Computer Science Diploma - AV Technical Institute",
        stage: "2009",
      },
      {
        title: "Certified Graphic Designer - ABC Institute, Los Angeles, CA",
        stage: "2006",
      },
    ],
  },
];

const Page = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* <div className="flex border-white/10 border pr-10 py-4 bg-black/10 w-[800px] items-center">
        <div className="flex-1 -translate-x-10">
          <Image
            src={"/bg-explosion-4.png"}
            height={600}
            width={500}
            className="border-primary/80 border-8 mix-blend-color-dodge h-[500px] bg-contain bg-origin-content"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-5xl font-semibold mb-6 text-white/10">
            About <span className="">Me</span>
          </h1>
          <p className="text-xs text-justify">
            I'm Ryam, a full-stack web and mobile app developer with a passion
            for building scalable, high-performance applications. I specialize
            in React, React Native, and TypeScript on the frontend, delivering
            responsive, user-friendly interfaces. On the backend, I leverage
            NestJS, MongoDB, and event-driven architectures to create systems
            optimized for real-time communication and high efficiency. My
            experience extends to integrating Socket.io for real-time
            interactions and managing complex queues using BullMQ and Kafka to
            handle demanding workflows.
            <br className="my-2" />
            In addition to my technical expertise, I focus on creating seamless
            user experiences while ensuring scalability and reliability in
            large-scale systems. I'm adept at optimizing application performance
            and handling data-intensive processes, making sure the systems I
            build are robust and future-proof. Whether it's mobile or web,
            frontend or backend, I'm always eager to push the boundaries of
            technology and create solutions that truly make an impact.
          </p>
        </div>
      </div> */}
      <div className="w-1/2">
        <h1 className="h1 mb-20 text-white">
          About <span className="text-accent">Me</span>
        </h1>
        <div className="flex flex-col gap-10">
          <motion.p
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            // className="max-w-sm xl:max-w-xl max-auto xl:max-0 mb-10 xl:mb-16"
          >
            Glad to see you! I'm Anulika Nwankwo. I'm a Product Designer and an
            experienced IT product manager. I have to admit that becoming this
            passionate "IT product" person was one of the best decisions I made
            and now I can't seem to get enough of educating myself on innovative
            ways of bringing products to market from the user research part to
            the development.
          </motion.p>
          <motion.p
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            I'm deeply fascinated with all aspects of user experience design,
            user research, user journey mapping and visual design. I advocate
            for the user, helping to ensure that the product meets their needs
            and is easy to use. I carry out usability testing, and other
            activities to gather insights that can inform design decisions and I
            play a critical leadership role in the development of new products,
            helping to ensure that the product is user-centric, functional, and
            aesthetically pleasing.
          </motion.p>
          <div className="absolute right-20 top-20">
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

export default Page;
