import { Box, FormGroup, TextField, Typography, Link } from "@mui/material"
import StyledAuthLayout from "../../Components/StyledAuthLayout"
import { Form, Formik } from "formik";
import { ForgotPasswordValidator } from "../../Shared/Validator";
import MuiButton from "../../Components/MUI/MuiButton";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { useEffect } from "react";

const initialValues = {
    email: '',
}

const ForgotPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleFormSubmit = async (values, { setSubmitting, setFieldValue }) => {
        setSubmitting(true);
        try {
            const { email } = values;
            await AuthService.forgetPassword(email);
        } catch (error) {
            showErrorToast(error.response?.data?.message || "Failed to send reset link.");
        } finally {
            setFieldValue("email", "", false);
            setSubmitting(false);
        }

    }

    useEffect(() => {
        if (location.state?.message) {
            if (location.state.type === 'success') {
                showSuccessToast(location.state.message);
            } else if (location.state.type === 'error') {
                showErrorToast(location.state.message);
            }
        }
        navigate('.', { state: null, replace: true }); // '.' means current path, replace clears state
    }, [location.state])

    return (
        <StyledAuthLayout>
            <Typography variant="h5" gutterBottom align="center">
                Password recovery
            </Typography>
            <Formik initialValues={initialValues} validationSchema={ForgotPasswordValidator} onSubmit={handleFormSubmit}>
                {({ values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting }) => {
                    return (
                        <Form noValidate onSubmit={handleSubmit} className="mt-d">
                            <FormGroup>
                                <label className="mb-h" htmlFor="email">
                                    Email
                                </label>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@company.com"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    error={touched.email && !!errors?.email}
                                    helperText={touched.email && errors?.email ? String(errors?.email) : ''}
                                    sx={{ mb: 2 }}
                                >
                                </TextField>
                            </FormGroup>
                            <Box sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {/* Submit Button */}
                                <MuiButton loading={isSubmitting} type="submit" fullWidth size="large">
                                    Reset Your Password
                                </MuiButton>

                                {/* Sign Up */}
                                <Typography align="center" variant="body2">
                                    <Link component={RouterLink} to="/" underline="none" color="primary">
                                        Back to Login
                                    </Link>
                                </Typography>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </StyledAuthLayout>
    )
}

export default ForgotPassword;