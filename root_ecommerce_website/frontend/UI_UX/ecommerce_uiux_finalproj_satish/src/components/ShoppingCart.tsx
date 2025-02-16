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
  product: Product;
  quantity: number;
}

interface ShoppingCartProps {
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
  onCheckout: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cart, removeFromCart, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="shopping-cart-container">
      <h1 className="text-center text-2xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.product.id} className="cart-item-card">
              <div className="cart-item-details">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.product.name}</h3>
                  <p className="cart-item-description">{item.product.details}</p>
                  <span className="cart-item-price">${item.product.price}</span>
                  <div className="cart-item-quantity">
                    Quantity: {item.quantity}
                  </div>
                </div>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => removeFromCart(item.product.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <h2>Total: ${total}</h2>
      </div>
      <div className="checkout-container">
        <button className="checkout-btn" onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;