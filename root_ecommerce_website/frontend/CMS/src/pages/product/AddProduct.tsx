import { useState, ChangeEvent, FormEvent } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
}

const AddProduct = () => {
  const [product, setProduct] = useState<Product>({ name: '', description: '', price: '', category: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <Stack onSubmit={handleSubmit} component="form" direction="column" spacing={2}>
      <Typography variant="h4" fontWeight={600}>
        Add New Product
      </Typography>
      <TextField
        id="name"
        name="name"
        label="Product Name"
        variant="outlined"
        value={product.name}
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
        value={product.description}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="price"
        name="price"
        label="Price"
        variant="outlined"
        value={product.price}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="category"
        name="category"
        label="Category"
        variant="outlined"
        value={product.category}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </Stack>
  );
};

export default AddProduct;
