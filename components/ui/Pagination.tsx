"use client";
import type React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const getPagination = (totalPages: number, currentPage: number) => {
  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);

    if (currentPage > 4) pages.push("ellipsis-start");

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) pages.push(i);

    if (currentPage < totalPages - 3) pages.push("ellipsis-end");

    pages.push(totalPages);
  }
  return pages;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Prev Button */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium shadow-sm hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>

        {/* Pagination Numbers */}
        <div className="hidden md:flex gap-2">
          {getPagination(totalPages, currentPage).map((p) =>
            typeof p === "number" ? (
              <button
                type="button"
                key={`page-${p}`}
                onClick={() => onPageChange(p)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition shadow-sm
                  ${
                    currentPage === p
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {p}
              </button>
            ) : (
              <span
                key={`ellipsis-${p}`}
                className="w-10 h-10 flex items-center justify-center text-gray-500"
              >
                ...
              </span>
            ),
          )}
        </div>

        {/* Mobile view */}
        <span className="md:hidden text-sm text-gray-600 px-3">
          Page {currentPage} / {totalPages}
        </span>

        {/* Next Button */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium shadow-sm hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
