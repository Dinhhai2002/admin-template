import { Drawer, List, ListItemIcon, ListItemText, IconButton, Box, useTheme, Divider, Collapse, Typography, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  drawerWidth: number;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar = ({ mobileOpen, onDrawerToggle, drawerWidth, onCollapse }: SidebarProps) => {
  const theme = useTheme();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleSubMenuClick = (menu: string) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse(newCollapsed);
  };

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/' 
    },
    {
      text: 'Products',
      icon: <InventoryIcon />,
      path: '/products',
      subItems: [
        { text: 'All Products', path: '/products' },
        { text: 'Categories', path: '/categories' },
        { text: 'Inventory', path: '/inventory' }
      ]
    },
    {
      text: 'Orders',
      icon: <ShoppingCartIcon />,
      path: '/orders',
      subItems: [
        { text: 'All Orders', path: '/orders' },
        { text: 'Shipments', path: '/shipments' },
        { text: 'Returns', path: '/returns' }
      ]
    },
    { 
      text: 'Customers', 
      icon: <PeopleIcon />, 
      path: '/customers' 
    },
    {
      text: 'Reports',
      icon: <AssessmentIcon />,
      path: '/reports',
      subItems: [
        { text: 'Sales Report', path: '/reports/sales' },
        { text: 'Inventory Report', path: '/reports/inventory' },
        { text: 'Customer Report', path: '/reports/customers' }
      ]
    },
    { 
      text: 'Settings', 
      icon: <SettingsIcon />, 
      path: '/settings' 
    }
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!isCollapsed && (
          <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Admin Panel
          </Typography>
        )}
        <IconButton onClick={handleCollapse}>
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.text}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={() => item.subItems && handleSubMenuClick(item.text)}
              sx={{
                py: 1,
                minHeight: 48,
                px: 2.5,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(145, 158, 171, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(145, 158, 171, 0.12)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: isCollapsed ? 'auto' : 40,
                color: location.pathname === item.path ? theme.palette.primary.main : 'inherit'
              }}>
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && (
                <>
                  <ListItemText 
                    primary={item.text}
                    sx={{ 
                      opacity: 1,
                      '& .MuiTypography-root': {
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: location.pathname === item.path ? 600 : 400,
                      }
                    }} 
                  />
                  {item.subItems && (
                    openSubMenu === item.text ? <ExpandLess /> : <ExpandMore />
                  )}
                </>
              )}
            </ListItemButton>
            {item.subItems && !isCollapsed && (
              <Collapse in={openSubMenu === item.text} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      component={Link}
                      to={subItem.path}
                      selected={location.pathname === subItem.path}
                      sx={{
                        pl: 4,
                        py: 0.5,
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(145, 158, 171, 0.08)',
                        },
                      }}
                    >
                      <ListItemText 
                        primary={subItem.text}
                        sx={{
                          '& .MuiTypography-root': {
                            fontSize: '0.875rem',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: location.pathname === subItem.path ? 500 : 400,
                          }
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: isCollapsed ? 80 : drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: '1px solid rgba(145, 158, 171, 0.24)',
            backgroundImage: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isCollapsed ? 80 : drawerWidth,
            borderRight: '1px solid rgba(145, 158, 171, 0.24)',
            backgroundImage: 'none',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
