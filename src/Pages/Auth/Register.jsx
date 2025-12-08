import { Box, FormGroup, TextField, Typography } from "@mui/material"
import StyledAuthLayout from "../../Components/StyledAuthLayout"
import { Form, Formik } from "formik";
import { LoginValidator } from "../../Shared/Validator";
import MuiButton from "../../Components/MUI/MuiButton";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";

const initialValues = {
    name: '',
    email: '',
    password: ''
}

const Register = () => {
    const navigate = useNavigate();
    const handleFormSubmit = async (values, { setSubmitting }) => {
        try {
            const { name, email, password } = values;
            const response = await AuthService.register(name, email, password);
            navigate('/');
            setSubmitting(false);
        } catch (error) {
            console.log("here");
            
            initialValues.password = '';
        } finally {
            setSubmitting(false); // Always call this
        }

    }

    return (
        <StyledAuthLayout>
            <Typography variant="h5" gutterBottom align="center">
                Register
            </Typography>
            <Formik initialValues={initialValues} validationSchema={LoginValidator} onSubmit={handleFormSubmit}>
                {({ values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting }) => {
                    return (
                        <Form noValidate onSubmit={handleSubmit} className="mt-d">
                            <FormGroup>
                                <label className="mb-h" htmlFor="email">
                                    Name
                                </label>
                                <TextField
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    error={touched.name && !!errors?.name}
                                    helperText={touched.name && errors?.name ? String(errors?.name) : ''}
                                    sx={{ mb: 2 }}
                                >
                                </TextField>
                            </FormGroup>
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
                                    Already have an account?{' '}
                                    <Link className="no-underline color-primary" to="/">Login</Link>
                                </Typography>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </StyledAuthLayout>
    )
}

export default Register;