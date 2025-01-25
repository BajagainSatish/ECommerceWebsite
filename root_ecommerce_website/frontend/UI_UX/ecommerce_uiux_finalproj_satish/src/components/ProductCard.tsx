import React from "react";
import "./productCard.css";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
          {product.description}
        </p>
        <div className="flex justify-between items-center max-w-actions">
          <span className="font-semibold text-slate-800 max-w-price">
            ${product.price}
          </span>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors max-w-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
