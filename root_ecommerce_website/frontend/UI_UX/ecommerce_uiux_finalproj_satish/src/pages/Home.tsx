// src/pages/Home.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdBanner from "../components/AdBanner";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import bannerImage1 from "../bannerimage1.jpg";
import bannerImage2 from "../bannerimage2.jpg";
import bannerImage3 from "../bannerimage3.jpg";
import bannerImage4 from "../bannerimage4.png";
import { productsForCategoryWatches, productsForCategoryClothing, productsForCategoryBooks } from "../components/CategoryProductData/productsData";
import { totalCategoryData } from "../components/CategoryProductData/categoryData";
import { Product } from "../components/ProductCard";
// import { saveCartToLocalStorage, loadCartFromLocalStorage, removeCartFromLocalStorage } from "../components/CartStorage";

interface HomeProps {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (index: number) => void;
    clearCart: () => void;
}

const Home: React.FC<HomeProps> = ({ cart, addToCart, removeFromCart, clearCart }) => {
    // The navigate hook remains available in case you want to add navigation in the future.
    const navigate = useNavigate();

    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>(["All"]);
    const [visibleCategories, setVisibleCategories] = useState<Record<string, boolean>>({});
    const [showAllFeatured, setShowAllFeatured] = useState<boolean>(false); // State for featured products visibility

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
        setSelectedCategories((prev) => {
            if (category === "All") {
                return isChecked ? ["All"] : [];
            } else {
                if (isChecked) {
                    return [...prev, category];
                } else {
                    return prev.filter((c) => c !== category);
                }
            }
        });
    };

    const handleBrandChange = (brand: string, isChecked: boolean) => {
        setSelectedBrands((prev) => {
            if (brand === "All") {
                return isChecked ? ["All"] : [];
            } else {
                if (isChecked) {
                    return [...prev, brand];
                } else {
                    return prev.filter((b) => b !== brand);
                }
            }
        });
    };

    const resetFilters = () => {
        setSelectedCategories(["All"]);
        setSelectedBrands(["All"]);
        const priceRangeInput = document.getElementById("priceRange") as HTMLInputElement;
        if (priceRangeInput) {
            priceRangeInput.value = "0";
        }
    };

    const toggleVisibility = (category: string) => {
        setVisibleCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const toggleFeaturedVisibility = () => {
        setShowAllFeatured((prev) => !prev); // Toggle for featured products visibility
    };

    const filteredProductLists = categoryList.map((category, index) => {
        const filteredProducts = productLists[index].filter((product) => {
            const isCategorySelected =
                selectedCategories.includes("All") || selectedCategories.includes(category.name);
            const isBrandSelected =
                selectedBrands.includes("All") || selectedBrands.includes(product.brand);
            return isCategorySelected && isBrandSelected;
        });

        return {
            category: category.name,
            products: filteredProducts,
        };
    });

    // Group products by category for ProductGrid component
    const productsByCategory = filteredProductLists.reduce((acc, { category, products }) => {
        acc[category] = products;
        return acc;
    }, {} as Record<string, Product[]>);

    return (
        <div className="w-full min-h-screen bg-slate-50">
            <AdBanner id="heading-banner" imageUrls={images} />
            <Navbar cartCount={cart.length} clearCart={clearCart} />
            <main className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    <Sidebar
                        onCategoryChange={handleCategoryChange}
                        selectedCategories={selectedCategories}
                        onBrandChange={handleBrandChange}
                        selectedBrands={selectedBrands}
                        onReset={resetFilters}
                    />
                    <div className="flex-1">
                        {featuredProducts.length > 0 && (
                            <div className="mb-8">
                                <div className="category-header">
                                    <h1 className="text-2xl font-medium text-slate-800 mb-4">Featured Products:</h1>
                                    <button className="show-all-btn" onClick={toggleFeaturedVisibility}>
                                        {showAllFeatured ? "Hide All" : "Show All"}
                                    </button>
                                </div>
                                <ProductGrid
                                    productsByCategory={{
                                        Featured: showAllFeatured ? featuredProducts : featuredProducts.slice(0, 5),
                                    }}
                                    addToCart={addToCart}
                                />
                            </div>
                        )}

                        {Object.entries(productsByCategory).map(([category, products], index) => (
                            <div key={category}>
                                <div className="mb-8">
                                    <div className="category-header">
                                        <h1 className="text-2xl font-medium text-slate-800">{category}</h1>
                                        <button className="show-all-btn" onClick={() => toggleVisibility(category)}>
                                            {visibleCategories[category] ? "Hide All" : "Show All"}
                                        </button>
                                    </div>
                                    <ProductGrid
                                        productsByCategory={{
                                            [category]: visibleCategories[category] ? products : products.slice(0, 5),
                                        }}
                                        addToCart={addToCart}
                                    />
                                </div>

                                {(index + 1) % 2 === 0 &&
                                    index + 1 !== Object.entries(productsByCategory).length && (
                                        <div className="my-8">
                                            <AdBanner id={`category-banner-${index}`} imageUrls={images} />
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
