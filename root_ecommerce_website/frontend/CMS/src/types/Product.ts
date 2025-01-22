// types/Product.ts
export interface Product {
  id: number; // Optional because it's added later
  name: string;
  image: string | null; // URL or base64 string after processing
  brand: string;
  stock: number;
  category: string;
  price: number;
  details: string;
  isFeatured: boolean;
  inventoryValue: number;
  salePrice: number;
}