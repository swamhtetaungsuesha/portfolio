import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const Carrers = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 p-20 bg-black/20">
        <h3 className="uppercase h3 font-bold mb-5 text-accent">Company</h3>
        <h1 className="h1">Who I've Worked At</h1>
      </div>
      <div className="flex-1 p-20 flex flex-row gap-20 items-center relative">
        <div>
          <div className="w-52 h-52 bg-accent"></div>
          <div className="flex flex-row">
            <div className="flex-1 w-20 h-20 border-b border-b-white/10 hover:border-b-accent flex justify-center items-center hover:bg-white/10 transition-all duration-100 cursor-pointer">
              <MdKeyboardArrowLeft />
            </div>
            <div className="flex-1 w-20 h-20 border-b border-b-white/10 hover:border-b-accent flex justify-center items-center hover:bg-white/10 transition-all duration-100 cursor-pointer">
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">Jdev Software Limited</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.{" "}
          </p>
          <Link
            href={"#"}
            className="flex flex-row items-center gap-2 mt-4 group hover:opacity-85"
          >
            Learn More{" "}
            <MdKeyboardArrowRight className="group-hover:translate-x-4 group-hover:text-accent transition" />
          </Link>
          <div className="px-10 flex items-center flex-1 gap-10 absolute top-20 right-20">
            <p className="text-accent">01</p>
            <p>/</p>
            <p>01</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrers;
