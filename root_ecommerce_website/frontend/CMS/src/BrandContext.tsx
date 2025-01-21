import { createContext, useContext, useState, ReactNode } from 'react';

interface Brand {
  id: number;
  name: string;
  description: string;
}

interface BrandContextProps {
  brands: Brand[];
  addBrand: (brand: Omit<Brand, 'id'>) => void;
  updateBrand: (updatedBrand: Brand) => void;  // Added updateBrand method
  deleteBrand: (id: number) => void;  // Added deleteBrand method
}

const BrandContext = createContext<BrandContextProps | undefined>(undefined);

export const useBrandContext = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrandContext must be used within a BrandProvider');
  }
  return context;
};

export const BrandProvider = ({ children }: { children: ReactNode }) => {
  const [brands, setBrands] = useState<Brand[]>([]);

  const addBrand = (brand: Omit<Brand, 'id'>) => {
    const newBrand = {
      id: brands.length + 1, // Generate unique ID
      ...brand,
    };
    setBrands((prevBrands) => [...prevBrands, newBrand]);
  };

  const updateBrand = (updatedBrand: Brand) => {
    setBrands((prevBrands) =>
      prevBrands.map((brand) =>
        brand.id === updatedBrand.id ? updatedBrand : brand
      )
    );
  };

  const deleteBrand = (id: number) => {
    setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== id));
  };

  return (
    <BrandContext.Provider value={{ brands, addBrand, updateBrand, deleteBrand }}>
      {children}
    </BrandContext.Provider>
  );
};
