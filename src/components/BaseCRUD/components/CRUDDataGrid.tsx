import { Box, IconButton } from '@mui/material';
import { Theme, SxProps } from '@mui/material/styles';
import { 
  DataGrid, 
  GridColDef, 
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridPaginationModel 
} from '@mui/x-data-grid';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface CRUDDataGridProps<T> {
  data: T[];
  columns: GridColDef[];
  actionColumn: GridColDef;
}

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

export function CRUDDataGrid<T>({ data, columns, actionColumn }: CRUDDataGridProps<T>) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const toolbarSx: SxProps<Theme> = {
    p: 2,
    background: 'none',
    backgroundImage: 'none !important',
    borderRadius: 1,
    mb: 1,
    '& .MuiButtonBase-root': {
      border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
      borderRadius: 1,
      mx: 0.5,
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(237,238,238,1) 100%)'
          : 'linear-gradient(180deg, rgba(50,50,50,1) 0%, rgba(35,35,35,1) 100%)',
      '&:hover': {
        backgroundImage: (theme) => 
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, rgba(237,238,238,1) 0%, rgba(220,220,220,1) 100%)'
            : 'linear-gradient(180deg, rgba(60,60,60,1) 0%, rgba(45,45,45,1) 100%)',
      },
      '&.Mui-selected': {
        backgroundImage: (theme) => 
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, rgba(200,230,255,1) 0%, rgba(180,210,255,1) 100%)'
            : 'linear-gradient(180deg, rgba(30,50,80,1) 0%, rgba(25,40,70,1) 100%)',
        '&:hover': {
          backgroundImage: (theme) => 
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, rgba(180,210,255,1) 0%, rgba(160,190,255,1) 100%)'
              : 'linear-gradient(180deg, rgba(35,55,85,1) 0%, rgba(30,45,75,1) 100%)',
        }
      }
    },
    '& .MuiInputBase-root': {
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)'
          : 'linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(35,35,35,1) 100%)',
      borderRadius: 1,
      border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
      '& input': {
        padding: '8px 12px',
      },
    },
  };

  const panelSx: SxProps<Theme> = {
    '& .MuiDataGrid-filterForm, & .MuiDataGrid-columnsPanel, & .MuiMenu-paper': {
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)'
          : 'linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(35,35,35,1) 100%)',
      '& .MuiFormControl-root': {
        '& .MuiInputBase-root': {
          background: 'none',
          backgroundImage: (theme) => 
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)'
              : 'linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(35,35,35,1) 100%)',
        }
      }
    },
    '& .MuiDataGrid-panelHeader': {
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(235,235,235,1) 100%)'
          : 'linear-gradient(180deg, rgba(50,50,50,1) 0%, rgba(40,40,40,1) 100%)',
    },
    '& .MuiDataGrid-panelContent': {
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)'
          : 'linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(35,35,35,1) 100%)',
    },
    '& .MuiDataGrid-panelFooter': {
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(235,235,235,1) 100%)'
          : 'linear-gradient(180deg, rgba(50,50,50,1) 0%, rgba(40,40,40,1) 100%)',
    }
  };

  const gridSx: SxProps<Theme> = {
    border: 'none',
    background: 'none',
    backgroundImage: 'none !important',
    '& .MuiDataGrid-main': {
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 100%)'
          : 'linear-gradient(180deg, rgba(40,40,40,1) 0%, rgba(35,35,35,1) 100%)',
      borderRadius: 1,
      overflow: 'hidden',
    },
    '& .MuiDataGrid-cell': {
      borderColor: (theme) => theme.palette.divider,
      fontSize: '0.875rem',
      '&:focus': {
        outline: 'none',
      },
    },
    '& .MuiDataGrid-row': {
      '&:hover': {
        backgroundImage: (theme) => 
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(235,235,235,1) 100%)'
            : 'linear-gradient(180deg, rgba(50,50,50,1) 0%, rgba(45,45,45,1) 100%)',
      },
      '&.Mui-selected': {
        backgroundImage: (theme) => 
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, rgba(200,230,255,1) 0%, rgba(180,210,255,1) 100%)'
            : 'linear-gradient(180deg, rgba(30,50,80,1) 0%, rgba(25,40,70,1) 100%)',
        '&:hover': {
          backgroundImage: (theme) => 
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, rgba(180,210,255,1) 0%, rgba(160,190,255,1) 100%)'
              : 'linear-gradient(180deg, rgba(35,55,85,1) 0%, rgba(30,45,75,1) 100%)',
        },
      },
    },
    '& .MuiDataGrid-columnHeaders': {
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(235,235,235,1) 100%)'
          : 'linear-gradient(180deg, rgba(50,50,50,1) 0%, rgba(45,45,45,1) 100%)',
      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      '& .MuiDataGrid-columnHeader': {
        '&:focus': {
          outline: 'none',
        },
        '&:focus-within': {
          outline: 'none',
        },
      },
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
      fontSize: '0.875rem',
      color: (theme) => theme.palette.text.primary,
    },
    '& .MuiDataGrid-footerContainer': {
      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(235,235,235,1) 100%)'
          : 'linear-gradient(180deg, rgba(50,50,50,1) 0%, rgba(45,45,45,1) 100%)',
    },
    '& .MuiTablePagination-root': {
      color: (theme) => theme.palette.text.secondary,
    },
    '& .MuiDataGrid-cell--withRenderer': {
      alignItems: 'center',
      gap: 1,
    },
    '& .MuiDataGrid-virtualScroller': {
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 100%)'
          : 'linear-gradient(180deg, rgba(40,40,40,1) 0%, rgba(35,35,35,1) 100%)',
    },
    '& .MuiDataGrid-overlayWrapper': {
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 100%)'
          : 'linear-gradient(180deg, rgba(40,40,40,1) 0%, rgba(35,35,35,1) 100%)',
    },
    '& .MuiMenu-paper': {
      background: 'none',
      backgroundImage: (theme) => 
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)'
          : 'linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(35,35,35,1) 100%)',
      '& .MuiMenuItem-root': {
        '&:hover': {
          backgroundImage: (theme) => 
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(235,235,235,1) 100%)'
              : 'linear-gradient(180deg, rgba(50,50,50,1) 0%, rgba(45,45,45,1) 100%)',
        },
        '&.Mui-selected': {
          backgroundImage: (theme) => 
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, rgba(200,230,255,1) 0%, rgba(180,210,255,1) 100%)'
              : 'linear-gradient(180deg, rgba(30,50,80,1) 0%, rgba(25,40,70,1) 100%)',
          '&:hover': {
            backgroundImage: (theme) => 
              theme.palette.mode === 'light'
                ? 'linear-gradient(180deg, rgba(180,210,255,1) 0%, rgba(160,190,255,1) 100%)'
                : 'linear-gradient(180deg, rgba(35,55,85,1) 0%, rgba(30,45,75,1) 100%)',
          }
        }
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: 'calc(100vh - 250px)' }}>
      <DataGrid
        rows={data}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel,
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        slots={{ 
          toolbar: CustomToolbar,
          columnMenu: () => (
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          ),
        }}
        slotProps={{
          toolbar: {
            quickFilterProps: { 
              debounceMs: 500,
              variant: 'outlined',
              size: 'small',
              placeholder: 'Search...',
            },
            sx: toolbarSx
          },
          panel: {
            sx: panelSx
          }
        }}
        sx={gridSx}
      />
    </Box>
  );
}
