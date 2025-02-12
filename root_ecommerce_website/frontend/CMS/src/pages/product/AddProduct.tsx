import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Product } from 'types/Product';

// Define interfaces for Brand and Category (if not already defined)
interface Brand {
  id: number;
  name: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

const AddProduct = () => {
  // The product state still uses strings for brand and category selections.
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    image: '',
    brand: '', // this will be the brand name
    stock: 0,
    category: '', // this will be the category name
    price: 0,
    details: '',
    isFeatured: false,
    inventoryValue: 0,
    salePrice: 0,
  });

  // Instead of string arrays, store full objects so we can extract IDs later.
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch brands from API
  useEffect(() => {
    axios
      .get('https://localhost:7120/api/brands')
      .then((response) => setBrands(response.data))
      .catch(() => setError('Failed to fetch brands'));
  }, []);

  // Fetch categories from API
  useEffect(() => {
    axios
      .get('https://localhost:7120/api/categories')
      .then((response) => setCategories(response.data))
      .catch(() => setError('Failed to fetch categories'));
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setProduct({ ...product, image: reader.result as string }); // Save base64 string
          }
        };
        reader.readAsDataURL(file);
      } else {
        setProduct({ ...product, image: '' });
      }
    } else if (name === 'stock' || name === 'price' || name === 'inventoryValue' || name === 'salePrice') {
      setProduct({ ...product, [name]: parseFloat(value) || 0 });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, isFeatured: e.target.checked });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!product.image) {
      alert('Please upload an image.');
      return;
    }

    // Look up the full brand and category objects using the selected name.
    const brandObj = brands.find((b) => b.name === product.brand);
    const categoryObj = categories.find((c) => c.name === product.category);

    if (!brandObj || !categoryObj) {
      setError('Selected brand or category is invalid.');
      return;
    }

    // Prepare the new product object with the IDs expected by the API.
    const newProduct = {
      name: product.name,
      image: product.image,
      brandId: brandObj.id, // Using the brand object's id
      stock: product.stock,
      categoryId: categoryObj.id, // Using the category object's id
      price: product.price,
      details: product.details,
      isFeatured: product.isFeatured,
      inventoryValue: product.inventoryValue,
      salePrice: product.salePrice,
    };

    try {
      const response = await axios.post('https://localhost:7120/api/products', newProduct, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setSuccessMessage('Product added successfully!');
        setProduct({
          name: '',
          image: '',
          brand: '',
          stock: 0,
          category: '',
          price: 0,
          details: '',
          isFeatured: false,
          inventoryValue: 0,
          salePrice: 0,
        });
      } else {
        setError('Unexpected response from server.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data?.errors);
        setError(error.response?.data?.title || 'Failed to add product. Please check your inputs.');
      } else {
        console.error('Unexpected Error:', error);
        setError('An unexpected error occurred.');
      }
    }
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
        id="image"
        name="image"
        type="file"
        variant="outlined"
        inputProps={{ accept: 'image/*' }}
        onChange={handleInputChange}
        required
      />

      <TextField
        id="brand"
        name="brand"
        label="Brand"
        variant="outlined"
        select
        value={product.brand}
        onChange={handleInputChange}
        required
      >
        {brands.length > 0 ? (
          brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.name}>
              {brand.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Brands Available</MenuItem>
        )}
      </TextField>

      <TextField
        id="stock"
        name="stock"
        label="Stock"
        type="number"
        variant="outlined"
        value={product.stock}
        onChange={handleInputChange}
        required
      />

      <TextField
        id="category"
        name="category"
        label="Category"
        variant="outlined"
        select
        value={product.category}
        onChange={handleInputChange}
        required
      >
        {categories.length > 0 ? (
          categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Categories Available</MenuItem>
        )}
      </TextField>

      <TextField
        id="price"
        name="price"
        label="Price"
        type="number"
        variant="outlined"
        value={product.price}
        onChange={handleInputChange}
        required
      />

      <TextField
        id="details"
        name="details"
        label="Product Details"
        variant="outlined"
        multiline
        rows={4}
        value={product.details}
        onChange={handleInputChange}
        required
      />

      <FormControlLabel
        control={<Checkbox checked={product.isFeatured} onChange={handleCheckboxChange} />}
        label="Is Featured"
      />

      <TextField
        id="inventoryValue"
        name="inventoryValue"
        label="Inventory Value"
        type="number"
        variant="outlined"
        value={product.inventoryValue}
        onChange={handleInputChange}
        required
      />

      <TextField
        id="salePrice"
        name="salePrice"
        label="Sale Price"
        type="number"
        variant="outlined"
        value={product.salePrice}
        onChange={handleInputChange}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>

      {successMessage && <Typography color="green">{successMessage}</Typography>}
      {error && <Typography color="red">{error}</Typography>}
    </Stack>
  );
};

export default AddProduct;
