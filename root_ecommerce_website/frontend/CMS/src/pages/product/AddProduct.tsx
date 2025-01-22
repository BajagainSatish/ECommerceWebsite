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

interface Product {
  name: string;
  image: File | null;
  brand: string;
  stock: number;
  category: string;
  price: string;
  details: string;
  isFeatured: boolean;
  inventoryValue: string;
  salePrice: string;
}

const AddProduct = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    image: null,
    brand: '',
    stock: 0,
    category: '',
    price: '',
    details: '',
    isFeatured: false,
    inventoryValue: '',
    salePrice: '',
  });

  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

// Fetch brands from local storage when the component mounts
useEffect(() => {
  const storedBrands = getBrandsFromLocalStorage();
  const brandNames = storedBrands.map((brand) => brand.name); // Extract only brand names
  const sortedBrandNames = brandNames.sort((a, b) => a.localeCompare(b)); // Sort alphabetically
  setBrands(sortedBrandNames);
}, []);

// Fetch categories from local storage when the component mounts
useEffect(() => {
  const storedCategories = getCategoriesFromLocalStorage();
  const categoryNames = storedCategories.map((category) => category.name); // Extract only category names
  const sortedCategoryNames = categoryNames.sort((a, b) => a.localeCompare(b)); // Sort alphabetically
  setCategories(sortedCategoryNames);
}, []);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setProduct({ ...product, image: (e.target as HTMLInputElement).files?.[0] || null });
    } else if (name === 'stock') {
      setProduct({ ...product, stock: parseInt(value) || 0 });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, isFeatured: e.target.checked });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value instanceof File ? value : String(value));
    });
    console.log(Object.fromEntries(formData)); // For demonstration, print the data
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
    </Stack>
  );
};

export default AddProduct;
