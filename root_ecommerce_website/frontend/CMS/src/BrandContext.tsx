import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Brand {
  id: number;
  name: string;
  description: string;
}

interface BrandContextProps {
  brands: Brand[];
  addBrand: (brand: Omit<Brand, "id">) => Promise<void>;
  updateBrand: (updatedBrand: Brand) => Promise<void>;
  deleteBrand: (id: number) => Promise<void>;
}

const BrandContext = createContext<BrandContextProps | undefined>(undefined);

export const useBrandContext = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrandContext must be used within a BrandProvider");
  }
  return context;
};

export const BrandProvider = ({ children }: { children: ReactNode }) => {
  const [brands, setBrands] = useState<Brand[]>([]);

  // Fetch brands from API on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:5285/api/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };
    fetchBrands();
  }, []);

  // Function to add a new brand via API
  const addBrand = async (brand: Omit<Brand, "id">) => {
    try {
      const response = await axios.post("http://localhost:5285/api/brands", brand);
      setBrands((prevBrands) => [...prevBrands, response.data]);
    } catch (error) {
      console.error("Failed to add brand:", error);
    }
  };

  // Function to update a brand via API
  const updateBrand = async (updatedBrand: Brand) => {
    try {
      await axios.put(`http://localhost:5285/api/brands/${updatedBrand.id}`, updatedBrand);
      setBrands((prevBrands) =>
        prevBrands.map((brand) => (brand.id === updatedBrand.id ? updatedBrand : brand))
      );
    } catch (error) {
      console.error("Failed to update brand:", error);
    }
  };

  // Function to delete a brand via API
  const deleteBrand = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5285/api/brands/${id}`);
      setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== id));
    } catch (error) {
      console.error("Failed to delete brand:", error);
    }
  };

  return (
    <BrandContext.Provider value={{ brands, addBrand, updateBrand, deleteBrand }}>
      {children}
    </BrandContext.Provider>
  );
};
