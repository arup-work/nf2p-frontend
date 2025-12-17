// ==================== Main App Layout ====================
import { Box, Toolbar as MuiToolbar } from '@mui/material';
import { Navbar } from './Layout/Navbar';
import { Sidebar } from './Layout/Sidebar';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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

      {/* Main Content */}
      <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f0f4fa", // Light blue-gray background for the whole page
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container maxWidth="sm">
                <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                        <ToastContainer />
                        {children}
                    </CardContent>
                </Card>
            </Container>
        </Box>
    </Box>
  );
}