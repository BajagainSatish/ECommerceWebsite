import React, { useState } from "react";
import ProductCard from "./ProductCard";
import "./productGrid.css";

// Define the props type
type ProductGridProps = {
  productsByCategory: Record<string, Array<{
    id: number;
    name: string;
    image: string;
    brand: string;
    stock: number;
    category: string;
    price: number;
    details: string;
    isFeatured: boolean;
    inventoryValue: number;
    salePrice: number;
  }>>;
};

const ProductGrid: React.FC<ProductGridProps> = ({ productsByCategory }) => {
  // Track which categories are expanded
  const [expandedCategories] = useState<Record<string, boolean>>({});

  return (
    <div className="product-grid-container">
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => {
        const isExpanded = expandedCategories[category] || false;
        return (
          <div key={category} className="category-section">
            {/* Remove the category name header here */}
            {/* <h2>{category}</h2> */}
            <div className={`grid ${isExpanded ? "expanded" : "collapsed"}`}>
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* Remove the button that causes the issue */}
            {/* 
            {categoryProducts.length > 4 && (
              <button
                className="toggle-button"
                onClick={() => toggleCategory(category)}
              >
                {isExpanded ? "Hide All" : "Show All"}
              </button>
            )}
            */}
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
