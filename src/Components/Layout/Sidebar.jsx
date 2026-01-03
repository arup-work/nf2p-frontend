// ==================== Sidebar Component ====================
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export function Sidebar({ open, onClose, currentPage, onNavigate }) {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: '/dashboard' },
    { text: 'Analytics', icon: <BarChartIcon />, page: 'analytics' },
    { text: 'Users', icon: <PeopleIcon />, page: 'users' },
    { text: 'Projects', icon: <FolderIcon />, page: 'projects' },
    { text: 'Settings', icon: <SettingsIcon />, page: 'settings' },
  ];

  const navigate = useNavigate();
  const handleItemClick = (page) => {
    onNavigate(page);
    navigate(page);
    if (onClose) {
      onClose();
    }
  };

  const drawer = (
    <Box>
      <Toolbar /> {/* Spacer for navbar */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={currentPage === item.page}
              onClick={() => handleItemClick(item.page)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 40,
                  color: currentPage === item.page ? 'white' : 'inherit'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: currentPage === item.page ? 600 : 400
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar - Permanent */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Mobile Sidebar - Temporary */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}