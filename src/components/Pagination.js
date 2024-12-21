import  { useState } from "react";
const Pagination = ({ totalScreens = 8 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <nav aria-label="Page navigation" className="my-3">
      <ul className="pagination pagination-sm justify-content-center">
        {[...Array(totalScreens).keys()].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li
              key={pageNumber}
              className={`page-item ${
                pageNumber === currentPage ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
