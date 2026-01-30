import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 4;

const PaginationData: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const start =
    totalPages <= MAX_VISIBLE_PAGES
      ? 1
      : Math.max(1, Math.min(currentPage - 2, totalPages - MAX_VISIBLE_PAGES + 1));
  const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);
  const pagesToShow = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="bd-pagination pt-20 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".3s"
        >
          <ul className="justify-content-center">
            {currentPage !== 1 && (
              <li className={`page-item`}>
                <button
                  type="button"
                  className={`page-numbers ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  <i className="fa-sharp fa-solid fa-angle-left"></i>
                </button>
              </li>
            )}
            {pagesToShow.map((page) => (
              <li key={page} className="page-item">
                <button
                  type="button"
                  className={`page-numbers ${currentPage === page ? "current" : ""}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            {totalPages > MAX_VISIBLE_PAGES && currentPage !== totalPages && (
              <li className={`page-item`}>
                <button
                  type="button"
                  className={`page-numbers ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  <i className="fa-sharp fa-solid fa-angle-right"></i>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaginationData;
