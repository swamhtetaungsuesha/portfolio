"use client";
import { fadeIn } from "@/utils/variants";
import { motion } from "framer-motion";
const TransitionContent = ({
  element = "p",
  delay,
  classname,
  children,
}: {
  element?: "p" | "div" | "h1";
  delay: number;
  classname: string;
  children: React.ReactNode;
}) => {
  const MotionElement =
    element === "p"
      ? motion.p
      : element === "div"
      ? motion.div
      : element === "h1"
      ? motion.h1
      : motion.p;
  return (
    <MotionElement
      variants={fadeIn("down", delay)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={classname}
    >
      {children}
    </MotionElement>
  );
};

export default TransitionContent;
