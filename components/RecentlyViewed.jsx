import React from "react";
import { useStateContext } from "../context/StateContext";
import { Product } from "./";
import { MdHistory } from "react-icons/md";

const RecentlyViewed = () => {
  const { recentlyViewedItems } = useStateContext();

  if (!recentlyViewedItems || recentlyViewedItems.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed-container">
      <div className="recently-viewed-header">
        <MdHistory size={22} />
        <h2>Recently Viewed</h2>
      </div>
      <div className="recently-viewed-products">
        {recentlyViewedItems.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
