import React from "react";
import ProductCard from "./ProductCard";
import "./productGrid.css";

// Define the props type
type ProductGridProps = {
  products: Array<{ id: number; name: string; image: string; brand: string; stock: number; category: string; price: number; details: string; isFeatured: boolean; inventoryValue: number; salePrice: number}>;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
