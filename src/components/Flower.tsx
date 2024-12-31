import Image from "next/image";

const Flower = () => {
  return (
    <div className="w-[300px] xl:w-[400px] absolute -right-16 -bottom-2 mix-blend-color-dodge animate-pulse duration-75 z-10">
      <Image
        src={"/flower.png"}
        width={360}
        height={200}
        className="w-full h-full"
        alt=""
      />
    </div>
  );
};

export default Flower;
