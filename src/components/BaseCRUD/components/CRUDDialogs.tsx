import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

export interface CRUDDialogsProps<T> {
  openDialog: boolean;
  openDeleteDialog: boolean;
  openViewDialog: boolean;
  selectedItem: T | null;
  onCloseDialog: () => void;
  onCloseDeleteDialog: () => void;
  onCloseViewDialog: () => void;
  onSubmit: (item: T) => Promise<void>;
  onDelete: () => Promise<void>;
  renderForm: (item: T | null) => React.ReactNode;
  renderDetails?: (item: T | null) => React.ReactNode;
}

export function CRUDDialogs<T>({
  openDialog,
  openDeleteDialog,
  openViewDialog,
  selectedItem,
  onCloseDialog,
  onCloseDeleteDialog,
  onCloseViewDialog,
  onSubmit,
  onDelete,
  renderForm,
  renderDetails,
}: CRUDDialogsProps<T>) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(selectedItem as T);
    onCloseDialog();
  };

  const handleDelete = async () => {
    await onDelete();
    onCloseDeleteDialog();
  };

  const renderDetailsContent = () => {
    if (renderDetails) {
      return renderDetails(selectedItem);
    }

    // Default view if no custom renderDetails provided
    if (!selectedItem) return null;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Object.entries(selectedItem).map(([key, value]) => (
          <Box key={key}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </Typography>
            <Typography variant="body1">
              {value?.toString() || 'N/A'}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Dialog 
        open={openDialog} 
        onClose={onCloseDialog}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            background: 'none',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1a1a1a' : '#fff',
            backgroundImage: 'none !important',
            boxShadow: (theme) => 
              theme.palette.mode === 'dark'
                ? '0px 8px 24px rgba(0, 0, 0, 0.4)'
                : '0px 8px 24px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
              backgroundImage: 'none !important',
            }}
          >
            {selectedItem ? 'Edit Item' : 'Add New Item'}
          </DialogTitle>
          <DialogContent sx={{ bgcolor: 'transparent' }}>
            {renderForm(selectedItem)}
          </DialogContent>
          <DialogActions
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
              backgroundImage: 'none !important',
              px: 3,
              py: 2,
            }}
          >
            <Button onClick={onCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedItem ? 'Save Changes' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={onCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            background: 'none',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1a1a1a' : '#fff',
            backgroundImage: 'none !important',
            boxShadow: (theme) => 
              theme.palette.mode === 'dark'
                ? '0px 8px 24px rgba(0, 0, 0, 0.4)'
                : '0px 8px 24px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
            backgroundImage: 'none !important',
          }}
        >
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ py: 3, bgcolor: 'transparent' }}>
          <Typography>
            Are you sure you want to delete this item? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
            backgroundImage: 'none !important',
            px: 3,
            py: 2,
          }}
        >
          <Button onClick={onCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openViewDialog}
        onClose={onCloseViewDialog}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            background: 'none',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1a1a1a' : '#fff',
            backgroundImage: 'none !important',
            boxShadow: (theme) => 
              theme.palette.mode === 'dark'
                ? '0px 8px 24px rgba(0, 0, 0, 0.4)'
                : '0px 8px 24px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
            backgroundImage: 'none !important',
          }}
        >
          View Details
        </DialogTitle>
        <DialogContent sx={{ py: 3, bgcolor: 'transparent' }}>
          {renderDetailsContent()}
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
            backgroundImage: 'none !important',
            px: 3,
            py: 2,
          }}
        >
          <Button onClick={onCloseViewDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
