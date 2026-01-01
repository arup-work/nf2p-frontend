// ==================== Navbar Component ====================
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { setFlashMessage } from '../../Redux/Slices/FlashSlice';

export function Navbar({ onMenuClick, onNavigate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const authDetails = useSelector(state => state.auth.auth);
  const dispatch = useDispatch();

  const userData = {
    name: authDetails.user.name,
    email: authDetails.user.email,
    role: 'Administrator',
    avatar: 'JD'
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setFlashMessage({
      message: "You have been logged out successfully!",
      type: "success"
    }))
    dispatch(logout());
  };

  const handleProfileClick = () => {
    onNavigate('profile');
    handleProfileMenuClose();
  };

  const handleSettingsClick = () => {
    onNavigate('settings');
    handleProfileMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'white',
        color: 'text.primary',
        boxShadow: 1
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            flexGrow: { xs: 1, md: 0 }
          }}
        >
          MyApp
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Notifications */}
        <IconButton
          color="inherit"
          sx={{ mr: 2 }}
        >
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Profile Section */}
        <Box
          onClick={handleProfileMenuOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            transition: 'background-color 0.2s',
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            {userData.avatar}
          </Avatar>

          {/* Name and Role - Hidden on mobile */}
          <Box
            sx={{
              ml: 1.5,
              textAlign: 'left',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            <Typography variant="body2" fontWeight="600" lineHeight={1.2}>
              {userData.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              lineHeight={1.2}
            >
              {userData.role}
            </Typography>
          </Box>
        </Box>

        {/* Profile Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: { mt: 1, minWidth: 200 }
          }}
        >
          <MenuItem onClick={handleProfileClick}>
            <AccountCircleIcon sx={{ mr: 1.5 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleSettingsClick}>
            <SettingsIcon sx={{ mr: 1.5 }} />
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1.5 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}


