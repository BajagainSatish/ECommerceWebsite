// cartStorage.ts
import { CartItem } from "../pages/Home";

const CART_KEY = 'cartItems'; // Key to store the cart data in localStorage

// Save cart to localStorage
export const saveCartToLocalStorage = (cart: any[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const loadCartFromLocalStorage = (): CartItem[] => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

// Remove cart from localStorage
export const removeCartFromLocalStorage = () => {
  localStorage.removeItem(CART_KEY);
};
