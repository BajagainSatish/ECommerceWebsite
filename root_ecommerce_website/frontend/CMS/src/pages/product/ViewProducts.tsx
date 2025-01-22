import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  getProductsFromLocalStorage,
  deleteProductFromLocalStorage,
  updateProductInLocalStorage,
} from 'utils/LocalStorageHelper_Product';
import { getBrandsFromLocalStorage } from 'utils/LocalStorageHelper_Brand';
import { getCategoriesFromLocalStorage } from 'utils/LocalStorageHelper_Category';
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
import { FormControl, InputLabel} from '@mui/material';

const ViewProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch products, brands, and categories
  useEffect(() => {
    setProducts(getProductsFromLocalStorage());
    setBrands(getBrandsFromLocalStorage().map((brand) => brand.name));
    setCategories(getCategoriesFromLocalStorage().map((category) => category.name));
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };

  const handleDeleteConfirmation = (product: Product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleEditSave = () => {
    if (selectedProduct) {
      // Handle image upload if a new image is selected
      if (imageFile) {
        const imageUrl = URL.createObjectURL(imageFile); // Temporarily create a URL for the image file
        selectedProduct.image = imageUrl;
      }

      updateProductInLocalStorage(selectedProduct);
      setProducts(getProductsFromLocalStorage());
      setOpenEditDialog(false);
    }
  };

  const handleDelete = () => {
    if (selectedProduct) {
      deleteProductFromLocalStorage(selectedProduct.id);
      setProducts(getProductsFromLocalStorage());
      setOpenDeleteDialog(false);
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
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
) => {
  if (selectedProduct) {
    const { name, value } = e.target;
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
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                ) : (
                  <Typography variant="body2">No Image</Typography>
                )}
              </TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.details}</TableCell>
              <TableCell>{product.isFeatured ? 'Yes' : 'No'}</TableCell>
              <TableCell>{product.inventoryValue}</TableCell>
              <TableCell>{product.salePrice}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(product)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteConfirmation(product)} color="secondary">
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
    value={selectedProduct?.brand || ''}
    onChange={handleInputChange}
  >
    {brands.map((brand) => (
      <MenuItem key={brand} value={brand}>
        {brand}
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
    value={selectedProduct?.category || ''}
    onChange={handleInputChange}
  >
    {categories.map((category) => (
      <MenuItem key={category} value={category}>
        {category}
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
          <Typography variant="body1">Are you sure you want to delete this product?</Typography>
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
