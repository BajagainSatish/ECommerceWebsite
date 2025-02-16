import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetch("https://localhost:7120/api/ShoppingCart/satish");
        if (!response.ok) {
          throw new Error("Failed to fetch cart count");
        }
        const data = await response.json();
        setCartCount(data.length); // Count total cart items
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();

    // Poll every 5 seconds to keep it updated
    const interval = setInterval(fetchCartCount, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleSearch = () => {
    setIsSearchActive((prev) => !prev);
  };

  return (
    <nav className="navbar sticky-navbar">
      <div className="navbar-logo">HamroEcommerce</div>

      <div className="navbar-links spaced">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <div className="navbar-actions">
        <Link to="/shopping-cart" className="cart-container" aria-label="Go to shopping cart">
          <FiShoppingCart className="icon" />
          <span className="cart-count">{cartCount}</span>
        </Link>

        <div className="search-container">
          <FiSearch className="icon" onClick={toggleSearch} />
          <input
            type="text"
            placeholder={isSearchActive ? "Search" : ""}
            className={`search-input ${isSearchActive ? "active" : ""}`}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
