import { createContext, useContext, useState, ReactNode } from 'react';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoryContextProps {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  editCategory: (category: Category) => void;
  deleteCategory: (id: number) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { id: categories.length + 1, ...category };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const editCategory = (updatedCategory: Category) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };

  const deleteCategory = (id: number) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, editCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
