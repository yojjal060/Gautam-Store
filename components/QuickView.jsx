import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { urlFor } from "../lib/client";
import { useStateContext } from "../context/StateContext";
import Link from "next/link";

const QuickView = ({ product, onClose }) => {
  const { image, name, details, price, _id, slug } = product;
  const {
    decQty,
    incQty,
    qty,
    onAdd,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useStateContext();
  const [index, setIndex] = useState(0);

  if (!product) return null;

  const handleWishlist = () => {
    if (isInWishlist(_id)) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
  };

  const handleBuyNow = () => {
    onAdd(product, qty);
    onClose();
  };

  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div
        className="quick-view-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="quick-view-close-btn" onClick={onClose}>
          <AiOutlineClose />
        </button>

        <div className="quick-view-content">
          <div className="quick-view-image-container">
            <img
              src={urlFor(image && image[index])}
              className="quick-view-product-image"
              alt={name}
            />
            <div className="quick-view-small-images-container">
              {image?.map((item, i) => (
                <img
                  key={i}
                  src={urlFor(item)}
                  className={
                    i === index
                      ? "quick-view-small-image selected-image"
                      : "quick-view-small-image"
                  }
                  onMouseEnter={() => setIndex(i)}
                  alt={`${name} - view ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="quick-view-product-details">
            <Link href={`/product/${slug.current}`}>
              <h1 className="quick-view-product-name">{name}</h1>
            </Link>
            <div className="quick-view-price">Rs.{price}</div>

            <div className="quick-view-description">
              <h4>Details: </h4>
              <p>{details?.substring(0, 150)}...</p>
              <Link href={`/product/${slug.current}`}>
                <span className="view-more">View Full Details</span>
              </Link>
            </div>

            <div className="quick-view-quantity">
              <h3>Quantity:</h3>
              <div className="quantity-selector">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </div>
            </div>

            <div className="quick-view-buttons">
              <button
                type="button"
                className="add-to-cart"
                onClick={() => onAdd(product, qty)}
              >
                Add to Cart
              </button>
              <button type="button" className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button
                type="button"
                className="wishlist-button"
                onClick={handleWishlist}
                aria-label={
                  isInWishlist(_id) ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                {isInWishlist(_id) ? (
                  <AiFillHeart size={20} color="#f02d34" />
                ) : (
                  <AiOutlineHeart size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
