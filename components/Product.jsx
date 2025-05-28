import React, { useState } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { motion } from "framer-motion";
import { formatPrice } from "../lib/utils";

const Product = ({ product }) => {
  const { image, name, slug, price, _id, tags } = product;
  const { onAdd, addToWishlist, removeFromWishlist, isInWishlist } =
    useStateContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAdd(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(_id)) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <motion.div
          className="product-card allproduct-card"
          whileHover={{
            y: -5,
            transition: { duration: 0.2 },
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="product-image-container">
            <img
              src={urlFor(image && image[0])}
              className="product-image"
              alt={name}
            />
            <motion.div
              className="product-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="product-actions">
                <motion.button
                  className="action-button wishlist-button"
                  aria-label={
                    isInWishlist(_id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  onClick={handleWishlist}
                  whileTap={{ scale: 0.9 }}
                >
                  {isInWishlist(_id) ? (
                    <AiFillHeart size={26} color="#f02d34" />
                  ) : (
                    <AiOutlineHeart size={26} />
                  )}
                </motion.button>
                <motion.button
                  className="action-button cart-button"
                  aria-label="Add to cart"
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.9 }}
                >
                  <CgShoppingCart size={26} />
                </motion.button>
              </div>
            </motion.div>
          </div>
          <div className="product-info">
            <p className="product-name">{name}</p>
            {tags && <span className="product-tag">{tags}</span>}
            <p className="product-price">Rs.{formatPrice(price)}</p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default Product;
