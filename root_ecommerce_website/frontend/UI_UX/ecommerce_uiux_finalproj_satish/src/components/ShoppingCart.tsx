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

interface ShoppingCartProps {
  cart: Product[];
  removeFromCart: (productId: number, index: number) => void;
  onCheckout: () => void; // Callback for Checkout action
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cart, removeFromCart, onCheckout }) => {
  return (
    <div className="shopping-cart-container">
      <h1 className="text-center text-2xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product, index) => (
            <div key={product.id} className="cart-item-card">
              <div className="cart-item-details">
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{product.name}</h3>
                  <p className="cart-item-description">{product.details}</p>
                  <span className="cart-item-price">${product.price}</span>
                </div>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => removeFromCart(product.id, index)} // Pass both id and index
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <h2>Total: ${cart.reduce((total, product) => total + product.price, 0)}</h2>
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
