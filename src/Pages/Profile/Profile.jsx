import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Box,
    Container,
    Paper,
    Avatar,
    Typography,
    Grid,
    TextField,
    Button,
    Divider,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    Chip,
    Stack,
} from '@mui/material';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import StyledMainLayout from "../../Components/StyledMainLayout";

const Profile = () => {
    const authDetails = useSelector((state) => state.auth.auth);
    const [isEditing, setIsEditing] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: authDetails?.user?.name || '',
        email: authDetails?.user?.email || '',
        phone: '+1 234 567 8900',
        location: 'New York, USA',
        bio: 'Passionate developer and problem solver',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    // Get initials for avatar
    const getInitials = (name) => {
        if (!name) return '';
        const names = name.trim().split(' ');
        if (names.length === 1) {
            return names[0].charAt(0).toUpperCase();
        }
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data
        setFormData({
            ...formData,
            name: authDetails?.user?.name || '',
            email: authDetails?.user?.email || '',
        })
    }

    const handleSave = () => {
        console.log('Saving profile data:', formData);
        setIsEditing(false);
    }

    return (
        <StyledMainLayout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Header Section with Avatar */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        mb: 4,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: 3,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                bgcolor: 'rgba(255, 255, 255, 0.3)',
                                border: '4px solid white',
                                boxShadow: 3,
                            }}
                        >
                            {getInitials(authDetails?.user?.name)}
                        </Avatar>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                {authDetails?.user?.name || 'User Name'}
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                                {authDetails?.user?.email || 'user@example.com'}
                            </Typography>
                            <Chip
                                label={authDetails?.user?.role || 'Administrator'}
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}
                            />
                        </Box>

                        {/* {!isEditing && (
                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                onClick={handleEdit}
                                sx={{
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                                    },
                                }}
                            >
                                Edit Profile
                            </Button>
                        )} */}
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    {/* Left Column - Personal Information */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Personal Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            {/* {isEditing && (
                                <>
                                    <Divider sx={{ my: 3 }} />
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        Change Password
                                    </Typography>
                                    <Grid container spacing={3} sx={{ mt: 1 }}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Current Password"
                                                name="currentPassword"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="New Password"
                                                name="newPassword"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Confirm New Password"
                                                name="confirmPassword"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            )} */}
                            <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSave}
                                    size="large"
                                >
                                    Save Changes
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </StyledMainLayout>
    );

}

export default Profile;