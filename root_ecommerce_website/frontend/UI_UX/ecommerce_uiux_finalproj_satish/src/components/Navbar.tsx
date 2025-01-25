// Navbar.tsx
import "./navbar.css";
import { FiShoppingCart, FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="navbar">
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
          <FiSearch className="icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
