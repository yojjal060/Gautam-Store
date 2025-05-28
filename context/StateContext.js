import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [qty, setQty] = useState(1);
  // Load cart and wishlist from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedWishlist = localStorage.getItem("wishlistItems");
    const storedRecentlyViewed = localStorage.getItem("recentlyViewedItems");

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);

      // Calculate total price and quantity
      const totalQty = parsedCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalPrice = parsedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      setTotalQty(totalQty);
      setTotalPrice(totalPrice);
    }

    if (storedWishlist) {
      const parsedWishlist = JSON.parse(storedWishlist);
      setWishlistItems(parsedWishlist);
      setWishlistCount(parsedWishlist.length);
    }

    if (storedRecentlyViewed) {
      const parsedRecentlyViewed = JSON.parse(storedRecentlyViewed);
      setRecentlyViewedItems(parsedRecentlyViewed);
    }
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    localStorage.setItem(
      "recentlyViewedItems",
      JSON.stringify(recentlyViewedItems)
    );
  }, [cartItems, wishlistItems, recentlyViewedItems]);

  let foundProduct;
  let index;
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQty((prevTotalQty) => prevTotalQty + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    // Provide visual feedback by briefly highlighting the cart button
    setShowCart(true);
    setTimeout(() => setShowCart(false), 1000);

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQty((prevTotalQty) => prevTotalQty - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQty((prevTotalQty) => prevTotalQty + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQty((prevTotalQty) => prevTotalQty - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };
  // Wishlist functions
  const addToWishlist = (product) => {
    const isInWishlist = wishlistItems.find((item) => item._id === product._id);

    if (isInWishlist) {
      toast.error("Item already in your wishlist");
      return;
    }

    const updatedWishlist = [...wishlistItems, { ...product }];
    setWishlistItems(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
    toast.success(`${product.name} added to your wishlist!`);
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item._id !== productId
    );
    setWishlistItems(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
    toast.success("Item removed from your wishlist");
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  // Recently viewed products functionality
  const addToRecentlyViewed = (product) => {
    // Don't add if it's already the most recent
    if (
      recentlyViewedItems.length > 0 &&
      recentlyViewedItems[0]._id === product._id
    ) {
      return;
    }

    // Remove the product if it's already in the list
    const filteredItems = recentlyViewedItems.filter(
      (item) => item._id !== product._id
    );

    // Add to the beginning of the array (most recent first)
    const updatedItems = [product, ...filteredItems].slice(0, 4); // Limit to 4 items
    setRecentlyViewedItems(updatedItems);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        totalQty,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setTotalPrice,
        setTotalQty,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistItems,
        wishlistCount,
        recentlyViewedItems,
        addToRecentlyViewed,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
