import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { page, pages, keyword = "", limit, categorySlug = "" } = props;

  const previousPageQuery = `&p=${page > 1 ? page - 1 : page}`;
  const nextPageQuery = `&p=${page < pages ? page + 1 : pages}`;
  const baseQuery = keyword
    ? categorySlug
      ? `/search/category/${categorySlug}?q=${keyword}`
      : `/search?q=${keyword}`
    : categorySlug
    ? `/category/${categorySlug}?`
    : `?`;
  const limitQuery = limit ? `&limit=${limit}` : "";

  return (
    pages > 1 && (
      <nav className="pagination-group">
        <div className="icon-left">
          <Link to={`${baseQuery}${limitQuery}${previousPageQuery}`}>
            <i className="fas fa-chevron-left"></i>
          </Link>
        </div>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <li className={`page-item ${x + 1 === page ? "active" : ""}`} key={x + 1}>
              <Link className="page-link" to={`${baseQuery}${limitQuery}&p=${x + 1}`}>
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
        <div className="icon-right">
          <Link to={`${baseQuery}${limitQuery}${nextPageQuery}`}>
            <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
      </nav>
    )
  );
};

export default Pagination;
