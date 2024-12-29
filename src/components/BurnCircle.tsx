import Image from "next/image";

const BurnCircle = () => {
  return (
    <div className="w-[200px] xl:w-[600px] absolute left-0 -bottom-60 mix-blend-color-dodge animate-pulse duration-75 z-10">
      <Image
        src={"/jjj.png"}
        width={260}
        height={200}
        className="w-full h-full"
        alt=""
      />
    </div>
  );
};

export default BurnCircle;
