import React, { useState } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./navbar.css";

interface NavbarProps {
  cartCount: number;
  clearCart: () => void; // Add clearCart as a prop
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, clearCart }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive((prev) => !prev); // Toggle the search state
  };

  return (
    <nav className="navbar sticky-navbar">
      {/* Logo Section */}
      <div className="navbar-logo">HamroEcommerce</div>

      {/* Navigation Links */}
      <div className="navbar-links spaced">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      {/* Cart and Search Section */}
      <div className="navbar-actions">
        {/* Use Link component to navigate to the shopping cart */}
        <Link to="/shopping-cart" className="cart-container" aria-label="Go to shopping cart">
          <FiShoppingCart className="icon" />
          <span className="cart-count">{cartCount}</span>
        </Link>

        <button onClick={clearCart} className="clear-cart-btn">
          Clear Cart
        </button>

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
