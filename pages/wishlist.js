import React from "react";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import Link from "next/link";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, onAdd } = useStateContext();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-wrapper empty-wishlist">
        <AiOutlineHeart size={150} color="#f02d34" />
        <h2>Your wishlist is empty</h2>
        <p>
          Add items you like to your wishlist so you can easily find them later.
        </p>
        <Link href="/products">
          <button className="btn continue-shopping">Explore Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-wrapper">
      <h2>My Wishlist</h2>
      <div className="wishlist-container">
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div key={item._id} className="wishlist-item-card">
              <div className="wishlist-item-image">
                <img src={urlFor(item?.image[0])} alt={item.name} />
              </div>
              <div className="wishlist-item-details">
                <div className="wishlist-name-and-remove">
                  <Link href={`/product/${item.slug.current}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item._id)}
                    className="remove-wishlist-item"
                  >
                    <HiOutlineTrash size={22} />
                  </button>
                </div>
                <p className="wishlist-item-category">{item.category}</p>
                <p className="wishlist-item-price">Rs.{item.price}</p>
                <button
                  className="btn add-to-cart-from-wishlist"
                  onClick={() => {
                    onAdd(item, 1);
                  }}
                >
                  <CgShoppingCart size={20} style={{ marginRight: "8px" }} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="wishlist-actions">
          <Link href="/products">
            <button className="btn continue-shopping-btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
