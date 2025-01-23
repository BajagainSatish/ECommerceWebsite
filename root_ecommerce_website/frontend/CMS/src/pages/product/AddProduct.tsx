import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getBrandsFromLocalStorage } from 'utils/LocalStorageHelper_Brand';
import { getCategoriesFromLocalStorage } from 'utils/LocalStorageHelper_Category';
import { addProductToLocalStorage } from 'utils/LocalStorageHelper_Product';
import { Product } from 'types/Product';

const AddProduct = () => {
  const [product, setProduct] = useState<Product>({
    id: 0,
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

  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

// Fetch brands from local storage
useEffect(() => {
  const storedBrands = getBrandsFromLocalStorage();
  setBrands(storedBrands.map((brand) => brand.name).sort());
}, []);

// Fetch categories from local storage
useEffect(() => {
  const storedCategories = getCategoriesFromLocalStorage();
  setCategories(storedCategories.map((category) => category.name).sort());
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
    } else if (name === 'stock') {
      setProduct({ ...product, stock: parseInt(value, 10) || 0 });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, isFeatured: e.target.checked });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product.image) {
      alert('Please upload an image.');
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now(), // Assign a unique ID
    };

    addProductToLocalStorage(newProduct);
    alert('Product added successfully!');

    // Reset form fields
    setProduct({
      id: 0,
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
            <MenuItem key={brand} value={brand}>
              {brand}
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
            <MenuItem key={category} value={category}>
            {category}
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
        control={
          <Checkbox
            checked={product.isFeatured}
            onChange={handleCheckboxChange}
          />
        }
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
    </Stack>
  );
};

export default AddProduct;
