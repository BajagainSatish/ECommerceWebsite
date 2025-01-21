// src/components/AddBrand.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { saveBrandsToLocalStorage, getBrandsFromLocalStorage } from 'utils/LocalStorageHelper_Brand';

interface Brand {
  id: number;
  name: string;
  description: string;
}

const AddBrand = () => {
  const [brand, setBrand] = useState<{ name: string; description: string }>({ name: '', description: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (brand.name && brand.description) {
      const newBrand: Brand = { ...brand, id: Date.now() }; // Assign a unique ID
      const brands = getBrandsFromLocalStorage(); // Get existing brands from localStorage
      brands.push(newBrand); // Add new brand to the list
      saveBrandsToLocalStorage(brands); // Save updated list back to localStorage
      setBrand({ name: '', description: '' }); // Reset form
    }
  };

  return (
    <Stack onSubmit={handleSubmit} component="form" direction="column" spacing={2}>
      <Typography variant="h4" fontWeight={600}>
        Add New Brand
      </Typography>
      <TextField
        id="name"
        name="name"
        label="Brand Name"
        variant="outlined"
        value={brand.name}
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
        value={brand.description}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Brand
      </Button>
    </Stack>
  );
};

export default AddBrand;
