import Image from "next/image";

const Flower = () => {
  return (
    <div className="w-[800px] xl:w-full absolute -right-16 -bottom-2 mix-blend-color-dodge z-10 opacity-10">
      <Image
        src={"/bg-explosion.png"}
        width={860}
        height={200}
        className="w-full h-full"
        alt=""
      />
    </div>
  );
};

export default Flower;
