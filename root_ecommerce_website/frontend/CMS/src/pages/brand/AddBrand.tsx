import { useState, ChangeEvent, FormEvent } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Brand {
  name: string;
  description: string;
}

const AddBrand = () => {
  const [brand, setBrand] = useState<Brand>({ name: '', description: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(brand);
  };

  return (
    <Stack onSubmit={handleSubmit} component="form" direction="column" spacing={2}>
      <Typography variant="h4" fontWeight={600}>
        Add New Brand
      </Typography>
      <TextField
        id="name"
        name="name"
        label="Brand Name"
        variant="outlined"
        value={brand.name}
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
        value={brand.description}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Brand
      </Button>
    </Stack>
  );
};

export default AddBrand;
