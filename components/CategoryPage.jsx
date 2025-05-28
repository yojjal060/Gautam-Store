import React, { useState, useEffect } from "react";
import { ProductFilter, AllProducts, RecentlyViewed } from ".";
import { motion } from "framer-motion";

const CategoryPage = ({ products, title }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState("name-asc");

  // Only apply sorting
  useEffect(() => {
    let result = [...products];

    // Only apply sorting
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredProducts(result);
  }, [sortBy, products]);

  // Animation variants for list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="category-page-container">
      <h1 className="category-page-title">{title}</h1>
      <div className="category-page-content">
        <ProductFilter sortBy={sortBy} onSortChange={setSortBy} />
        <motion.div
          className="Allproducts-container products-container category-products-container"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod) => (
              <motion.div key={prod._id} variants={item}>
                <AllProducts allproducts={prod} />
              </motion.div>
            ))
          ) : (
            <div className="no-products-found">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </div>
      {/* Recently Viewed Section */}
      <div className="recently-viewed-section">
        <RecentlyViewed />
      </div>
    </div>
  );
};

export default CategoryPage;
