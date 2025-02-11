// src/App.tsx
import "./App.css"; // Include your app's CSS
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { Product } from "./components/ProductCard";
import {
  saveCartToLocalStorage,
  loadCartFromLocalStorage,
  removeCartFromLocalStorage,
} from "./components/CartStorage";

export function App() {
  const [cart, setCart] = useState<Product[]>([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = loadCartFromLocalStorage();
    setCart(storedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      saveCartToLocalStorage(cart);
    }
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Function to remove a product from the cart
  const removeFromCart = (index: number) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  // Function to clear the cart and localStorage
  const clearCart = () => {
    setCart([]);
    removeCartFromLocalStorage();
  };

  const onCheckout = () => {
    alert("Proceeding to checkout!");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/shopping-cart"
          element={
            <ShoppingCartPage
              cart={cart}
              removeFromCart={removeFromCart}
              onCheckout={onCheckout}
            />
          }
        />
      </Routes>
    </Router>
  );
}
