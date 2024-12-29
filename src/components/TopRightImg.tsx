import Image from "next/image";
const TopRightImg = () => {
  return (
    <div className="absolute right-0 -top-10 mix-blend-color-dodge w-[200px] xl:w-[400px] opacity-50 animate-pulse duration-75 z-10">
      <Image src={"/top-right-img.png"} width={400} height={400} alt="" />
    </div>
  );
};

export default TopRightImg;
