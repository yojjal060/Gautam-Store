import React, { useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import toast from "react-hot-toast";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const { cartItems, totalPrice, totalQty, onRemove, toggleCartItemQuantity } =
    useStateContext();

  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();
      toast.loading("Preparing checkout...");

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });

      if (!response.ok) {
        toast.error("Something went wrong with checkout");
        console.error("Checkout error:", await response.text());
        return;
      }

      const data = await response.json();
      toast.loading("Redirecting to checkout...");

      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        toast.error("Stripe redirect error");
        console.error("Redirect error:", result.error);
      }
    } catch (err) {
      toast.error("Checkout error");
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <h2>Shopping Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h1>Your shopping bag is empty</h1>
              <Link href="/">
                <button className="btn continue-shopping">
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}

          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div key={item._id} className="item-card">
                <div className="item-image">
                  <img src={urlFor(item?.image[0])} alt="img" />
                </div>
                <div className="item-details">
                  <div className="name-and-remove">
                    <h3>{item.name}</h3>
                    <button
                      type="buttin"
                      onClick={() => onRemove(item)}
                      className="remove-item"
                    >
                      <HiOutlineTrash size={28} />
                    </button>
                  </div>
                  <p className="item-tag">Dress</p>
                  <p className="delivery-est">Delivery Estimation</p>
                  <p className="delivery-days">5 Working Days</p>
                  <div className="price-and-qty">
                    <span className="price">
                      Rs.{item.price * item.quantity}
                    </span>
                    <div>
                      <span
                        className="minus"
                        onClick={() => toggleCartItemQuantity(item._id, "dec")}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="num" onClick="">
                        {item.quantity}
                      </span>
                      <span
                        className="plus"
                        onClick={() => toggleCartItemQuantity(item._id, "inc")}
                      >
                        <AiOutlinePlus />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="qty">
              <p>Quantity</p>
              <span>{totalQty} Product</span>
            </div>
            <div className="subtotal">
              <p>Sub Total</p>
              <span>Rs.{totalPrice}</span>
            </div>
            {/* <div className='total'>
            <p>Total</p>
            <span>${totalPrice}</span>
          </div>  */}{" "}
            <div>
              <button className="btn" type="button" onClick={handleCheckout}>
                Process to Checkout
              </button>
              <Link href="/">
                <button className="btn continue-shopping-btn">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
