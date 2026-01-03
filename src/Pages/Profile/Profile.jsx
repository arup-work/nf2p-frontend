import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    Password,
} from '@mui/icons-material';
import StyledMainLayout from "../../Components/StyledMainLayout";
import UserService from "../../Services/UserService";
import { mE } from "../../Redux/Slices/AuthSlice";
import ChangePassword from "./ChangePassword";

const Profile = () => {
    const authDetails = useSelector((state) => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();


    const [isEditing, setIsEditing] = useState(true);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);


    // Form State
    const [formData, setFormData] = useState({
        firstName: authDetails?.firstName || '',
        lastName: authDetails?.lastName || '',
        email: authDetails?.email || '',
        phone: '',
        location: '',
        bio: '',
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

    const getMe = async () => {
        const response = await UserService.me(token);
        setFormData({
            ...formData,
            firstName: response.firstName,
            lastName: response.lastName,
            bio: response.bio,
            location: response.location,
            phone: response.phone,
        })
    }

    const handleSave = async () => {
        const response = await UserService.profileUpdate(token, formData.firstName, formData.lastName, formData.bio, formData.phone, formData.location);
        dispatch(mE({
            user: {
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                id: response._id,
            }
        }));

    }

    useEffect(() => {
        getMe();
    }, [])

    return (
        <StyledMainLayout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Header Section with Avatar */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        mb: 2,
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
                            {getInitials(authDetails.firstName + ' ' + authDetails.lastName)}
                        </Avatar>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                {authDetails?.firstName + ' ' + authDetails?.lastName || 'User Name'}
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                                {authDetails?.email || 'user@example.com'}
                            </Typography>
                            <Chip
                                label={authDetails?.role || 'Administrator'}
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}
                            />
                        </Box>


                        <Button
                            variant="contained"
                            startIcon={<Password />}
                            onClick={() => setOpenPasswordModal(true)}

                            sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                        >
                            Change Password
                        </Button>
                        <ChangePassword
                            isOpen={openPasswordModal}
                            onClose={() => setOpenPasswordModal(false)}
                            token={token}
                        />

                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    {/* Left Column - Personal Information */}
                    <Grid xs={12} md={8}>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Personal Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={3}>
                                {/* First Name & Last Name */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Email & Phone */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={true}
                                        variant="outlined"
                                        slotProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        placeholder="+1 (555) 000-0000"
                                        slotProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                {/* Location - Full Width */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        placeholder="City, State, Country"
                                        slotProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                {/* Bio - Full Width */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        placeholder="Tell us a little bit about yourself..."
                                        helperText={`${formData.bio?.length || 0}/250 characters`}
                                        slotProps={{
                                            htmlInput: {
                                                maxLength: 250
                                            }
                                        }}
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

                                        <Grid size={{ xs: 12, sm: 6 }}>
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

                                        <Grid size={{ xs: 12, sm: 6 }}>
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
            </Container >
        </StyledMainLayout >
    );

}

export default Profile;