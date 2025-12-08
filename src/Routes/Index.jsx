import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Auth/Login"
import Register from "../Pages/Auth/Register"

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
        </Routes>
    )
}

export default RouteComponent;