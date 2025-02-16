// src/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Product } from "../components/ProductCard";
import "./productDetailPage.css";

interface ProductDetailPageProps {
    cart: { product: Product; quantity: number }[];
    addToCart: (product: Product) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ cart, addToCart }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:5285/api/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back to Home Button */}
            <button
                className="mb-8 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                onClick={() => navigate("/")}
            >
                &larr; Back to Home
            </button>

            {/* Product Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image w-full rounded-lg shadow-lg"
                    />
                </div>

                {/* Product Information */}
                <div>
                    <h1 className="text-3xl font-bold mb-4 text-slate-800">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.details}</p>

                    {/* Display all product information */}
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            <strong>Brand:</strong> {product.brand.name}
                        </p>
                        <p className="text-gray-700">
                            <strong>Category:</strong> {product.category.name}
                        </p>
                        <p className="text-gray-700">
                            <strong>Stock:</strong> {product.stock}
                        </p>
                        <p className="text-gray-700">
                            <strong>Price:</strong> ${product.price}
                        </p>
                        <p className="text-gray-700">
                            <strong>Sale Price:</strong> ${product.salePrice}
                        </p>
                        <p className="text-gray-700">
                            <strong>Inventory Value:</strong> ${product.inventoryValue}
                        </p>
                        <p className="text-gray-700">
                            <strong>Featured:</strong> {product.isFeatured ? "Yes" : "No"}
                        </p>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
