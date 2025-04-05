import { TextField, Box } from '@mui/material';
import { useState } from 'react';
import { BaseCRUDLayout } from '../../components/BaseCRUD/BaseCRUDLayout';
import { GridColDef } from '@mui/x-data-grid';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 99.99, category: 'Electronics', stock: 100 },
    { id: 2, name: 'Product 2', price: 149.99, category: 'Clothing', stock: 50 },
  ]);

  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log('Searching:', query);
  };

  const handleAdd = async (product: Product) => {
    // Implement add logic here
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const handleUpdate = async (product: Product) => {
    // Implement update logic here
    setProducts(products.map(p => p.id === product.id ? product : p));
  };

  const handleDelete = async (id: string | number) => {
    // Implement delete logic here
    setProducts(products.filter(p => p.id !== id));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Product Name', flex: 1 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'stock', headerName: 'Stock', width: 130 }
  ];

  const renderForm = (product: Product | null) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
      <TextField
        label="Product Name"
        defaultValue={product?.name}
        fullWidth
        required
      />
      <TextField
        label="Price"
        type="number"
        defaultValue={product?.price}
        fullWidth
        required
      />
      <TextField
        label="Category"
        defaultValue={product?.category}
        fullWidth
        required
      />
      <TextField
        label="Stock"
        type="number"
        defaultValue={product?.stock}
        fullWidth
        required
      />
    </Box>
  );

  return (
    <BaseCRUDLayout
      title="Products"
      columns={columns}
      data={products}
      renderForm={renderForm}
      onSearch={handleSearch}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
};

export default ProductsPage;
