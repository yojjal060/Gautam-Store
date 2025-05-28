import React from "react";

const ProductFilter = ({ sortBy, onSortChange }) => {
  return (
    <div className="product-filter-container">
      <div className="filter-header">
        <h2>Sort Products</h2>
      </div>
      <div className="filter-section">
        <h3>Sort By</h3>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
