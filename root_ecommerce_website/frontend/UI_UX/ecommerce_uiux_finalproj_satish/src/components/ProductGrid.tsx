// import React from "react";
import ProductCard from "./ProductCard";
import './productGrid.css'

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "Fjallraven Backpack",
      price: 109.95,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      description:
        "Your perfect pack for everyday use and walks in the forest.",
    },
    {
      id: 2,
      name: "Mens Casual T-Shirt",
      price: 22.3,
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket.",
    },
    {
      id: 3,
      name: "Mens Cotton Jacket",
      price: 55.99,
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      description: "Great outerwear jackets for Spring/Autumn/Winter.",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductGrid;
