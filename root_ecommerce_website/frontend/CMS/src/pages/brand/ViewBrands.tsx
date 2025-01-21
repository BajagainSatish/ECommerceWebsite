// src/components/ViewBrands.tsx
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SortIcon from '@mui/icons-material/Sort';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { saveBrandsToLocalStorage, getBrandsFromLocalStorage } from 'utils/LocalStorageHelper_Brand';

interface Brand {
  id: number;
  name: string;
  description: string;
}

const ViewBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]); // Holds the list of brands
  const [editBrand, setEditBrand] = useState<Brand | null>(null);
  const [deleteBrandDialog, setDeleteBrandDialog] = useState<Brand | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Track the current sort order

  // Load brands from local storage when component mounts
  useEffect(() => {
    const storedBrands = getBrandsFromLocalStorage(); // Retrieve brands from localStorage
    setBrands(storedBrands); // Update state with stored brands
  }, []);

  // Function to toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Sort brands based on the current sort order
  const sortedBrands = [...brands].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return sortOrder === 'asc' ? -1 : 1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleEdit = (brand: Brand) => {
    setEditBrand(brand);
  };

  const handleDelete = (brand: Brand) => {
    setDeleteBrandDialog(brand);
  };

  const confirmDelete = () => {
    if (deleteBrandDialog) {
      const updatedBrands = brands.filter((brand) => brand.id !== deleteBrandDialog.id);
      saveBrandsToLocalStorage(updatedBrands); // Update localStorage with the new list
      setBrands(updatedBrands); // Update the state
      setDeleteBrandDialog(null); // Close delete dialog
    }
  };

  const saveEdit = () => {
    if (editBrand) {
      const updatedBrands = brands.map((brand) =>
        brand.id === editBrand.id ? editBrand : brand
      );
      saveBrandsToLocalStorage(updatedBrands); // Save updated brands to localStorage
      setBrands(updatedBrands); // Update state with new brand data
      setEditBrand(null); // Close the edit dialog
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Brands List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>
              Name
              <IconButton onClick={toggleSortOrder}>
                <SortIcon />
              </IconButton>
            </TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBrands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.id}</TableCell>
              <TableCell>{brand.name}</TableCell>
              <TableCell>{brand.description}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(brand)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(brand)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={!!editBrand} onClose={() => setEditBrand(null)}>
        <DialogTitle>Edit Brand</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editBrand?.name || ''}
            onChange={(e) =>
              setEditBrand((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editBrand?.description || ''}
            onChange={(e) =>
              setEditBrand((prev) =>
                prev ? { ...prev, description: e.target.value } : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditBrand(null)}>Cancel</Button>
          <Button onClick={saveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteBrandDialog} onClose={() => setDeleteBrandDialog(null)}>
        <DialogTitle>Delete Brand</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{deleteBrandDialog?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteBrandDialog(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ViewBrands;
