import React, { useEffect, useRef, useState } from "react";
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
    Badge
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
    PhotoCamera,
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

    // Add state for profile image
    const [profileImage, setProfileImage] = useState(authDetails.profileImage || null);
    const [imagePreview, setImagePreview] = useState(authDetails.profileImage || null);

    // File input ref
    const fileInputRef = useRef(null);


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
        const response = await UserService.me();
        if (response.success) {
            const { data } = response;
            setFormData({
                ...formData,
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                location: data.location,
                phone: data.phone,
            })
        }


    }

    const handleSave = async () => {
        const { data } = await UserService.profileUpdate(formData.firstName, formData.lastName, formData.bio, formData.phone, formData.location);
        dispatch(mE({
            user: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                id: data._id,
            }
        }));

    }

    // Handle file selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showErrorToast('Please select an image file');
                return;
            }

            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showErrorToast('Image size should be less than 5MB');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Store file for upload
            setProfileImage(file);

            // Upload immediately (optional)
            // handleImageUpload(file);
        }
    };

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
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />

                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <IconButton
                                        onClick={() => fileInputRef.current?.click()}
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            width: 40,
                                            height: 40,
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                            },
                                            boxShadow: 2
                                        }}
                                    >
                                        <PhotoCamera fontSize="small" />
                                    </IconButton>
                                }
                            >
                                <Avatar
                                    src={imagePreview}
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        fontSize: '3rem',
                                        fontWeight: 'bold',
                                        bgcolor: imagePreview ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
                                        border: '4px solid white',
                                        boxShadow: 3,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {!imagePreview && getInitials(authDetails.firstName + ' ' + authDetails.lastName)}
                                </Avatar>
                            </Badge>


                        </Box>

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
                                        value={formData?.firstName || ''}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        value={formData?.lastName || ''}
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
                                        value={formData?.email || ''}
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
                                        value={formData?.phone || ''}
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
                                        value={formData?.location || ''}
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
                                        value={formData?.bio || ''}
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