import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

const ResumeBtn = (props: { link: string }) => {
  return (
    <div>
      <Link
        href={props.link}
        target="_blank"
        className="relative w-[185px] h-[185px] flex justify-center items-center bg-circleStar bg-cover bg-center bg-no-repeat group"
      >
        <Image
          src={"/rounded-text-resume.png"}
          width={160}
          height={160}
          alt=""
          className="animate-spin-slow h-full max-w-[160px] max-h-[160px]"
        />
        <HiArrowRight className="absolute text-4xl group-hover:translate-x-2 transition-all duration-300" />
      </Link>
    </div>
  );
};

export default ResumeBtn;
