import { useState, useEffect } from 'react';
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
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  description: string;
}

const ViewCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState<Category | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Track the current sort order
  const [error, setError] = useState<string | null>(null); // For error handling

  const apiUrl = 'http://localhost:5285/api/categories'; // Your API URL

  // Fetch categories from API when component mounts
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        setError('Failed to load categories. Please try again.');
        console.error('Error fetching categories:', err);
      });
  }, []);

  // Function to toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Sort categories based on the current sort order
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return sortOrder === 'asc' ? -1 : 1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleEdit = (category: Category) => {
    setEditCategory(category);
  };

  const handleDelete = (category: Category) => {
    setDeleteCategoryDialog(category);
  };

  const confirmDelete = () => {
    if (deleteCategoryDialog) {
      axios
        .delete(`${apiUrl}/${deleteCategoryDialog.id}`)
        .then(() => {
          setCategories(categories.filter((category) => category.id !== deleteCategoryDialog.id)); // Update state
          setDeleteCategoryDialog(null); // Close delete dialog
        })
        .catch((err) => {
          setError('Failed to delete category. Please try again.');
          console.error('Error deleting category:', err);
        });
    }
  };

  const saveEdit = () => {
    if (editCategory) {
      axios
        .put(`${apiUrl}/${editCategory.id}`, editCategory)
        .then(() => {
          setCategories(categories.map((category) => (category.id === editCategory.id ? editCategory : category))); // Update state with edited category
          setEditCategory(null); // Close the edit dialog
        })
        .catch((err) => {
          setError('Failed to update category. Please try again.');
          console.error('Error updating category:', err);
        });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Categories List
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
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
          {sortedCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(category)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(category)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={!!editCategory} onClose={() => setEditCategory(null)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editCategory?.name || ''}
            onChange={(e) =>
              setEditCategory((prev) => (prev ? { ...prev, name: e.target.value } : null))
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editCategory?.description || ''}
            onChange={(e) =>
              setEditCategory((prev) => (prev ? { ...prev, description: e.target.value } : null))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCategory(null)}>Cancel</Button>
          <Button onClick={saveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteCategoryDialog} onClose={() => setDeleteCategoryDialog(null)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{deleteCategoryDialog?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteCategoryDialog(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ViewCategories;
