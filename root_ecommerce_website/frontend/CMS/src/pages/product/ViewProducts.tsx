import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';

const ViewProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Product A',
      image: 'image-a.jpg',
      brand: 'Brand A',
      stock: 100,
      category: 'Category 1',
      price: '$10',
      details: 'Detailed description of Product A',
      isFeatured: true,
      inventoryValue: '$1000',
      salePrice: '$8',
    },
    {
      id: 2,
      name: 'Product B',
      image: 'image-b.jpg',
      brand: 'Brand B',
      stock: 50,
      category: 'Category 2',
      price: '$20',
      details: 'Detailed description of Product B',
      isFeatured: false,
      inventoryValue: '$1000',
      salePrice: '$18',
    },
  ];

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
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.details}</TableCell>
              <TableCell>{product.isFeatured ? 'Yes' : 'No'}</TableCell>
              <TableCell>{product.inventoryValue}</TableCell>
              <TableCell>{product.salePrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewProducts;