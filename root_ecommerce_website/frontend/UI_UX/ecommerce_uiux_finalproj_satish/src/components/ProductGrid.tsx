// ProductGrid.tsx
import ProductCard from "./ProductCard";
import { products } from "./productsData"; // Import the product data
import "./productGrid.css";

const ProductGrid = () => {
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
