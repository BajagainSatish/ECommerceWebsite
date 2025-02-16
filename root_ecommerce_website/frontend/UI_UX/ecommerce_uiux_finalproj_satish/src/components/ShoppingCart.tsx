import { useEffect, useState } from "react";
import axios from "axios";
import "./shoppingCart.css";

interface Product {
  id: number;
  name: string;
  image: string;
  brand: string;
  category: string;
  stock: number;
  price: number;
  details: string;
  isFeatured: boolean;
  inventoryValue: number;
  salePrice: number;
}

interface CartItem {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  product: Product;
}

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = "satish"; // Hardcoded userId (Replace with dynamic user authentication)

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`https://localhost:7120/api/ShoppingCart/${userId}`);
      setCart(response.data);
    } catch (error) {
      setError("Error fetching cart items");
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (cartItem: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return removeFromCart(cartItem.id); // If quantity is 0, remove item

    try {
      await axios.put(`https://localhost:7120/api/ShoppingCart/${cartItem.id}`, {
        id: cartItem.id,
        userId: userId,
        productId: cartItem.productId,
        quantity: newQuantity,
      });

      setCart(cart.map((item) => (item.id === cartItem.id ? { ...item, quantity: newQuantity } : item)));
    } catch (error) {
      setError("Error updating cart item quantity");
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    try {
      await axios.delete(`https://localhost:7120/api/ShoppingCart/${cartItemId}`);
      setCart(cart.filter((item) => item.id !== cartItemId));
    } catch (error) {
      setError("Error removing item from cart");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`https://localhost:7120/api/ShoppingCart/clear/${userId}`); // Assuming API supports clearing all items
      setCart([]); // Clear UI cart
    } catch (error) {
      setError("Error clearing cart");
    }
  };

  const onCheckout = () => {
    alert("Proceeding to checkout...");
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="shopping-cart-container">
      <h1 className="text-center text-2xl font-bold">Shopping Cart</h1>

      {loading ? (
        <p>Loading cart items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-details">
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.product.name}</h3>
                  <p className="cart-item-description">{item.product.details}</p>
                  <span className="cart-item-price">${item.product.price}</span>
                  <div className="cart-item-quantity">
                    <button className="quantity-btn" onClick={() => updateCartItemQuantity(item, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => updateCartItemQuantity(item, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>

      <div className="checkout-container">
        <button className="checkout-btn" onClick={onCheckout}>
          Checkout
        </button>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
