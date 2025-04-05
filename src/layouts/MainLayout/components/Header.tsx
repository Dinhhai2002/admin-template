import { AppBar, Toolbar, IconButton, Typography, Box, useTheme, alpha, Badge, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Settings } from '../../../components/Settings/Settings';
import { useState } from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
  isCollapsed: boolean;
  sidebarWidth: number;
}

const Header = ({ onToggleSidebar, isCollapsed, sidebarWidth }: HeaderProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        width: { xs: '100%', md: `calc(100% - ${isCollapsed ? 80 : sidebarWidth}px)` },
        ml: { xs: 0, md: isCollapsed ? '80px' : `${sidebarWidth}px` },
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onToggleSidebar}
          sx={{ 
            mr: 2,
            display: { xs: 'block', md: 'none' }
          }}
        >
          <MenuIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>

        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            color: theme.palette.text.primary,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }}
        >
          Web Admin
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            onClick={handleNotificationMenuOpen}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon sx={{ color: theme.palette.text.primary }} />
            </Badge>
          </IconButton>

          <Settings />

          <IconButton
            edge="end"
            onClick={handleProfileMenuOpen}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              width: 200,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>

        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              width: 320,
              maxHeight: 400,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>New order received</Typography>
              <Typography variant="body2" color="text.secondary">2 minutes ago</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Server update completed</Typography>
              <Typography variant="body2" color="text.secondary">1 hour ago</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
