import { Love_Light } from "next/font/google";
import { fadeIn } from "@/utils/variants";
import { motion } from "framer-motion";
import Circles from "../../components/Circles";
import TopLeftImg from "../../components/TopLeftImg";
import Bulb from "../../components/Bulb";
const love_light = Love_Light({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const Contact = () => {
  return (
    <div className="flex flex-col p-10 w-full h-full items-center relative">
      <TopLeftImg />
      <Circles />
      <Bulb />
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* <motion.h1
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="text-9xl text-white font-semibold italic"
        >
          Let’s Talk
        </motion.h1>
        <motion.h1
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className={`text-9xl text-accent font-semibold italic tracking-widest uppercase`}
        >
          Ideas
        </motion.h1> */}
        <h1 className="text-9xl text-white font-semibold italic">Let’s Talk</h1>
        <h1
          className={`text-9xl text-accent font-semibold italic tracking-widest uppercase`}
        >
          Ideas
        </h1>
      </div>
      <div className="text-left text-sm md:text-base flex flex-col md:flex-row  w-full md:w-[75vw] lg:w-[50vw] justify-between items-start flex-none px-12 py-12 gap-6 md:gap-12">
        <div className="">
          <p className="font-semibold text-white">CONTACT</p>
          <div className="md:mt-4 flex flex-col">
            <p>
              <a href="tel:+84948866263">+84 94 88 66 263</a>
            </p>
            <p>
              <a href="mailto:baronn.ha@gmail.com">baronn.ha@gmail.com</a>
            </p>
          </div>
        </div>
        <div className="">
          <p className="font-semibold text-white">MY SPACE</p>
          <div className="md:mt-4 flex flex-col">
            <p>
              <a href="https://github.com/baronha" target="_blank">
                Github
              </a>
            </p>
            <p>
              <a href="https://www.linkedin.com/in/baronha/" target="_blank">
                LinkedIn
              </a>
            </p>
            <p>
              <a href="https://dribbble.com/baronha" target="_blank">
                Dribbble
              </a>
            </p>
            <p>
              <a href="https://behance.net/baronha" target="_blank">
                Behance
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
