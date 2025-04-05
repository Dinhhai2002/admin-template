import { Box } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { ReactNode, useState } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const DRAWER_WIDTH = 280;

const MainLayout = ({ children }: MainLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header onToggleSidebar={handleDrawerToggle} isCollapsed={isCollapsed} sidebarWidth={DRAWER_WIDTH} />
      <Sidebar
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        drawerWidth={DRAWER_WIDTH}
        onCollapse={handleSidebarCollapse}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', md: `calc(100% - ${isCollapsed ? 80 : DRAWER_WIDTH}px)` },
          // ml: { xs: 0, md: isCollapsed ? '80px' : `${DRAWER_WIDTH}px` },
          transition: (theme) => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Box 
          sx={{ 
            mt: 8,
            pl: { xs: 2, sm: 3 },
            pr: { xs: 2, sm: 4 },
            py: 3,
            flexGrow: 1,
            maxWidth: '1400px',
            width: '100%'
          }}
        >
          {children}
        </Box>
        <Box 
          component="footer" 
          sx={{ 
            py: 2,
            pl: { xs: 2, sm: 3 },
            pr: { xs: 2, sm: 4 },
            borderTop: '1px solid',
            borderColor: 'divider',
            maxWidth: '1400px',
            width: '100%'
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
