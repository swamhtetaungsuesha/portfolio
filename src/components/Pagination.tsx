import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="h-full px-10 flex items-center flex-1 gap-10">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="text-2xl text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <HiArrowLeft />
      </button>
      <p className="text-lg font-semibold">
        {currentPage.toString().padStart(2, "0")}
      </p>
      <p className="text-lg text-gray-500">/</p>
      <p className="text-lg font-semibold">
        {totalPages.toString().padStart(2, "0")}
      </p>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="text-2xl text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <HiArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
