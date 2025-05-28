import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import logo from "../src/assets/Logo.png";
import Link from "next/link";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const { showCart, setShowCart, totalQty, wishlistCount } = useStateContext();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPulsing, setIsPulsing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  // Add effect to handle the animation when showCart changes
  useEffect(() => {
    if (showCart) {
      setIsPulsing(true);
      setShowTooltip(true);

      const pulseTimer = setTimeout(() => {
        setIsPulsing(false);
      }, 800);

      const tooltipTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);

      return () => {
        clearTimeout(pulseTimer);
        clearTimeout(tooltipTimer);
      };
    }
  }, [showCart]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  return (
    <nav>
      <Link href="/">
        <h1>Gautam Store</h1>
      </Link>
      <ul className="nav-links">
        <Link href="/male">
          <li>Men</li>
        </Link>
        <Link href="/female">
          <li>Women</li>
        </Link>
      </ul>{" "}
      <form onSubmit={handleSearch} className="search-bar">
        <button type="submit">
          <CiSearch />
        </button>
      </form>{" "}
      <div className="nav-cart-button">
        <Link href="/wishlist">
          <button className="cart wishlist-btn">
            <AiOutlineHeart size={20} />
            {wishlistCount > 0 && (
              <span className="cart-item-qty">{wishlistCount}</span>
            )}
          </button>
        </Link>
        <Link href="/cart">
          <button className="cart">
            <CgShoppingCart size={22} />
            <span className={`cart-item-qty ${isPulsing ? "cart-pulse" : ""}`}>
              {totalQty}
            </span>
          </button>
        </Link>
        {showTooltip && <div className="tooltip">Item added to cart!</div>}
      </div>
      <div className="navbar-smallscreen">
        <RiMenu3Line
          color="black"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="navbar-smallscreen_overlay">
            <Link href="/">
              <Image
                className="logo-small"
                src={logo}
                width={140}
                height={25}
                alt="Gautam Store Logo"
              />
            </Link>{" "}
            <RiCloseLine
              color="black"
              fontSize={27}
              className="close_icon"
              onClick={() => setToggleMenu(false)}
            />{" "}
            <ul className="navbar-smallscreen_links">
              <div className="nav-cart-button mobile-cart">
                <Link href="/wishlist">
                  <button className="cart-small-screen wishlist-btn-mobile">
                    <AiOutlineHeart size={28} />
                    {wishlistCount > 0 && (
                      <span className="cart-item-qty mobile-qty">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                </Link>
                <span className="mobile-cart-text">Wishlist</span>
              </div>
              <div className="nav-cart-button mobile-cart">
                <Link href="/cart">
                  {" "}
                  <button
                    className={`cart-small-screen ${
                      isPulsing ? "cart-pulse" : ""
                    }`}
                  >
                    <CgShoppingCart size={35} />
                    <span className="cart-item-qty mobile-qty">{totalQty}</span>
                  </button>
                </Link>
                <span className="mobile-cart-text">Shopping Cart</span>
              </div>
              <Link href="/male">
                <li>Men</li>
              </Link>
              <Link href="/female">
                <li>Women</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
