import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'sonner';
import { useNavigate, Navigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import { useMutation } from '@tanstack/react-query';
import Loader from "../../components/loader";
import { jwtDecode } from "jwt-decode"
import { AuthContext } from "../../context/authContext";
import ThemeSwitch from "../../components/theme-switch";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { PasswordInput } from "../../components/custom/password-input";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import img from "../../assets/images/logo2.png";

const api_login = import.meta.env.VITE_BACKEND_LOGIN;

const google_auth_url = import.meta.env.VITE_GOOGLE_AUTH_URL;

const google_auth_id = import.meta.env.VITE_CLIENT_ID;


const Login = () => {
    const navigate = useNavigate()
    const [googleLoading, setGoogleLoading] = useState(false)
    const { user, setUser, setToken } = useContext(AuthContext)
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Enter Your Email Address'),
        password: Yup.string().required("Enter Your Password")
    })
    const loginMutation = useMutation({
        mutationFn: async (data) => {
            try {
                const response = await axios.post(api_login, data);
                if (response.status === 200) {
                    const decoded = jwtDecode(response?.data.access);
                    setUser(decoded);
                    setToken(response?.data);
                    localStorage.setItem("tokens", JSON.stringify(response?.data));
                    localStorage.setItem("user", JSON.stringify(decoded));
                    navigate("/")
                    toast.success("Welcome to X-Shark")
                }
            } catch (error) {
                toast.error(error?.response?.data?.detail)
            }
        }
    })

    const { handleSubmit, handleChange, values, touched, errors, validateForm } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: async (value) => {
            const formData = new FormData();
            formData.append("email", value.email)
            formData.append("password", value.password)
            loginMutation.mutate(formData)
        }
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((field) => {
                if (errors[field]) {
                    toast.error(errors[field]);
                }
            });
        }
        else {
            handleSubmit();
        }
    };

    const handleSignInWithGoogle = async (response) => {
        setGoogleLoading(true)
        try {
            const payload = response.credential
            const server_res = await axios.post(google_auth_url, { "access_token": payload })
            const USER = {
                user_id: server_res.data.id,
                wallet: server_res.data.wallet,
                email: server_res.data.email,
                username: server_res.data.full_name
            }
            const token = {
                access: server_res.data.access,
                refresh: server_res.data.refresh
            }
            if (server_res.status === 200) {
                setUser(USER);
                setToken(token);
                localStorage.setItem("tokens", JSON.stringify(token));
                localStorage.setItem("user", JSON.stringify(USER));
                navigate("/")
                toast.success("Welcome to X-Shark")
            }
        } catch (error) {
            setGoogleLoading(false)
        }
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: google_auth_id || "605198548741-b2q4afevqivu38bh875sj285fepq94g5.apps.googleusercontent.com",
            callback: handleSignInWithGoogle,
        });
        google.accounts.id.renderButton(
            document.getElementById('loginDiv'),
            { theme: 'outline', size: 'large', text: 'continue_with', shape: 'square' }
        );
    }, [])

    if (user) return <Navigate to="/" />

    return (
        <>
            {(loginMutation.isPending || googleLoading) &&
                <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
                    <Loader />
                </div>
            }
            <Toaster position="top-center"
                toastOptions={{
                    style: { color: 'white', background: '#6868c7', border: "none" },
                    className: 'my-toast',
                }} />
            <motion.section className="login overflow-hidden min-h-screen md:px-20 md:pt-10 flex items-end md:items-center justify-center">
                <div className="hidden lg:block logo-animation">
                    <LazyLoadImage effect="blur" src={img} width={'100%'} height={'100%'} className="border-3" />
                </div>
                <div className={`w-full sm:max-w-[500px] md:flex-[2] md:p-6 p-5 bg-transparent`}>
                    <div className="flex items-center md:justify-between">
                        <div className="hidden lg:block text-2xl font-bold tracking-tight text-white">
                            <h1 className="md:text-4xl">X-Shark</h1>
                        </div>
                        <div className="block lg:hidden md:block logo-animation">
                            <LazyLoadImage effect="blur" src={img} width="50%" height="100px" />
                        </div>
                        <ThemeSwitch />
                    </div>
                    <p className="font-normal text-blue-500 my-1">Welcome Back!</p>
                    <p className="text-sm text-white font-normal jost">Enter Your details to continue</p>
                    <form onSubmit={handleFormSubmit}>
                        <div className="my-2">
                            <label className="" htmlFor="email">
                                <p className="text-white text-sm mb-2">Email</p>
                                <div className="relative">
                                    <Input className="text-white" name="email" id="email" value={values.email} onChange={handleChange} type="text" placeholder='1234567@gmail.com' />
                                    {(touched.email && errors.email) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.email && <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-2">
                            <label className="" htmlFor="password">
                                <p className="text-white text-sm mb-2">Password</p>
                                <div className="relative">
                                    <PasswordInput className="text-white" name="password" id="password" value={values.password} onChange={handleChange} placeholder='Password' />
                                </div>
                            </label>
                        </div>
                        <p className="text-right my-2 font-light text-white text-xs"><Link to="/forgotPassword">Forgot Password?</Link></p>
                        <Button type="submit" className="w-full">{"Login"}</Button>
                        <p className='text-sm text-center font-extralight py-1 text-white'>or</p>
                    </form>
                    <div className="flex">
                        <div id="loginDiv" className='flex-1 login-options w-full'></div>
                    </div>
                    <p className="text-xs mt-4 font-light text-white jost">Don&apos;t have an account? <Link className="underline underline-offset-2 text-blue-500" to="/register">Create Account</Link></p>
                </div>
            </motion.section>
        </>
    )
}

export default Login