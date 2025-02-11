// src/pages/ShoppingCartPage.tsx
import { useNavigate } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart";
import { Product } from "../components/ProductCard";

interface ShoppingCartPageProps {
    cart: Product[];
    removeFromCart: (index: number) => void;
    onCheckout: () => void;
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({ cart, removeFromCart, onCheckout }) => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {/* Button to navigate back to Home */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => navigate("/")}
            >
                Back to Home
            </button>
            <ShoppingCart cart={cart} removeFromCart={removeFromCart} onCheckout={onCheckout} />
        </div>
    );
};

export default ShoppingCartPage;
