import React, { useState, useEffect } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { useStateContext } from "../../context/StateContext";
import { RecentlyViewed } from "../../components";
import { formatTags, formatPrice } from "../../lib/utils";

const ProductDetails = ({ products, product }) => {
  const { image, name, details, price, tags, care = [], _id } = product;
  const [index, setIndex] = useState(0);
  const {
    decQty,
    incQty,
    qty,
    onAdd,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToRecentlyViewed,
  } = useStateContext();

  // Add product to recently viewed list on page load
  useEffect(() => {
    addToRecentlyViewed(product);
  }, [_id]);

  const careList = [];

  {
    if (care && care.length > 0) {
      for (let i = 0; i < care.length; i++) {
        if (
          care[i].children &&
          care[i].children[0] &&
          care[i].children[0].text
        ) {
          careList.push(care[i].children[0].text);
        }
      }
    } else {
      careList.push("Hand wash with cold water");
      careList.push("Do not bleach");
      careList.push("Hang to dry in shade");
      careList.push("Iron on low heat if needed");
    }
  }

  return (
    <div className="products">
      <div className="product-detail-container">
        <div className="product-images">
          <div className="small-images-container">
            {image?.map((item, ind) => (
              <img
                key={ind}
                src={urlFor(item)}
                className="small-image"
                onMouseEnter={() => setIndex(ind)}
              />
            ))}
          </div>
          <div className="big-image-container">
            <img src={urlFor(image && image[index])} />
          </div>
        </div>
        <div className="product-details">
          <div className="name-and-category">
            <h3>{name}</h3>
            <span>{tags}</span>
          </div>
          <div className="size">
            <p>SELECT SIZE</p>
            <ul>
              <li>XS</li>
              <li>S</li>
              <li>M</li>
              <li>L</li>
              <li>XL</li>
            </ul>
          </div>
          <div className="quantity-desc">
            <h4>Quantity: </h4>
            <div>
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </div>
          </div>{" "}
          <div className="add-to-cart">
            <button
              className="btn"
              type="button"
              onClick={() => onAdd(product, qty)}
            >
              <CgShoppingCart size={20} />
              Add to Cart
            </button>
            <p className="price">Rs.{price}.00</p>
            <button
              className="wishlist-btn product-page-wishlist"
              type="button"
              onClick={() =>
                isInWishlist(_id)
                  ? removeFromWishlist(_id)
                  : addToWishlist(product)
              }
              aria-label={
                isInWishlist(_id) ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              {isInWishlist(_id) ? (
                <AiFillHeart size={24} color="#f02d34" />
              ) : (
                <AiOutlineHeart size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="product-desc-container">
        <div className="desc-title">
          <div className="desc-background">Overview</div>
          <h2>Product Information</h2>
        </div>
        <div className="desc-details">
          <h4>PRODUCT DETAILS</h4>
          <p>
            {details ||
              "This authentic Nepalese garment combines traditional craftsmanship with modern design. Made from naturally dyed cotton and locally sourced materials, it represents the rich textile heritage of Nepal."}
          </p>
        </div>
        <div className="desc-care">
          <h4>PRODUCT CARE</h4>
          <ul>
            {careList.map((list, index) => (
              <li key={index}>{list}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recently Viewed Products Section */}
      <RecentlyViewed />
    </div>
  );
};
export default ProductDetails;

export const getStaticProps = async ({ params: { slug } }) => {
  // Import from our local data instead of fetching from Sanity
  const { getProductBySlug, products } = await import("../../data/products");
  const product = getProductBySlug(slug);

  // Handle care property which might be missing in our local data
  if (!product.care) {
    product.care = [
      { children: [{ text: "Hand wash using cold water." }] },
      { children: [{ text: "Do not use bleach." }] },
      { children: [{ text: "Hang it to dry in shade." }] },
      { children: [{ text: "Iron on medium heat." }] },
    ];
  }

  return {
    props: { products, product },
  };
};

// Generates `/product/1` and `/product/2`
export const getStaticPaths = async () => {
  // Import from our local data instead of fetching from Sanity
  const { products } = await import("../../data/products");

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
