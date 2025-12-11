import { Box, FormGroup, TextField, Typography, Link } from "@mui/material"
import StyledAuthLayout from "../../Components/StyledAuthLayout"
import { Form, Formik } from "formik";
import { RegisterValidator } from "../../Shared/Validator";
import MuiButton from "../../Components/MUI/MuiButton";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";

const initialValues = {
    name: '',
    email: '',
    password: ''
}

const Register = () => {
    const navigate = useNavigate();
    const handleFormSubmit = async (values, { setSubmitting, setFieldValue }) => {
        setSubmitting(true);
        try {
            const { name, email, password } = values;
            const response = await AuthService.register(name, email, password);
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
            <Typography variant="h5" gutterBottom align="center">
                Register
            </Typography>
            <Formik initialValues={initialValues} validationSchema={RegisterValidator} onSubmit={handleFormSubmit}>
                {({ values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting }) => {
                    return (
                        <Form noValidate onSubmit={handleSubmit} className="mt-d">
                            <FormGroup>
                                <label className="mb-h" htmlFor="name">
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
                            <Box sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <MuiButton loading={isSubmitting} type="submit" fullWidth size="large">
                                    Login
                                </MuiButton>
                                <Typography align="center" variant="body2">
                                    Already have an account?{' '}
                                    <Link component={RouterLink} to="/" underline="none" color="primary">Login</Link>
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