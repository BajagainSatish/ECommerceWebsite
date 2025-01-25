// import React from "react";
import './navbar.css'
import { Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-indigo-600">
            React Ecommerce
          </div>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Products
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Contact
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products"
                className="pl-3 pr-10 py-2 border border-slate-200 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
            </div>
            <button className="flex items-center hover:text-indigo-600 transition-colors">
              <ShoppingCart size={20} />
              <span className="ml-2">(0)</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
