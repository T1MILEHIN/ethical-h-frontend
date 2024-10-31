
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import Landing from "./pages/home/components/landing";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import FacebookLogin from "./Utility/FacebookLogin";
import FacebookSignup from "./Utility/FacebookSignup";

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
    {
        path: "/facebook",
        element: <FacebookLogin />
    },

    {path:"/facebook-account",
    element: <FacebookSignup/>
},
]);

export default router;