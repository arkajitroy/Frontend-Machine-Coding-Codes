import React, { useCallback, useEffect, useState } from "react";

import "./pagination.css";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    const endPoint = "https://dummyjson.com/products";
    const response = await fetch(endPoint);
    const data = await response.json().then((_data) => _data.products);

    if (response && data) setProducts(data);
  }, []);

  const handleSelectPageClick = (pageNumber) => setPages(pageNumber);

  const selectPageSwitcher = useCallback((direction) => {
    direction === "next"
      ? setPages((prevValue) => prevValue + 1)
      : direction === "back"
      ? setPages((prevValue) => prevValue - 1)
      : null;
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h3>Client Side Pagination</h3>
      <div className="products-container-main">
        {products ? (
          products.slice(pages * 5 - 5, pages * 5).map((product, index) => {
            console.log("data", product);
            const { id, title, price, rating, thumbnail } = product;
            return (
              <div className="product-container" key={id}>
                <img src={thumbnail} alt="" />
                <span className="title">{title}</span>
                <span className="price">$ {price}</span>
              </div>
            );
          })
        ) : (
          <span>No products to show!</span>
        )}
      </div>
      {products.length > 0 && (
        <div className="pagination-container">
          <button
            disabled={pages < 2 ? true : false}
            onClick={() => selectPageSwitcher("back")}
          >
            Back
          </button>
          <span>
            {[...Array(products.length / 5)].map((data, index) => {
              return (
                <span
                  key={index}
                  onClick={() => handleSelectPageClick(index + 1)}
                  className={
                    pages === index + 1
                      ? "selected-pagination-component"
                      : "pagination-component"
                  }
                >
                  {index + 1}
                </span>
              );
            })}
          </span>
          <button
            disabled={pages === products.length / 5 ? true : false}
            onClick={() => selectPageSwitcher("next")}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
