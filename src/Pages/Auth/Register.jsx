import {
    TextField,
    Grid,
    Box,
    Typography,
    Link,
    InputAdornment,
    IconButton,
    Divider,
    Stack,
    Button
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import StyledAuthLayout from "../../Components/StyledAuthLayout"
import { Form, Formik } from "formik";
import { RegisterValidator } from "../../Shared/Validator";
import MuiButton from "../../Components/MUI/MuiButton";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { useState } from 'react';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleFormSubmit = async (values, { setSubmitting, setFieldValue }) => {
        setSubmitting(true);
        try {
            const { firstName, lastName, email, password } = values;
            const response = await AuthService.register(firstName, lastName, email, password);
            navigate('/', {
                state: {
                    message: response.message,
                    type: 'success'
                }
            });
        } catch (error) {
            setFieldValue("password", "", false);
        } finally {
            setSubmitting(false); // Always call this
        }

    }

    return (
        <StyledAuthLayout>
            {/* Header Section */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                        color: 'text.primary',
                        letterSpacing: '-0.5px'
                    }}
                >
                    Create your account
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    Join us today and get started in minutes
                </Typography>
            </Box>

            <Formik initialValues={initialValues} validationSchema={RegisterValidator} onSubmit={handleFormSubmit}>
                {({ values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting }) => {
                    return (
                        <Form noValidate onSubmit={handleSubmit}>
                            {/* First Name & Last Name - Side by Side */}
                            <Grid container spacing={2} sx={{ mb: 2.5 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        type="text"
                                        placeholder="John"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                        error={touched.firstName && !!errors?.firstName}
                                        helperText={touched.firstName && errors?.firstName ? String(errors?.firstName) : ''}
                                        variant="outlined"
                                        size="medium"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        type="text"
                                        placeholder="Doe"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        error={touched.lastName && !!errors?.lastName}
                                        helperText={touched.lastName && errors?.lastName ? String(errors?.lastName) : ''}
                                        variant="outlined"
                                        size="medium"
                                    />
                                </Grid>
                            </Grid>

                            {/* Email */}
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                placeholder="you@company.com"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={touched.email && !!errors?.email}
                                helperText={touched.email && errors?.email ? String(errors?.email) : ''}
                                variant="outlined"
                                size="medium"
                                sx={{ mb: 2.5 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="action" fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Password */}
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a strong password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={touched.password && !!errors?.password}
                                helperText={touched.password && errors?.password ? String(errors?.password) : 'Must be at least 8 characters'}
                                variant="outlined"
                                size="medium"
                                sx={{ mb: 3 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="action" fontSize="small" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                            >
                                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Terms and Conditions */}
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3, lineHeight: 1.6 }}
                            >
                                By creating an account, you agree to our{' '}
                                <Link
                                    href="#"
                                    underline="hover"
                                    sx={{ color: 'primary.main', fontWeight: 500 }}
                                >
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link
                                    href="#"
                                    underline="hover"
                                    sx={{ color: 'primary.main', fontWeight: 500 }}
                                >
                                    Privacy Policy
                                </Link>
                            </Typography>

                            {/* Submit Button */}
                            <MuiButton
                                loading={isSubmitting}
                                type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                disabled={isSubmitting}
                                sx={{
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    boxShadow: 2,
                                    '&:hover': {
                                        boxShadow: 4,
                                    }
                                }}
                            >
                                {isSubmitting ? 'Creating account...' : 'Create Account'}
                            </MuiButton>

                            {/* Divider */}
                            <Divider sx={{ my: 3 }}>
                                <Typography variant="body2" color="text.secondary">
                                    OR
                                </Typography>
                            </Divider>

                            {/* Social Login Buttons (Optional) */}
                            <Stack spacing={2} sx={{ mb: 3 }}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    size="large"
                                    startIcon={
                                        <Box
                                            component="img"
                                            src="https://www.google.com/favicon.ico"
                                            sx={{ width: 20, height: 20 }}
                                        />
                                    }
                                    sx={{
                                        py: 1.5,
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        color: 'text.primary',
                                        borderColor: 'divider',
                                        '&:hover': {
                                            borderColor: 'text.secondary',
                                            bgcolor: 'action.hover',
                                        }
                                    }}
                                >
                                    Continue with Google
                                </Button>
                            </Stack>

                            {/* Sign In Link */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account?{' '}
                                    <Link
                                        component={RouterLink}
                                        to="/"
                                        underline="none"
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: 600,
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Sign in
                                    </Link>
                                </Typography>
                            </Box>
                        </Form>
                    );
                }}
            </Formik>
        </StyledAuthLayout>
    );
}

export default Register;