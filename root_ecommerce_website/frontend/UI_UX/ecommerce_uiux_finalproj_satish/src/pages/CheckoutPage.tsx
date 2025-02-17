import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './checkout.css'
import axios from "axios";
import { CartItem } from "./Home";

interface CheckoutPageProps {
    clearCart: () => void; // Add this interface
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ clearCart }) => { // Accept clearCart prop

    const [checkoutData, setCheckoutData] = useState<any>(null); // This will store the data from localStorage
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();  // Using useNavigate to redirect

    useEffect(() => {
        const data = localStorage.getItem("checkoutData");
        if (data) {
            setCheckoutData(JSON.parse(data));
        } else {
            setError("No checkout data found.");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!checkoutData) {
            setError("Missing checkout data.");
            return;
        }

        // Prepare the payload
        const orderData = {
            UserId: checkoutData.name,  // Name is being used as userId
            Address: checkoutData.address,
            TotalAmount: checkoutData.totalAmount,
            PaymentStatus: checkoutData.paymentStatus,
            CartItemsJson: JSON.stringify(checkoutData.cartItemsForOrder)
        };

        try {
            const response = await axios.post("https://localhost:7120/api/orders", orderData);

            if (response.status === 201) {
                // Clear backend cart
                const userId = "satish";
                try {
                    const cartResponse = await axios.get(`https://localhost:7120/api/ShoppingCart/${userId}`);
                    const cartItems = cartResponse.data;
                    for (const item of cartItems) {
                        await axios.delete(`https://localhost:7120/api/ShoppingCart/${item.id}`);
                    }
                } catch (error) {
                    console.error("Error clearing backend cart:", error);
                }

                // Clear frontend cart
                clearCart();

                alert("Order confirmed successfully!");
                navigate("/");
            }
        } catch (error) {
            setError("Error placing the order. Please try again.");
        }
    };


    return (
        <div className="checkout-container">
            <h2 className="text-center text-2xl font-bold">Enter Shipping Details</h2>

            {error && <p className="error">{error}</p>}

            {checkoutData && (
                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={checkoutData.name}
                            onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={checkoutData.address}
                            onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="confirm-order-btn">
                        Confirm Order
                    </button>
                </form>
            )}

            {checkoutData && checkoutData.cartItems && (
                <div className="cart-summary">
                    <h3>Your Cart:</h3>
                    <ul>
                        {checkoutData.cartItems.map((item: CartItem, index: number) => (
                            <li key={index}>
                                {item.product.name} - {item.quantity} x ${item.product.price}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${checkoutData.totalAmount}</h3>
                </div>
            )}

            <button className="back-home-btn" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};

export default CheckoutPage;
