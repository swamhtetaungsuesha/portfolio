"use client";
import Nav from "@/components/wrappers/Nav";
import Transition from "@/components/wrappers/Transition";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

// import TopRightImg from "../components/TopRightImg";
const Template = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="h-full w-full">
        <Transition />
        <div className="page bg-site text-white bg-cover bg-no-repeat font-roboto relative w-full">
          <div className="flex flex-row items-start w-full h-full">
            <Nav />
            {children}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Template;
