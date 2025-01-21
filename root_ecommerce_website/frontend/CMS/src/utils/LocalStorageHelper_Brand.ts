// src/utils/localStorageHelper.ts

interface Brand {
  id: number;
  name: string;
  description: string;
}

const BRAND_STORAGE_KEY = 'brands'; // Key for local storage

// Save brands to local storage
export const saveBrandsToLocalStorage = (data: Brand[]): void => {
  localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(data));
};

// Get brands from local storage
export const getBrandsFromLocalStorage = (): Brand[] => {
  const storedData = localStorage.getItem(BRAND_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

// Remove brands from local storage (if needed)
export const removeBrandsFromLocalStorage = (): void => {
  localStorage.removeItem(BRAND_STORAGE_KEY);
};
