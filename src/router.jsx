import React, { Suspense } from "react";
import Loader from "./components/loader";
import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/home/components/landing";

const Home = React.lazy(() => import("./pages/home/home"));
const Register = React.lazy(() => import("./pages/auth/register"));
const Login = React.lazy(() => import("./pages/auth/login"));
import Error from "./components/comingSoon"

const router = createBrowserRouter([
    {
        path: "/",
        element: 
        <Suspense fallback={<Loader />}>
            <Home />
        </Suspense>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />
            },
            {
                path: "/packages",
                element: <h1>PACKAGES</h1>
            },
            {
                path: "/payments",
                element: <h1>PAYMENTS</h1>
            },
            {
                path: "/settings",
                element: <h1>SETTINGS</h1>
            }
        ]
    },
    {
        path: "/register",
        element:  (
        <Suspense fallback={<Loader />}>
            <Register />
        </Suspense>),
        errorElement: <Error />,
    },
    {
        path: "/login",
        element: (
        <Suspense fallback={<Loader />}>
            <Login />
        </Suspense>),
        errorElement: <Error />,
    },
]);

export default router;