import { useState } from 'react';
import AdBanner from "./components/AdBanner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import ProductGrid from "./components/ProductGrid";
import "./App.css";
import bannerImage1 from "./bannerimage1.jpg";
import bannerImage2 from "./bannerimage2.jpg";
import bannerImage3 from "./bannerimage3.jpg";
import bannerImage4 from "./bannerimage4.png";
import { productsForCategoryWatches, productsForCategoryClothing, productsForCategoryBooks } from './components/CategoryProductData/productsData';
import { totalCategoryData } from './components/CategoryProductData/categoryData';

interface Product {
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
}

export function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]); // default "All" selected

  const images = [bannerImage1, bannerImage2, bannerImage3, bannerImage4];

  const categoryList = totalCategoryData;
  const productLists = [productsForCategoryWatches, productsForCategoryClothing, productsForCategoryBooks];

  const featuredProducts: Product[] = [];
  productLists.forEach((productList) => {
    productList.forEach((product) => {
      if (product.isFeatured) {
        featuredProducts.push(product);
      }
    });
  });

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    setSelectedCategories(prev => {
      if (category === "All") {
        // If "All" is clicked, select it and deselect other categories
        return isChecked ? ["All"] : [];
      } else {
        // If a category is checked/unchecked
        if (isChecked) {
          return [...prev, category];
        } else {
          return prev.filter(c => c !== category);
        }
      }
    });
  };

  // Filter the products based on the selected categories
  const filteredProductLists = categoryList.filter((category) => {
    if (selectedCategories.includes("All")) {
      return true; // Show all categories if "All" is selected
    }
    return selectedCategories.includes(category.name); // Only show selected categories
  }).map((category, index) => ({
    category: category.name,
    products: productLists[index]
  }));

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <AdBanner imageUrls={images} />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Sidebar onCategoryChange={handleCategoryChange} selectedCategories={selectedCategories} />
          <div className="flex-1">
            {/* Display Featured Products */}
            {featuredProducts.length > 0 && (
              <div className="mb-8">
                <h1 className="text-2xl font-medium text-slate-800 mb-4">Featured Products:</h1>
                <ProductGrid products={featuredProducts} />
              </div>
            )}

            {/* Display Category Products */}
            {filteredProductLists.map((categoryData, index) => (
              <div key={index} className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-medium text-slate-800">{categoryData.category}</h1>
                </div>
                <ProductGrid products={categoryData.products} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
