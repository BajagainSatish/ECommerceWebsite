import "./navbar.css";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
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
        <div className="cart-container">
          <FiShoppingCart className="icon" />
          <span className="cart-count">3</span>
        </div>
        <div className="search-container">
          <FiSearch className="icon" onClick={toggleSearch} />
          <input
            type="text"
            placeholder={isSearchActive ? "Search" : ""}
            className={`search-input ${isSearchActive ? 'active' : ''}`}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
