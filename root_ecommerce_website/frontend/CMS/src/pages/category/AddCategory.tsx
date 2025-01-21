// src/components/AddCategory.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { saveCategoriesToLocalStorage, getCategoriesFromLocalStorage } from '../../utils/LocalStorageHelper_Category';

interface Category {
  id: number;
  name: string;
  description: string;
}

const AddCategory = () => {
  const [category, setCategory] = useState<{ name: string; description: string }>({ name: '', description: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category.name && category.description) {
      const newCategory: Category = { ...category, id: Date.now() }; // Assign a unique ID
      const categories = getCategoriesFromLocalStorage(); // Get existing categories from localStorage
      categories.push(newCategory); // Add new category to the list
      saveCategoriesToLocalStorage(categories); // Save updated list back to localStorage
      setCategory({ name: '', description: '' }); // Reset form
    }
  };

  return (
    <Stack onSubmit={handleSubmit} component="form" direction="column" spacing={2}>
      <Typography variant="h4" fontWeight={600}>
        Add New Category
      </Typography>
      <TextField
        id="name"
        name="name"
        label="Category Name"
        variant="outlined"
        value={category.name}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="description"
        name="description"
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={category.description}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Category
      </Button>
    </Stack>
  );
};

export default AddCategory;
