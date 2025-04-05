import { Box, IconButton, Stack, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

interface FilterOption {
  field: string;
  label: string;
  options: { value: string; label: string }[];
}

interface CRUDToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterOptions?: FilterOption[];
  filters: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
  onClearFilters: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const CRUDToolbar = ({
  searchQuery,
  onSearchChange,
  filterOptions,
  filters,
  onFilterChange,
  onClearFilters,
  showFilters,
  onToggleFilters,
}: CRUDToolbarProps) => {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            minWidth: 300,
            '& .MuiInputBase-root': {
              backgroundColor: (theme) => 
                theme.palette.mode === 'light' 
                  ? '#fff'
                  : '#2d2d2d',
              backgroundImage: 'none !important',
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {filterOptions && (
          <IconButton
            onClick={onToggleFilters}
            sx={{
              background: 'none',
              bgcolor: (theme) => showFilters 
                ? theme.palette.primary.main 
                : theme.palette.mode === 'light' 
                  ? '#fff'
                  : '#2d2d2d',
              backgroundImage: 'none !important',
              color: (theme) => showFilters 
                ? '#fff' 
                : theme.palette.text.primary,
              '&:hover': {
                bgcolor: (theme) => showFilters 
                  ? theme.palette.primary.dark 
                  : theme.palette.mode === 'light'
                    ? '#f5f5f5'
                    : '#1a1a1a',
              },
            }}
          >
            <FilterListIcon />
          </IconButton>
        )}
      </Box>

      {showFilters && filterOptions && (
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            p: 2, 
            borderRadius: 1,
            background: 'none',
            bgcolor: (theme) => 
              theme.palette.mode === 'light'
                ? '#fff'
                : '#2d2d2d',
            backgroundImage: 'none !important',
          }}
        >
          {filterOptions.map((filter) => (
            <TextField
              key={filter.field}
              select
              size="small"
              label={filter.label}
              value={filters[filter.field] || ''}
              onChange={(e) => onFilterChange(filter.field, e.target.value)}
              SelectProps={{ native: true }}
              sx={{ 
                minWidth: 200,
                '& .MuiInputBase-root': {
                  backgroundColor: (theme) => 
                    theme.palette.mode === 'light' 
                      ? '#fff'
                      : '#2d2d2d',
                  backgroundImage: 'none !important',
                }
              }}
            >
              <option value="">All</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          ))}
          <IconButton onClick={onClearFilters} size="small">
            <ClearIcon />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};
