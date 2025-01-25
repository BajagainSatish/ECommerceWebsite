// ShoppingCart.tsx
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
  removeFromCart: (productId: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cart, removeFromCart }) => {
  return (
    <div className="shopping-cart-container">
      <h1 className="text-center text-2xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
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
                onClick={() => removeFromCart(product.id)} // Pass remove function
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
    </div>
  );
};

export default ShoppingCart;
