import React from "react";
import ProductCard from "./ProductCard"; // Importing ProductCard
import "./productGrid.css";

import { Product } from "./ProductCard";


interface ProductGridProps {
  productsByCategory: Record<string, Product[]>; // Pass the products by category
  addToCart: (product: Product) => void; // The addToCart function as a prop
}

const ProductGrid: React.FC<ProductGridProps> = ({ productsByCategory, addToCart }) => {

  return (
    <div className="product-grid-container">

      {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category} className="category-section">
          {/* <h2 className="category-title">{category}</h2> */}
          <div className="custom-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={`${category}-${product.id}`} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
