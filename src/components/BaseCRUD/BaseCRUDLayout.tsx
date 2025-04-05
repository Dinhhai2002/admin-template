import { Box, Button, Card, IconButton, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { CRUDToolbar, CRUDDataGrid, CRUDDialogs } from './components';

interface BaseCRUDLayoutProps<T> {
  title: string;
  columns: GridColDef[];
  data: T[];
  renderForm: (item: T | null) => React.ReactNode;
  renderDetails?: (item: T | null) => React.ReactNode;
  onSearch?: (query: string) => void;
  onAdd?: (item: T) => Promise<void>;
  onUpdate?: (item: T) => Promise<void>;
  onDelete?: (id: string | number) => Promise<void>;
  filterOptions?: {
    field: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
}

export function BaseCRUDLayout<T>({
  title,
  columns,
  data,
  renderForm,
  renderDetails,
  onSearch,
  onAdd,
  onUpdate,
  onDelete,
  filterOptions,
}: BaseCRUDLayoutProps<T>) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleOpenDialog = (item: T | null = null) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = (id: string | number) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedId(null);
    setOpenDeleteDialog(false);
  };

  const handleOpenViewDialog = (item: T | null = null) => {
    setSelectedItem(item);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setSelectedItem(null);
    setOpenViewDialog(false);
  };

  const handleSubmit = async (formData: T) => {
    if (selectedItem) {
      await onUpdate?.(formData);
    } else {
      await onAdd?.(formData);
    }
    handleCloseDialog();
  };

  const handleDelete = async () => {
    if (selectedId) {
      await onDelete?.(selectedId);
    }
    handleCloseDeleteDialog();
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const actionColumn: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <IconButton
          size="small"
          onClick={() => handleOpenViewDialog(params.row)}
          sx={{ 
            color: (theme) => theme.palette.info.main,
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.info.main, 0.08),
            },
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleOpenDialog(params.row)}
          sx={{ 
            color: (theme) => theme.palette.primary.main,
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleOpenDeleteDialog(params.row.id)}
          sx={{ 
            color: (theme) => theme.palette.error.main,
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    ),
  };

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3 }}>
      <Card 
        elevation={0}
        sx={{ 
          p: 3, 
          height: '100%',
          backgroundColor: (theme) => 
            theme.palette.mode === 'light' 
              ? '#ffffff' 
              : theme.palette.background.paper,
          backdropFilter: 'blur(8px)',
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>{title}</Typography>
            <Button
              variant="contained"
              onClick={() => handleOpenDialog()}
              sx={{
                px: 3,
                backgroundColor: (theme) => theme.palette.primary.main,
                color: '#fff',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              Add New
            </Button>
          </Box>

          <CRUDToolbar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            filterOptions={filterOptions}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />

          <CRUDDataGrid
            data={data}
            columns={columns}
            actionColumn={actionColumn}
          />
        </Stack>
      </Card>

      <CRUDDialogs
        openDialog={openDialog}
        openDeleteDialog={openDeleteDialog}
        openViewDialog={openViewDialog}
        selectedItem={selectedItem}
        onCloseDialog={handleCloseDialog}
        onCloseDeleteDialog={handleCloseDeleteDialog}
        onCloseViewDialog={handleCloseViewDialog}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        renderForm={renderForm}
        renderDetails={renderDetails}
      />
    </Box>
  );
}
