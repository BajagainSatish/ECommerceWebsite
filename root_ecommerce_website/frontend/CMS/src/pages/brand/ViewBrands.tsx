import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ViewBrands = () => {
  const brands = [
    { id: 1, name: 'Brand A', description: 'Description A' },
    { id: 2, name: 'Brand B', description: 'Description B' },
  ];

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
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.id}</TableCell>
              <TableCell>{brand.name}</TableCell>
              <TableCell>{brand.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewBrands;
