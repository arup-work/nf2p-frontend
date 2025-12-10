import { Box, FormGroup, TextField, Typography } from "@mui/material"
import StyledAuthLayout from "../../Components/StyledAuthLayout"
import { Form, Formik } from "formik";
import { LoginValidator } from "../../Shared/Validator";
import MuiButton from "../../Components/MUI/MuiButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../Helpers/Utils/ToastUtils";

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get the message sent from Register page
    const successMessage = location.state?.successMessage;

    const handleFormSubmit = async (values, { setSubmitting }) => {
        const { email, password } = values;
        const response = await AuthService.login(email, password);
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
    },[location.state])

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
                            <Box className="pt-d">
                                <MuiButton loading={isSubmitting} type="submit" fullWidth size="large">
                                    Login
                                </MuiButton>
                                <Typography className="desc mt">
                                    Does not have an account?{' '}
                                    <Link className="no-underline color-primary" to="/register">Sign up</Link>
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