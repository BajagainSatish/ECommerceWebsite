import { useState, ChangeEvent, FormEvent } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  description: string;
}

const AddCategory = () => {
  const [category, setCategory] = useState<Omit<Category, 'id'>>({ name: '', description: '' });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const apiUrl = "http://localhost:5285/api/categories"; // Your API URL

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error message on form submit
    setSuccessMessage(null); // Reset success message

    try {
      const response = await axios.post(apiUrl, category, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        setSuccessMessage("Category added successfully!");
        setCategory({ name: '', description: '' }); // Reset form fields
      } else {
        setError("Unexpected response from server.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response);
        setError(error.response?.data?.message || "Failed to add category. Please try again.");
      } else {
        console.error("Unexpected Error:", error);
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Stack onSubmit={handleSubmit} component="form" direction="column" spacing={2}>
      <Typography variant="h4" fontWeight={600}>
        Add New Category
      </Typography>
      {successMessage && <Typography color="green">{successMessage}</Typography>}
      {error && <Typography color="red">{error}</Typography>}
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
