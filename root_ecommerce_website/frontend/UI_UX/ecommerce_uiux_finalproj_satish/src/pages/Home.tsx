// src/pages/Home.tsx
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import AdBanner from "../components/AdBanner";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import bannerImage1 from "../bannerimage1.jpg";
import bannerImage2 from "../bannerimage2.jpg";
import bannerImage3 from "../bannerimage3.jpg";
import bannerImage4 from "../bannerimage4.png";
import {
    productsForCategoryWatches,
    productsForCategoryClothing,
    productsForCategoryBooks,
} from "../components/CategoryProductData/productsData";
// import { totalCategoryData } from "../components/CategoryProductData/categoryData";
import { Product } from "../components/ProductCard";

interface HomeProps {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (index: number) => void;
    clearCart: () => void;
}

const Home: React.FC<HomeProps> = ({ cart, addToCart, clearCart }) => {
    // const navigate = useNavigate();

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>(["All"]);
    // New dual price filter: starting min is 50 (changed left-hand limit) and max is 1000.
    const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(1000);

    const [visibleCategories, setVisibleCategories] = useState<Record<string, boolean>>({});
    const [showAllFeatured, setShowAllFeatured] = useState<boolean>(false);

    const images = [bannerImage1, bannerImage2, bannerImage3, bannerImage4];

    // Combine all product arrays into one array
    const productLists = [productsForCategoryWatches, productsForCategoryClothing, productsForCategoryBooks];
    const allProducts = productLists.flat();

    // Handlers for filter changes
    const handleCategoryChange = (category: string, isChecked: boolean) => {
        setSelectedCategories((prev) => {
            if (category === "All") {
                return isChecked ? ["All"] : []; // Reset to empty if "All" is unchecked
            } else {
                let newSelection = isChecked
                    ? [...prev.filter((c) => c !== "All"), category] // Add category, remove "All"
                    : prev.filter((c) => c !== category); // Remove category

                return newSelection.length > 0 ? newSelection : ["All"]; // Prevent empty selection
            }
        });
    };

    const handleBrandChange = (brand: string, isChecked: boolean) => {
        setSelectedBrands((prev) => {
            if (brand === "All") {
                return isChecked ? ["All"] : [];
            } else {
                let newSelection = isChecked
                    ? [...prev.filter((b) => b !== "All"), brand]
                    : prev.filter((b) => b !== brand);

                return newSelection.length > 0 ? newSelection : ["All"];
            }
        });
    };

    const handleMinPriceChange = (price: number) => {
        setSelectedMinPrice(price);
    };

    const handleMaxPriceChange = (price: number) => {
        setSelectedMaxPrice(price);
    };

    const resetFilters = () => {
        setSelectedCategories(["All"]);
        setSelectedBrands(["All"]);
        setSelectedMinPrice(0);
        setSelectedMaxPrice(1000);
    };

    const toggleVisibility = (category: string) => {
        setVisibleCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const toggleFeaturedVisibility = () => {
        setShowAllFeatured((prev) => !prev);
    };

    // --- Linear filtering approach ---
    // 1. Filter all products based on category, brand, and the price range.
    const filteredProducts = allProducts.filter((product) => {
        const isCategorySelected =
            selectedCategories.includes("All") ||
            selectedCategories.some(cat =>
                cat.toLowerCase() === product.category.toLowerCase()
            );

        const isBrandSelected =
            selectedBrands.includes("All") ||
            selectedBrands.includes(product.brand);

        const isPriceMatch =
            product.price >= selectedMinPrice &&
            product.price <= selectedMaxPrice;

        return isCategorySelected && isBrandSelected && isPriceMatch;
    });

    // 2. Group filtered products by category for display.
    const productsByCategory = filteredProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    // 3. Determine featured products from the filtered list.
    const featuredProducts = filteredProducts.filter((product) => product.isFeatured);

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
                        selectedMinPrice={selectedMinPrice}
                        selectedMaxPrice={selectedMaxPrice}
                        onMinPriceChange={handleMinPriceChange}
                        onMaxPriceChange={handleMaxPriceChange}
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

                        {Object.entries(productsByCategory).map(([category, products]) => (
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
