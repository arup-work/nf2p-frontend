import { Box, FormGroup, TextField, Typography, Link } from "@mui/material"
import StyledAuthLayout from "../../Components/StyledAuthLayout"
import { Form, Formik } from "formik";
import { ResetPasswordValidator } from "../../Shared/Validator";
import MuiButton from "../../Components/MUI/MuiButton";
import { Link as RouterLink, useLocation, useNavigate, useParams } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../Helpers/Utils/ToastUtils";

const initialValues = {
    password: '',
    confirm_password: '',
}

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useParams();

    const handleFormSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const { password } = values;
            const response = await AuthService.resetPassword(password, token);
            navigate('/', {
                state: {
                    message: response.message,
                    type: 'success'
                }
            });
        } catch (error) {
            // showErrorToast(error.response?.data?.message || "Failed to update password");

        } finally {
            setSubmitting(true);
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
                Password Recovery
            </Typography>
            <Formik initialValues={initialValues} validationSchema={ResetPasswordValidator} onSubmit={handleFormSubmit}>
                {({ values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting }) => {
                    return (
                        <Form noValidate onSubmit={handleSubmit} className="mt-d">
                            <FormGroup>
                                <label className="mb-h" htmlFor="password">
                                    Password
                                </label>
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="******"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    error={touched.password && !!errors?.password}
                                    helperText={touched.password && errors?.password ? String(errors?.password) : ''}
                                    sx={{ mb: 2 }}
                                >
                                </TextField>
                            </FormGroup>
                            <FormGroup>
                                <label className="mb-h" htmlFor="password">
                                    Confirm Password
                                </label>
                                <TextField
                                    id="confirm_password"
                                    name="confirm_password"
                                    type="password"
                                    placeholder="******"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirm_password}
                                    error={touched.confirm_password && !!errors?.confirm_password}
                                    helperText={touched.confirm_password && errors?.confirm_password ? String(errors?.confirm_password) : ''}
                                    sx={{ mb: 2 }}
                                >
                                </TextField>
                            </FormGroup>
                            <Box sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <MuiButton loading={isSubmitting} type="submit" fullWidth size="large">
                                    Reset password
                                </MuiButton>
                                <Typography className="desc mt">
                                    Already have an account?{' '}
                                    <Link component={RouterLink} to="/" underline="none" color="primary">Back to Login</Link>
                                </Typography>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </StyledAuthLayout>
    )
}

export default ResetPassword;