import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './checkout.css'

const CheckoutPage: React.FC = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();  // Using useNavigate to redirect

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form data
        if (!name || !address || !phone) {
            setError("Please fill in all the fields.");
            return;
        }

        // Normally, here you'd send the data to the backend to confirm the order
        alert("Order confirmed successfully. \nShipping details: " + JSON.stringify({ name, address, phone }));
    };

    const goBackToHome = () => {
        navigate("/");  // Navigate back to Home page
    };

    return (
        <div className="checkout-container">
            <h2 className="text-center text-2xl font-bold">Enter Shipping Details</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="confirm-order-btn">
                    Confirm Order
                </button>
            </form>

            <button className="back-home-btn" onClick={goBackToHome}>
                Back to Home
            </button>
        </div>
    );
};

export default CheckoutPage;
