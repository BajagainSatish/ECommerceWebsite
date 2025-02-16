// src/services/api.ts
import axios from "axios";

const BRAND_API_URL = "http://localhost:5285/api/brands";
const CATEGORY_API_URL = "http://localhost:5285/api/categories";
const PRODUCT_API_URL = "https://localhost:7120/api/products";

export const fetchBrands = async () => {
    const response = await axios.get(BRAND_API_URL);
    return response.data;
};

export const fetchCategories = async () => {
    const response = await axios.get(CATEGORY_API_URL);
    return response.data;
};

export const fetchProducts = async () => {
    const response = await axios.get(PRODUCT_API_URL);
    return response.data;
};
