import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './checkout.css'
import axios from "axios";

const CheckoutPage: React.FC = () => {
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
            CartItemsJson: checkoutData.cartItemsJson
        };

        try {
            // Send the data to the backend API (POST request)
            const response = await axios.post("https://localhost:7120/api/orders", orderData);

            if (response.status === 201) {
                alert("Order confirmed successfully!");
                navigate("/");  // Redirect to the home page after successful order
            }
        } catch (error) {
            setError("Error placing the order. Please try again.");
        }
    };

    const goBackToHome = () => {
        navigate("/");  // Navigate back to Home page
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

            <button className="back-home-btn" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};

export default CheckoutPage;
