import Image from "next/image";

const Brain = () => {
  return (
    <div className="absolute left-0 bottom-0 mix-blend-color-dodge animate-pulse duration-75 z-10 w-[400px] xl:w-[460px]">
      <Image
        src={"/brain.png"}
        width={260}
        height={200}
        className="w-full h-full"
        alt="brain"
      />
    </div>
  );
};

export default Brain;
