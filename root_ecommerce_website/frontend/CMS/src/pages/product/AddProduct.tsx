import { useState, ChangeEvent, FormEvent } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

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

  const brands = ['Brand A', 'Brand B', 'Brand C'];
  const categories = ['Category X', 'Category Y', 'Category Z'];

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
        {brands.map((brand) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
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
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
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
