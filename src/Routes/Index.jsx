import { Suspense } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Login from "../Pages/Auth/Login"
import Register from "../Pages/Auth/Register"
import ForgotPassword from "../Pages/Auth/ForgotPassword"
import ResetPassword from "../Pages/Auth/ResetPassword"
import { useSelector } from "react-redux"
import DashboardPage from "../Pages/Dashboard/DashboardView"
import AuthLayout from "../Layouts/AuthLayout"
import DashboardLayout from "../Layouts/DashboardLayout"
import Loader from "../Components/Loader/Loader"

const RequireAuth = (isAuthenticated) => {
    let location = useLocation();
    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <DashboardLayout />
        </Suspense>
    );
}

const StrictlyNotRequireAuth = (isAuthenticated) => {
    let location = useLocation();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" state={{ from: location }} />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <AuthLayout />
        </Suspense>
    );
}
const RouteComponent = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated);
    return (
        <Routes>
            <Route element={<StrictlyNotRequireAuth isAuthenticated={isAuthenticated} />}>
                <Route
                    path="/"
                    name="Login"
                    element={
                        <Suspense fallback="<div>Loading</div>">
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path="/register"
                    name="Register"
                    element={
                        <Suspense fallback="<div>Loading</div>">
                            <Register />
                        </Suspense>
                    }
                />
                <Route
                    path="/forgot-password"
                    name="Forgot password"
                    element={
                        <Suspense fallback="<div>Loading</div>">
                            <ForgotPassword />
                        </Suspense>
                    }
                />
                <Route
                    path="/reset-password/:token"
                    name="Reset password"
                    element={
                        <Suspense fallback="<div>Loading</div>">
                            <ResetPassword />
                        </Suspense>
                    }
                />
            </Route>
            <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
                <Route
                    path="/dashboard"
                    name="Dashboard"
                    element={
                        <Suspense fallback={<Loader />}>
                            <DashboardPage />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}

export default RouteComponent;