import { Box, FormGroup, TextField, Typography, Link } from "@mui/material"
import StyledAuthLayout from "../../Components/StyledAuthLayout"
import { Form, Formik } from "formik";
import { LoginValidator } from "../../Shared/Validator";
import MuiButton from "../../Components/MUI/MuiButton";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../Helpers/Utils/ToastUtils";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/AuthSlice";

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const handleFormSubmit = async (values, { setSubmitting }) => {
        const { email, password } = values;
        const response = await AuthService.login(email, password);
        // console.log(response);
        
        dispatch(login({
            token: response.data.token,
            user: response.data.user
        }));
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
                Login
            </Typography>
            <Formik initialValues={initialValues} validationSchema={LoginValidator} onSubmit={handleFormSubmit}>
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
                            <Box sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {/* Right-aligned Forgot Password */}
                                <Box sx={{ textAlign: 'right' }}>
                                    <Link component={RouterLink} to="/forgot-password" underline="none" color="primary">
                                        Forgot Password?
                                    </Link>
                                </Box>

                                {/* Submit Button */}
                                <MuiButton loading={isSubmitting} type="submit" fullWidth size="large">
                                    Login
                                </MuiButton>

                                {/* Sign Up */}
                                <Typography align="center" variant="body2">
                                    Don't have an account?{' '}
                                    <Link component={RouterLink} to="/register" underline="none" color="primary">
                                        Sign up
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

export default Login;