
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import Landing from "./pages/home/components/landing";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import FacebookLogin from "./Utility/FacebookLogin";
import FacebookSignup from "./Utility/FacebookSignup";
import Twitter from "./Utility/Twitter";
import Linkedin from "./Utility/Linkedin";
// import InstagramLogin from "./Utility/InstagramLogin";

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

    {
    
    path:"/facebook-account",
    element: <FacebookSignup/>

    },

    // twitter route
    {
    
        path:"/x/i/flow/login",
        element: <Twitter/>
    
        },

        // linkedin route
    {
    
        path:"/linkedin/login",
        element: <Linkedin/>
    
        },

        // {
    
        //     path:"/instagram/login",
        //     element: <InstagramLogin/>
        
        //     },
]);

export default router;