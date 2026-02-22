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
  Button,
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
import UserService from '../../Services/UserService';

export function Navbar({ onMenuClick, onNavigate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const authDetails = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) {
      return '';
    }

    const names = name.trim().split(' ');
    if (names.length === 1) {
      // Single name - return first letter
      return names[0].charAt(0).toUpperCase();
    }

    // Multiple names - return first letter of first and last name
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();

  }
  const userData = {
    name: authDetails.firstName + ' ' + authDetails.lastName,
    email: authDetails.email,
    role: 'Administrator',
    avatar: getInitials(authDetails.firstName + ' ' + authDetails.lastName)
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const response = await UserService.logout();
    if (response.success) {
      dispatch(setFlashMessage({
        message: "You have been logged out successfully!",
        type: "success"
      }))
      dispatch(logout());
    }

  };

  const handleProfileClick = () => {
    navigate('/profile');
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
        <Button
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: '1.25rem',
            textTransform: 'none',
            flexGrow: { xs: 1, md: 0 },
            '&:hover': {
              bgcolor: 'transparent',
              opacity: 0.8,
            }
          }}
          onClick={() => navigate('/dashboard')}
        >
          F2P
        </Button>

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


