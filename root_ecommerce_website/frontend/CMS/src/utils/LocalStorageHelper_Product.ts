import { Product } from 'types/Product';

// utils/LocalStorageHelper_Product.ts
const PRODUCT_KEY = 'products';

export const getProductsFromLocalStorage = (): Product[] => {
  const products = localStorage.getItem(PRODUCT_KEY);
  return products ? JSON.parse(products) : [];
};

export const addProductToLocalStorage = (product: Product): void => {
  const products = getProductsFromLocalStorage();
  products.push(product);
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
};