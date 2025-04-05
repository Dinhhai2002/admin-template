import { Box, Chip, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { BaseCRUDLayout } from '../../components/BaseCRUD/BaseCRUDLayout';
import { 
  GridColDef, 
  GridRenderCellParams,
} from '@mui/x-data-grid';

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  total: number;
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  orderDate: string;
}

const OrdersPage = () => {
  const [orders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: 'ORD-001',
      customerName: 'John Doe',
      total: 299.99,
      orderStatus: 'delivered',
      paymentStatus: 'paid',
      orderDate: '2025-04-05',
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customerName: 'Jane Smith',
      total: 159.99,
      orderStatus: 'processing',
      paymentStatus: 'paid',
      orderDate: '2025-04-05',
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customerName: 'Bob Wilson',
      total: 499.99,
      orderStatus: 'pending',
      paymentStatus: 'unpaid',
      orderDate: '2025-04-04',
    },
    {
      id: 4,
      orderNumber: 'ORD-004',
      customerName: 'Alice Brown',
      total: 89.99,
      orderStatus: 'shipped',
      paymentStatus: 'paid',
      orderDate: '2025-04-04',
    },
    {
      id: 5,
      orderNumber: 'ORD-005',
      customerName: 'Charlie Davis',
      total: 199.99,
      orderStatus: 'cancelled',
      paymentStatus: 'refunded',
      orderDate: '2025-04-03',
    },
    {
      id: 6,
      orderNumber: 'ORD-006',
      customerName: 'Eva Green',
      total: 399.99,
      orderStatus: 'delivered',
      paymentStatus: 'paid',
      orderDate: '2025-04-03',
    },
    {
      id: 7,
      orderNumber: 'ORD-007',
      customerName: 'Frank Miller',
      total: 749.99,
      orderStatus: 'processing',
      paymentStatus: 'paid',
      orderDate: '2025-04-02',
    },
    {
      id: 8,
      orderNumber: 'ORD-008',
      customerName: 'Grace Lee',
      total: 129.99,
      orderStatus: 'pending',
      paymentStatus: 'unpaid',
      orderDate: '2025-04-02',
    },
    {
      id: 9,
      orderNumber: 'ORD-009',
      customerName: 'Henry Ford',
      total: 899.99,
      orderStatus: 'shipped',
      paymentStatus: 'paid',
      orderDate: '2025-04-01',
    },
    {
      id: 10,
      orderNumber: 'ORD-010',
      customerName: 'Ivy Chen',
      total: 259.99,
      orderStatus: 'cancelled',
      paymentStatus: 'refunded',
      orderDate: '2025-04-01',
    },
  ]);

  const columns: GridColDef<Order>[] = [
    { 
      field: 'orderNumber', 
      headerName: 'Order', 
      width: 130,
      renderCell: (params: GridRenderCellParams<Order>) => (
        <Box sx={{ fontWeight: 600, color: 'primary.main' }}>
          {params.value}
        </Box>
      ),
    },
    { 
      field: 'customerName', 
      headerName: 'Customer',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 120,
      type: 'number',
      valueFormatter: ({ value }: { value: number | null }) => {
        if (value == null) return '';
        return `$${value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      },
      renderCell: (params: GridRenderCellParams<Order>) => (
        <Box sx={{ fontWeight: 600 }}>
          ${params.value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Box>
      ),
    },
    {
      field: 'orderStatus',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams<Order>) => {
        const status = params.value as Order['orderStatus'];
        const statusConfig: Record<Order['orderStatus'], { color: string; backgroundColor: string }> = {
          pending: { color: '#B54708', backgroundColor: '#FFFAEB' },
          processing: { color: '#026AA2', backgroundColor: '#F0F9FF' },
          shipped: { color: '#027A48', backgroundColor: '#ECFDF3' },
          delivered: { color: '#027A48', backgroundColor: '#ECFDF3' },
          cancelled: { color: '#B42318', backgroundColor: '#FEF3F2' },
        };

        return (
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            size="small"
            sx={{
              color: statusConfig[status].color,
              backgroundColor: statusConfig[status].backgroundColor,
              borderRadius: '6px',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          />
        );
      },
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment',
      width: 130,
      renderCell: (params: GridRenderCellParams<Order>) => {
        const status = params.value as Order['paymentStatus'];
        const statusConfig: Record<Order['paymentStatus'], { color: string; backgroundColor: string }> = {
          paid: { color: '#027A48', backgroundColor: '#ECFDF3' },
          unpaid: { color: '#B54708', backgroundColor: '#FFFAEB' },
          refunded: { color: '#B42318', backgroundColor: '#FEF3F2' },
        };

        return (
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            size="small"
            sx={{
              color: statusConfig[status].color,
              backgroundColor: statusConfig[status].backgroundColor,
              borderRadius: '6px',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          />
        );
      },
    },
    {
      field: 'orderDate',
      headerName: 'Date',
      width: 120,
      valueFormatter: ({ value }: { value: string | null }) => {
        if (!value) return '';
        return new Date(value as string).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
    },
  ];

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleAdd = async (order: Order) => {
    console.log('Add:', order);
  };

  const handleUpdate = async (order: Order) => {
    console.log('Update:', order);
  };

  const handleDelete = async (id: string | number) => {
    console.log('Delete:', id);
  };

  const renderForm = (order: Order | null) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
      <TextField
        label="Order Number"
        defaultValue={order?.orderNumber}
        fullWidth
        required
      />
      <TextField
        label="Customer Name"
        defaultValue={order?.customerName}
        fullWidth
        required
      />
      <TextField
        label="Total"
        type="number"
        defaultValue={order?.total}
        fullWidth
        required
      />
      <TextField
        label="Order Status"
        defaultValue={order?.orderStatus}
        select
        fullWidth
        required
        SelectProps={{
          native: true,
        }}
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </TextField>
      <TextField
        label="Payment Status"
        defaultValue={order?.paymentStatus}
        select
        fullWidth
        required
        SelectProps={{
          native: true,
        }}
      >
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
        <option value="refunded">Refunded</option>
      </TextField>
    </Box>
  );

  const renderDetails = (order: Order | null) => {
    if (!order) return null;
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Order Number
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {order.orderNumber}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Customer Name
          </Typography>
          <Typography variant="body1">
            {order.customerName}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Total
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            ${order.total.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Order Status
          </Typography>
          <Chip
            label={order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
            size="small"
            sx={{
              color: statusConfig[order.orderStatus].color,
              backgroundColor: statusConfig[order.orderStatus].backgroundColor,
              borderRadius: '6px',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Payment Status
          </Typography>
          <Chip
            label={order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            size="small"
            sx={{
              color: paymentStatusConfig[order.paymentStatus].color,
              backgroundColor: paymentStatusConfig[order.paymentStatus].backgroundColor,
              borderRadius: '6px',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Order Date
          </Typography>
          <Typography variant="body1">
            {new Date(order.orderDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
        </Box>
      </Box>
    );
  };

  const statusConfig: Record<Order['orderStatus'], { color: string; backgroundColor: string }> = {
    pending: { color: '#B54708', backgroundColor: '#FFFAEB' },
    processing: { color: '#026AA2', backgroundColor: '#F0F9FF' },
    shipped: { color: '#027A48', backgroundColor: '#ECFDF3' },
    delivered: { color: '#027A48', backgroundColor: '#ECFDF3' },
    cancelled: { color: '#B42318', backgroundColor: '#FEF3F2' },
  };

  const paymentStatusConfig: Record<Order['paymentStatus'], { color: string; backgroundColor: string }> = {
    paid: { color: '#027A48', backgroundColor: '#ECFDF3' },
    unpaid: { color: '#B54708', backgroundColor: '#FFFAEB' },
    refunded: { color: '#B42318', backgroundColor: '#FEF3F2' },
  };

  return (
    <BaseCRUDLayout
      title="Orders"
      columns={columns}
      data={orders}
      renderForm={renderForm}
      renderDetails={renderDetails}
      onSearch={handleSearch}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      filterOptions={[
        {
          field: 'orderStatus',
          label: 'Order Status',
          options: [
            { value: 'pending', label: 'Pending' },
            { value: 'processing', label: 'Processing' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'cancelled', label: 'Cancelled' },
          ],
        },
        {
          field: 'paymentStatus',
          label: 'Payment Status',
          options: [
            { value: 'paid', label: 'Paid' },
            { value: 'unpaid', label: 'Unpaid' },
            { value: 'refunded', label: 'Refunded' },
          ],
        },
      ]}
    />
  );
};

export default OrdersPage;
