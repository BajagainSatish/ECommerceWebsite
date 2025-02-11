import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoryContextProps {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => Promise<void>;
  updateCategory: (updatedCategory: Category) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return context;
};

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5285/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Function to add a new category via API
  const addCategory = async (category: Omit<Category, "id">) => {
    try {
      const response = await axios.post("http://localhost:5285/api/categories", category);
      setCategories((prevCategories) => [...prevCategories, response.data]);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  // Function to update a category via API
  const updateCategory = async (updatedCategory: Category) => {
    try {
      await axios.put(`http://localhost:5285/api/categories/${updatedCategory.id}`, updatedCategory);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      );
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  // Function to delete a category via API
  const deleteCategory = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5285/api/categories/${id}`);
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
