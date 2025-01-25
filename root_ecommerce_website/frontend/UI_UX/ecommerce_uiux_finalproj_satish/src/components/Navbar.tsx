import React, { useState } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./navbar.css";

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate(); // Create a navigate function
  const goToCart = () => {
    navigate("/shopping-cart");
  };

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
        <button className="cart-container" onClick={goToCart} aria-label="Go to shopping cart">
          <FiShoppingCart className="icon" />
          <span className="cart-count">{cartCount}</span>
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
