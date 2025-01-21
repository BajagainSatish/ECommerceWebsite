// src/components/ViewCategories.tsx
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
import { saveCategoriesToLocalStorage, getCategoriesFromLocalStorage } from '../../utils/LocalStorageHelper_Category';

interface Category {
  id: number;
  name: string;
  description: string;
}

const ViewCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategoryState, setEditCategoryState] = useState<Category | null>(null);
  const [deleteCategoryState, setDeleteCategoryState] = useState<Category | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Track the current sort order

  // Load categories from local storage when component mounts
  useEffect(() => {
    const storedCategories = getCategoriesFromLocalStorage(); // Retrieve categories from localStorage
    setCategories(storedCategories); // Update state with stored categories
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
    setEditCategoryState(category);
  };

  const handleDelete = (category: Category) => {
    setDeleteCategoryState(category);
  };

  const confirmDelete = () => {
    if (deleteCategoryState) {
      const updatedCategories = categories.filter((category) => category.id !== deleteCategoryState.id);
      saveCategoriesToLocalStorage(updatedCategories); // Update localStorage with the new list
      setCategories(updatedCategories); // Update the state
      setDeleteCategoryState(null); // Close delete dialog
    }
  };

  const saveEdit = () => {
    if (editCategoryState) {
      const updatedCategories = categories.map((category) =>
        category.id === editCategoryState.id ? editCategoryState : category
      );
      saveCategoriesToLocalStorage(updatedCategories); // Save updated categories to localStorage
      setCategories(updatedCategories); // Update state with new category data
      setEditCategoryState(null); // Close the edit dialog
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Categories List
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
      <Dialog open={!!editCategoryState} onClose={() => setEditCategoryState(null)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editCategoryState?.name || ''}
            onChange={(e) =>
              setEditCategoryState((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editCategoryState?.description || ''}
            onChange={(e) =>
              setEditCategoryState((prev) =>
                prev ? { ...prev, description: e.target.value } : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCategoryState(null)}>Cancel</Button>
          <Button onClick={saveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteCategoryState} onClose={() => setDeleteCategoryState(null)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{deleteCategoryState?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteCategoryState(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ViewCategories;
