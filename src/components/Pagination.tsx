import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const Pagination = () => {
  return (
    <div className="h-full px-10 flex items-center flex-1 gap-10">
      <p>
        <HiArrowLeft />
      </p>
      <p>01</p>
      <p>/</p>
      <p>01</p>
      <p>
        <HiArrowRight />
      </p>
    </div>
  );
};

export default Pagination;
