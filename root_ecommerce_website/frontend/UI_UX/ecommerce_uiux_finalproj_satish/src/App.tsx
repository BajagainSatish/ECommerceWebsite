// src/App.tsx
import "./App.css"; // Include your app's CSS
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { Product } from "./components/ProductCard";
import {
  saveCartToLocalStorage,
  loadCartFromLocalStorage,
  removeCartFromLocalStorage,
} from "./components/CartStorage";
import { CartItem } from './pages/Home'; // Import CartItem

export function App() {
  const [cart, setCart] = useState<CartItem[]>(loadCartFromLocalStorage()); // Initialize with CartItem[]

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = loadCartFromLocalStorage();
    setCart(storedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      saveCartToLocalStorage(cart);
    } else {
      removeCartFromLocalStorage();
    }
  }, [cart]);

  // Add to cart: Merge quantities for existing products
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  // Remove from cart: Remove the entire product entry
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
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
        <Route
          path="/product/:id"
          element={
            <ProductDetailPage
              cart={cart}
              addToCart={addToCart}
            />
          }
        />
      </Routes>
    </Router>
  );
}