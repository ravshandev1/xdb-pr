import React from "react";
import styles from "./pagination.module.css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNeighbours = 2;

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const generatePageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = [];

      if (startPage > 2) {
        pages.push(1);
        pages.push("...");
      } else {
        pages.push(...Array.from({ length: startPage - 1 }, (_, i) => i + 1));
      }

      pages = pages.concat(
        Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
      );

      if (endPage < totalPages - 1) {
        pages.push("...");
        pages.push(totalPages);
      } else {
        pages.push(totalPages);
      }

      return pages;
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pages = generatePageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft />
      </button>
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            {page}
          </span>
        )
      )}
      <button
        className={styles.pageButton}
        onClick={handleNextClick}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
