import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./navbar.css";

interface NavbarProps {
  onSearch: (query: string) => void; // ✅ Prop for search
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = "satish"; // Hardcoded user ID (replace with auth logic)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // ✅ Pass search query to Home.tsx
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetch(`https://localhost:7120/api/ShoppingCart/${userId}`);

        // ✅ Handle 404 explicitly before calling `.json()`
        if (response.status === 404) {
          console.warn("Cart is empty, setting count to 0.");
          setCartCount(0);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch cart count, status: ${response.status}`);
        }

        const data = await response.json();
        setCartCount(Array.isArray(data) ? data.length : 0); // Ensure it's a number
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartCount(0); // Ensure app remains functional
      }
    };

    fetchCartCount();

    // Poll every 5 seconds to keep cart count updated
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
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
