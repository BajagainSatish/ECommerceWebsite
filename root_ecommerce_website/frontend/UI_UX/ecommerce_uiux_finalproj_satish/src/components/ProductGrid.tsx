import React, { useState } from "react";
import ProductCard from "./ProductCard"; // Importing ProductCard
import "./productGrid.css";

import {Product} from "./ProductCard";


interface ProductGridProps {
  productsByCategory: Record<string, Product[]>; // Pass the products by category
  addToCart: (product: Product) => void; // The addToCart function as a prop
}

const ProductGrid: React.FC<ProductGridProps> = ({ productsByCategory, addToCart }) => {
  const [isExpanded] = useState(false);

  return (
    <div className="product-grid-container">

      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <div key={category} className = "category-section">
          {/* <h2>{category}</h2> */}
          <div className={`grid ${isExpanded ? "expanded" : "collapsed"}`}>
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart} // Passing the addToCart function here
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
