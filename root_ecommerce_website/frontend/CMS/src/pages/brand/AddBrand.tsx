import { useState, ChangeEvent, FormEvent } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";

interface Brand {
  id: number;
  name: string;
  description: string;
}

const AddBrand = () => {
  const [brand, setBrand] = useState<Omit<Brand, "id">>({ name: "", description: "" });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("https://localhost:7120/api/brands", brand, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 201) {
        setSuccessMessage("Brand added successfully!");
        setBrand({ name: "", description: "" });
      } else {
        setError("Unexpected response from server.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response);
        setError(error.response?.data?.message || "Failed to add brand. Please try again.");
      } else {
        console.error("Unexpected Error:", error);
        setError("An unexpected error occurred.");
      }
    }
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
      {successMessage && <Typography color="green">{successMessage}</Typography>}
      {error && <Typography color="red">{error}</Typography>}
    </Stack>
  );
};

export default AddBrand;
