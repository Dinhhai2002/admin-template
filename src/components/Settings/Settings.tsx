import { Box, Drawer, IconButton, Stack, Typography, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext, type ThemeVariant } from '../../theme/ThemeContextProvider';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

interface SettingItemProps {
  title: string;
  children: React.ReactNode;
}

const SettingItem = ({ title, children }: SettingItemProps) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const PresetButton = ({ color, isSelected, onClick }: { color: string; isSelected: boolean; onClick: () => void }) => (
  <Box
    onClick={onClick}
    sx={{
      width: 48,
      height: 48,
      borderRadius: 1,
      backgroundColor: color,
      cursor: 'pointer',
      border: (theme) => `2px solid ${isSelected ? theme.palette.primary.main : 'transparent'}`,
      '&:hover': {
        opacity: 0.8,
      },
    }}
  />
);

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { mode, variant, toggleColorMode, setThemeVariant } = useThemeContext();
  const [layout, setLayout] = useState<'default' | 'compact'>('default');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  const presets: Array<{ color: string; variant: ThemeVariant }> = [
    { color: '#1976d2', variant: 'default' },
    { color: '#2196f3', variant: 'modern' },
    { color: '#5c6bc0', variant: 'elegant' },
    { color: '#43a047', variant: 'nature' },
    { color: '#0288d1', variant: 'ocean' },
    { color: '#f57c00', variant: 'sunset' },
    { color: '#6b3fa0', variant: 'cosmic' },
    { color: '#2e7d32', variant: 'forest' },
    { color: '#ec407a', variant: 'candy' },
    { color: '#3949ab', variant: 'midnight' },
    { color: '#ff7043', variant: 'sunrise' },
    { color: '#00e5ff', variant: 'neon' },
    { color: '#8e24aa', variant: 'royal' },
    { color: '#f57c00', variant: 'autumn' },
    { color: '#4fc3f7', variant: 'winter' },
    { color: '#66bb6a', variant: 'spring' },
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLayoutChange = (_: React.MouseEvent<HTMLElement>, newLayout: 'default' | 'compact') => {
    if (newLayout !== null) {
      setLayout(newLayout);
    }
  };

  const handleDirectionChange = (_: React.MouseEvent<HTMLElement>, newDirection: 'ltr' | 'rtl') => {
    if (newDirection !== null) {
      setDirection(newDirection);
    }
  };

  const onThemeChange = (theme: ThemeVariant) => {
    setThemeVariant(theme);
  };

  const getGradientForColor = (color: string, mode: 'light' | 'dark') => {
    const lighterColor = mode === 'light' ? color : adjustColor(color, 20);
    const darkerColor = mode === 'light' ? adjustColor(color, -20) : color;
    return `linear-gradient(180deg, ${lighterColor} 0%, ${darkerColor} 100%)`;
  };

  const adjustColor = (color: string, amount: number) => {
    const hex = color.replace('#', '');
    const r = Math.max(Math.min(parseInt(hex.substring(0, 2), 16) + amount, 255), 0);
    const g = Math.max(Math.min(parseInt(hex.substring(2, 4), 16) + amount, 255), 0);
    const b = Math.max(Math.min(parseInt(hex.substring(4, 6), 16) + amount, 255), 0);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} sx={{ color: theme.palette.text.primary }}>
        <SettingsIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 320,
            p: 3,
            overflowY: 'auto',
          }
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h6">Settings</Typography>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Mode
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  bgcolor: mode === 'light' ? 'primary.main' : 'transparent',
                  color: mode === 'light' ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: mode === 'light' ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <LightModeIcon />
              </IconButton>
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  bgcolor: mode === 'dark' ? 'primary.main' : 'transparent',
                  color: mode === 'dark' ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: mode === 'dark' ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <DarkModeIcon />
              </IconButton>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Themes
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
              {presets.map((preset) => (
                <Chip 
                  key={preset.variant}
                  label={preset.variant.charAt(0).toUpperCase() + preset.variant.slice(1)}
                  variant={variant === preset.variant ? 'filled' : 'outlined'}
                  onClick={() => onThemeChange(preset.variant)}
                  sx={{
                    borderRadius: 1,
                    borderColor: preset.color,
                    color: variant === preset.variant ? 'white' : preset.color,
                    '&.MuiChip-filled': {
                      bgcolor: preset.color,
                      backgroundImage: (theme) => getGradientForColor(preset.color, theme.palette.mode),
                      '&:hover': {
                        bgcolor: preset.color,
                        backgroundImage: (theme) => getGradientForColor(adjustColor(preset.color, -10), theme.palette.mode),
                      },
                    },
                    '&.MuiChip-outlined': {
                      '&:hover': {
                        bgcolor: `${preset.color}10`,
                      },
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Layout
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={layout}
              onChange={handleLayoutChange}
              aria-label="layout"
              fullWidth
            >
              <ToggleButton value="default" aria-label="default layout">
                Default
              </ToggleButton>
              <ToggleButton value="compact" aria-label="compact layout">
                Compact
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Direction
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={direction}
              onChange={handleDirectionChange}
              aria-label="direction"
              fullWidth
            >
              <ToggleButton value="ltr" aria-label="left to right">
                LTR
              </ToggleButton>
              <ToggleButton value="rtl" aria-label="right to left">
                RTL
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
};
