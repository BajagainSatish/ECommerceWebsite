// cartStorage.ts

const CART_KEY = 'cartItems'; // Key to store the cart data in localStorage

// Save cart to localStorage
export const saveCartToLocalStorage = (cart: any[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Load cart from localStorage
export const loadCartFromLocalStorage = (): any[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Remove cart from localStorage
export const removeCartFromLocalStorage = () => {
  localStorage.removeItem(CART_KEY);
};
