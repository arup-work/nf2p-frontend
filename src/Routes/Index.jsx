import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Auth/Login"
import Register from "../Pages/Auth/Register"
import ForgotPassword from "../Pages/Auth/ForgotPassword"
import ResetPassword from "../Pages/Auth/ResetPassword"

const RouteComponent = () => {
    return (
        <Routes>
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
        </Routes>
    )
}

export default RouteComponent;