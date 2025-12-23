import { Box, Toolbar as MuiToolbar } from '@mui/material';
import { Navbar } from './Layout/Navbar';
import { Sidebar } from './Layout/Sidebar';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

export default function StyledMainLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <ToastContainer />
      
      {/* Navbar */}
      <Navbar
        onMenuClick={handleDrawerToggle}
        onNavigate={handleNavigate}
      />

      {/* Sidebar */}
      <Sidebar
        open={mobileOpen}
        onClose={handleDrawerToggle}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // ml: { xs: 0, md: '240px' },
          mt: '64px', // Height of navbar
          minHeight: 'calc(100vh - 64px)',
          bgcolor: '#f5f5f5', // Light gray background
          // width: { xs: '100%', md: `calc(100% - 240px)` },
        }}
      >
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}