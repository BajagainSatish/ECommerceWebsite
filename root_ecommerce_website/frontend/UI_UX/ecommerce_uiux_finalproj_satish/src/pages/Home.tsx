// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
// import axios from "axios";
import AdBanner from "../components/AdBanner";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import bannerImage1 from "../bannerimage1.jpg";
import bannerImage2 from "../bannerimage2.jpg";
import bannerImage3 from "../bannerimage3.jpg";
import bannerImage4 from "../bannerimage4.png";
import { fetchBrands, fetchCategories, fetchProducts } from "../services/api";
import { Product } from "../components/ProductCard";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface HomeProps {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

const Home: React.FC<HomeProps> = ({ cart, addToCart, clearCart }) => {
    // States for API data
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<any[]>([]); // Adjust types as needed
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>(["All"]);
    const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(1000);
    const [visibleCategories, setVisibleCategories] = useState<Record<string, boolean>>({});
    const [showAllFeatured, setShowAllFeatured] = useState<boolean>(false);

    const bannerImages = [bannerImage1, bannerImage2, bannerImage3, bannerImage4];

    // Fetch data from APIs on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, brandsData, categoriesData] = await Promise.all([
                    fetchProducts(),
                    fetchBrands(),
                    fetchCategories(),
                ]);
                setAllProducts(productsData);
                setBrands(brandsData);
                setCategories(categoriesData);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Filtering logic using the fetched allProducts
    const filteredProducts = allProducts.filter((product) => {
        const categoryName = product.category?.name ?? "";
        const brandName = product.brand?.name ?? "";

        const isCategorySelected =
            selectedCategories.includes("All") ||
            selectedCategories.some((cat) => cat.toLowerCase() === categoryName.toLowerCase());

        const isBrandSelected =
            selectedBrands.includes("All") ||
            selectedBrands.some((b) => b.toLowerCase() === brandName.toLowerCase());

        const isPriceMatch = product.price >= selectedMinPrice && product.price <= selectedMaxPrice;

        return isCategorySelected && isBrandSelected && isPriceMatch;
    });


    // Group filtered products by category for display
    const productsByCategory = filteredProducts.reduce((acc, product) => {
        const categoryName = product.category?.name ?? "Uncategorized";

        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }

        acc[categoryName].push(product);
        return acc;
    }, {} as Record<string, Product[]>);


    // Determine featured products from the filtered list.
    const featuredProducts = allProducts.filter((product) => product.isFeatured);

    // Handler functions remain largely the same...
    const handleCategoryChange = (category: string, isChecked: boolean) => {
        setSelectedCategories((prev) => {
            if (category === "All") {
                return isChecked ? ["All"] : [];
            } else {
                let newSelection = isChecked
                    ? [...prev.filter((c) => c !== "All"), category]
                    : prev.filter((c) => c !== category);
                return newSelection.length > 0 ? newSelection : ["All"];
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

    return (
        <div className="w-full min-h-screen bg-slate-50">
            <AdBanner id="heading-banner" imageUrls={bannerImages} />
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* 
            Optionally, pass the fetched categories and brands to the Sidebar.
            You may need to update the Sidebar component to display these dynamically.
          */}
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
                                    <h1 className="text-2xl font-medium text-slate-800 mb-4">
                                        Featured Products:
                                    </h1>
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

                        {Object.entries(productsByCategory).map(([categoryName, products], index) => (
                            <div key={categoryName}>
                                <div className="mb-8">
                                    <div className="category-header">
                                        <h1 className="text-2xl font-medium text-slate-800">{categoryName}</h1>
                                        <button className="show-all-btn" onClick={() => toggleVisibility(categoryName)}>
                                            {visibleCategories[categoryName] ? "Hide All" : "Show All"}
                                        </button>
                                    </div>
                                    <ProductGrid
                                        productsByCategory={{
                                            [categoryName]: visibleCategories[categoryName] ? products : products.slice(0, 5),
                                        }}
                                        addToCart={addToCart}
                                    />
                                </div>
                                {index % 2 === 1 && <AdBanner id={`ad-banner-${index}`} imageUrls={bannerImages} />}
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
