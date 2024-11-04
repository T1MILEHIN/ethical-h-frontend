import React, { Suspense } from "react";
import Loader from "./components/loader";
import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/home/components/landing";

const Home = React.lazy(() => import("./pages/home/home"));
const AllPackages = React.lazy(() => import("./pages/home/allPackages"));
const Payment = React.lazy(() => import("./pages/home/payment"));
const Setting = React.lazy(() => import("./pages/home/settings"));
const Register = React.lazy(() => import("./pages/auth/register"));
const Login = React.lazy(() => import("./pages/auth/login"));
import Error from "./components/comingSoon"

import PackageDisplay from "./pages/packageDisplay/packageDisplay";

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
                element:  (
                <Suspense fallback={<Loader />}>
                    <AllPackages />
                </Suspense>)
            },
            {
                path: "/payments",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Payment />
                    </Suspense>)
            },
            {
                path: "/settings",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Setting />
                    </Suspense>)
            }
        ]
    },
    {
        path: ":packageName",
        element: <PackageDisplay />
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