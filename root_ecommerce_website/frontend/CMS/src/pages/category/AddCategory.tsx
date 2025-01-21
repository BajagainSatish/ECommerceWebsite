import { useState, ChangeEvent, FormEvent } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Category {
  name: string;
  description: string;
}

const AddCategory = () => {
  const [category, setCategory] = useState<Category>({ name: '', description: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(category);
  };

  return (
    <Stack onSubmit={handleSubmit} component="form" direction="column" spacing={2}>
      <Typography variant="h4" fontWeight={600}>
        Add New Category
      </Typography>
      <TextField
        id="name"
        name="name"
        label="Category Name"
        variant="outlined"
        value={category.name}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="description"
        name="description"
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={category.description}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Category
      </Button>
    </Stack>
  );
};

export default AddCategory;
