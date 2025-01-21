import { useState } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface Brand {
  id: number;
  name: string;
  description: string;
}

const ViewBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([
    { id: 1, name: 'Brand A', description: 'Description A' },
    { id: 2, name: 'Brand B', description: 'Description B' },
  ]);

  const [editBrand, setEditBrand] = useState<Brand | null>(null);
  const [deleteBrand, setDeleteBrand] = useState<Brand | null>(null);

  const handleEdit = (brand: Brand) => {
    setEditBrand(brand);
  };

  const handleDelete = (brand: Brand) => {
    setDeleteBrand(brand);
  };

  const confirmDelete = () => {
    if (deleteBrand) {
      setBrands(brands.filter((b) => b.id !== deleteBrand.id));
      setDeleteBrand(null);
    }
  };

  const saveEdit = () => {
    if (editBrand) {
      setBrands(
        brands.map((b) =>
          b.id === editBrand.id ? { ...b, ...editBrand } : b
        )
      );
      setEditBrand(null);
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
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map((brand) => (
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
      <Dialog open={!!deleteBrand} onClose={() => setDeleteBrand(null)}>
        <DialogTitle>Delete Brand</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{deleteBrand?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteBrand(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ViewBrands;
