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
import axios from "axios";
import CheckoutPage from "./pages/CheckoutPage"; // Import CheckoutPage

export function App() {
  const [cart, setCart] = useState<CartItem[]>(loadCartFromLocalStorage()); // Initialize with CartItem[]

  useEffect(() => {
    const storedCart = loadCartFromLocalStorage();
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      saveCartToLocalStorage(cart);
    } else {
      removeCartFromLocalStorage();
    }
  }, [cart]);

  // ✅ Updated addToCart function with better error handling
  const addToCart = async (product: Product) => {
    const userId = "satish"; // Hardcoded user ID (replace with actual authentication logic)

    try {
      // Step 1: Attempt to fetch the cart
      let cartItems = [];
      try {
        const cartResponse = await axios.get(`https://localhost:7120/api/ShoppingCart/${userId}`);
        cartItems = cartResponse.data;
      } catch (error: any) {
        // ✅ If 404 is received, treat it as an empty cart
        if (error.response && error.response.status === 404) {
          console.warn("Cart is empty, initializing new cart.");
        } else {
          throw error;
        }
      }

      // Step 2: Check if the item already exists
      const existingCartItem = cartItems.find((item: any) => item.productId === product.id);

      if (existingCartItem) {
        // Step 3: If item exists, update the quantity
        const updatedCartItem = {
          id: existingCartItem.id,
          userId,
          productId: product.id,
          quantity: existingCartItem.quantity + 1, // Increment quantity
        };

        await axios.put(`https://localhost:7120/api/ShoppingCart/${existingCartItem.id}`, updatedCartItem);
        console.log("Cart item updated successfully.");
      } else {
        // Step 4: If item doesn't exist, add it to the cart
        const newCartItem = {
          userId,
          productId: product.id,
          quantity: 1, // Default quantity
        };

        await axios.post("https://localhost:7120/api/ShoppingCart", newCartItem);
        console.log("Cart item added successfully.");
      }
    } catch (error) {
      console.error("Error adding/updating cart item:", error);
    }
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
    // Navigate to checkout page
    window.location.href = "/checkout";
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage cart={cart} removeFromCart={removeFromCart} onCheckout={onCheckout} />} />
        <Route path="/product/:id" element={<ProductDetailPage cart={cart} addToCart={addToCart} />} />
        <Route path="/checkout" element={<CheckoutPage clearCart={clearCart} />} />
      </Routes>
    </Router>
  );
}
