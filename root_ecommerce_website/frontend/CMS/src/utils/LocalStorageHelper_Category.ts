// src/utils/localStorageHelper.ts

interface Category {
  id: number;
  name: string;
  description: string;
}

const CATEGORY_STORAGE_KEY = 'categories'; // Key for local storage

// Save categories to local storage
export const saveCategoriesToLocalStorage = (data: Category[]): void => {
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(data));
};

// Get categories from local storage
export const getCategoriesFromLocalStorage = (): Category[] => {
  const storedData = localStorage.getItem(CATEGORY_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

// Remove categories from local storage (if needed)
export const removeCategoriesFromLocalStorage = (): void => {
  localStorage.removeItem(CATEGORY_STORAGE_KEY);
};
