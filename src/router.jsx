
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import Landing from "./pages/home/components/landing";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                index: true,
                element: <Landing />
            }
        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
]);

export default router;