import React from "react";
import "./productCard.css";

export interface Product {
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

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void; // Function to add product to cart
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-white max-w-card">
      <div className="aspect-square relative max-h-image max-w-image">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 max-w-content">
        <h3 className="font-medium mb-2 text-slate-800 max-h-title truncate max-w-title">
          {product.name}
        </h3>
        <p className="text-sm text-slate-600 mb-2 max-h-description overflow-hidden max-w-description">
          {product.details}
        </p>
        <div className="flex justify-between items-center max-w-actions">
          <span className="font-semibold text-slate-800 max-w-price">
            ${product.price}
          </span>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors max-w-button"
            onClick={() => addToCart(product)} // Trigger the addToCart function when clicked
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
