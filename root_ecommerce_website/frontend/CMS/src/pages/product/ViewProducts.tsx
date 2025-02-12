import { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Product } from 'types/Product';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel } from '@mui/material';

// Adjust this base URL as needed for your API
const API_BASE_URL = 'https://localhost:7120/api';

const ViewProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // Store full brand/category objects so we can retrieve their IDs
  const [brands, setBrands] = useState<{ id: number; name: string; description: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; description: string }[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch products, brands, and categories from the API when the component mounts
  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/brands`);
      // Assuming the API returns an array of objects with id, name, description
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      // Assuming the API returns an array of objects with id, name, description
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };

  const handleDeleteConfirmation = (product: Product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleEditSave = async () => {
    if (selectedProduct) {
      // If a new image file is selected, update the product image.
      if (imageFile) {
        // Note: Here we use a temporary URL. In production you might want to upload the file and get a persistent URL.
        const imageUrl = URL.createObjectURL(imageFile);
        selectedProduct.image = imageUrl;
      }

      // Convert the current brand and category values (which may be strings from the Select)
      // into the corresponding IDs from the brands and categories lists.
      const brandName =
        typeof selectedProduct.brand === 'object'
          ? selectedProduct.brand.name
          : selectedProduct.brand;
      const categoryName =
        typeof selectedProduct.category === 'object'
          ? selectedProduct.category.name
          : selectedProduct.category;

      const brandObj = brands.find((b) => b.name === brandName);
      const categoryObj = categories.find((c) => c.name === categoryName);

      // Prepare an object that matches what your API expects.
      const updatedProduct = {
        ...selectedProduct,
        // Remove the old brand/category fields if necessary
        brandId: brandObj ? brandObj.id : null,
        categoryId: categoryObj ? categoryObj.id : null,
      };

      try {
        await axios.put(
          `${API_BASE_URL}/products/${selectedProduct.id}`,
          updatedProduct,
          { headers: { 'Content-Type': 'application/json' } }
        );
        fetchProducts();
        setOpenEditDialog(false);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${selectedProduct.id}`);
        fetchProducts();
        setOpenDeleteDialog(false);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setSelectedProduct(null);
    setImageFile(null); // Reset image file when closing
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    if (selectedProduct) {
      const { name, value } = e.target;
      // Update the selected product.
      // For brand and category, we store the name (and later convert it to an ID when saving)
      setSelectedProduct({
        ...selectedProduct,
        [name as string]: value,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Products List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Is Featured</TableCell>
            <TableCell>Inventory Value</TableCell>
            <TableCell>Sale Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Typography variant="body2">No Image</Typography>
                )}
              </TableCell>
              {/* Render brand name (if brand is an object, display its name) */}
              <TableCell>
                {typeof product.brand === 'object'
                  ? product.brand.name
                  : product.brand}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              {/* Render category name (if category is an object, display its name) */}
              <TableCell>
                {typeof product.category === 'object'
                  ? product.category.name
                  : product.category}
              </TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.details}</TableCell>
              <TableCell>{product.isFeatured ? 'Yes' : 'No'}</TableCell>
              <TableCell>{product.inventoryValue}</TableCell>
              <TableCell>{product.salePrice}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleEdit(product)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteConfirmation(product)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Product Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <TextField
                label="Name"
                name="name"
                value={selectedProduct.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Brand</InputLabel>
                <Select
                  label="Brand"
                  name="brand"
                  value={
                    typeof selectedProduct.brand === 'object'
                      ? selectedProduct.brand.name
                      : selectedProduct.brand
                  }
                  onChange={handleInputChange}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.name}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Stock"
                name="stock"
                type="number"
                value={selectedProduct.stock}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  name="category"
                  value={
                    typeof selectedProduct.category === 'object'
                      ? selectedProduct.category.name
                      : selectedProduct.category
                  }
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={selectedProduct.price}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Details"
                name="details"
                value={selectedProduct.details}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Inventory Value"
                name="inventoryValue"
                type="number"
                value={selectedProduct.inventoryValue}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Sale Price"
                name="salePrice"
                type="number"
                value={selectedProduct.salePrice}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: '10px' }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Product Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this product?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ViewProducts;
