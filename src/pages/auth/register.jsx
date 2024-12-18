import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Navigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from "../../context/authContext";
import ThemeSwitch from "../../components/theme-switch";
import Loader from "../../components/loader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { PasswordInput } from "../../components/custom/password-input";

import img from "../../assets/images/logo2.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const api_register = import.meta.env.VITE_BACKEND_REGISTER;
const google_auth_url = import.meta.env.VITE_GOOGLE_AUTH_URL;
const google_auth_id = import.meta.env.VITE_CLIENT_ID;

const optionalVariant = {
    initial: {
        height: 0,
        opacity: 0
    },
    animate: {
        height: 170,
        opacity: 1,
        transition: {
            type: "spring", duration: 0.8, stiffness: 250, delayChildren: 0.3, staggerChildren: 0.2
        },
    },
    exit: {
        height: 0,
        opacity: 0
    }
}

const optionalInputs = {
    initial: {
        opacity: 0,
        left: "-100px",
    },
    animate: {
        opacity: 1,
        left: 0
    }
}

const Register = () => {
    const navigate = useNavigate();
    const { user, setUser, setToken } = useContext(AuthContext)
    const [optional, setOptional] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const validationSchema = Yup.object({
        username: Yup.string().min(5, 'Must be 5 characters or more').required('Enter Your Username'),
        firstname: Yup.string(),
        lastname: Yup.string(),
        email: Yup.string().email('Invalid email address').required('Enter Your Email Address'),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("please provide a password"),
        confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("please provide a password"),
    })
    const registerMutaton = useMutation({
        mutationFn: async (data) => {
            try {
                const response = await axios.post(api_register, data)
                if (response.status === 201) {
                    toast.success("Welcome fellow hacker");
                    navigate("/login");
                }
            } catch (error) {
                toast.error(error?.message)
            }
        }
    })
    const { handleSubmit, handleChange, handleBlur, values, touched, errors, resetForm, validateForm } = useFormik({
        initialValues: {
            email: '',
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            confirmpassword: ''
        },
        validationSchema,
        onSubmit: async (value) => {
            const formData = new FormData();
            formData.append("email", value.email)
            formData.append("username", value.username)
            formData.append("firstname", value.firstname)
            formData.append("lastname", value.lastname)
            formData.append("password", value.password)
            registerMutaton.mutate(formData)
        },
        validateOnBlur: true,
        validateOnChange: true
    });

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
            const user = {
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
                setUser(user);
                setToken(token);
                localStorage.setItem("tokens", JSON.stringify(token));
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/")
                toast.success("Welcome to X-Shark")
            }
        } catch (error) {
            setGoogleLoading(false)
        }
    }

    useEffect(() => {
        google?.accounts.id.initialize({
            client_id: google_auth_id || "605198548741-b2q4afevqivu38bh875sj285fepq94g5.apps.googleusercontent.com",
            callback: handleSignInWithGoogle,
        });
        google?.accounts.id.renderButton(
            document.getElementById('signinDiv'),
            { theme: 'outline', size: 'large', text: 'continue_with', shape: 'square' }
        );
    }, [])

    if (user) return <Navigate to="/" />

    return (
        <>
            {(registerMutaton.isPending || googleLoading) &&
                <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
                    <Loader />
                </div>
            }
            <motion.section className="register overflow-hidden min-h-screen flex items-end md:items-center justify-center">
                <div className="hidden lg:block logo-animation">
                    <LazyLoadImage effect="blur" src={img} width={'100%'} height={'100px'} className="border-3" />
                </div>
                <div className="w-full sm:max-w-[400px] md:p-6 px-3 pb-2 bg-transparent">
                    <div className="flex items-center justify-between">
                        <div className="hidden lg:block text-2xl font-bold tracking-tight text-white">
                            <h1 className="md:text-4xl">X-Shark</h1>
                        </div>
                        <div className="block lg:hidden md:block logo-animation">
                            <LazyLoadImage effect="blur" src={img} width="50%" height="50px" />
                        </div>
                        <ThemeSwitch />
                    </div>
                    <p className="text-sm font-normal text-white my-1 jost">Please fill in your details to get started</p>
                    <form onSubmit={handleFormSubmit}>
                        <div className="">
                            <label className="font-light" htmlFor="username">
                                <p className="text-white text-sm mb-2">Username</p>
                                <div className="relative">
                                    <Input
                                        name="username"
                                        type="text"
                                        id="username"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        className={`${(touched.username && errors.username) ? "border-red-500" : touched.username && "border-green-500"} border-black text-white`}
                                        placeholder="Enter Your Username"
                                    />
                                    {(touched.username && errors.username) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.username && <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-2">
                            <label className="font-light" htmlFor="email">
                                <p className="text-white text-sm mb-2">Email Address</p>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={` ${(touched.email && errors.email) ? "border-red-500" : touched.email && "border-green-500"} border-black text-white`}
                                        placeholder="Enter Your Email"
                                    />
                                    {(touched.email && errors.email) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.email && <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-2">
                            <label className="font-light" htmlFor="password">
                                <p className="text-white text-sm mb-2">Password</p>
                                <div className="relative">
                                    <PasswordInput
                                        name="password"
                                        id="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        className={` ${(touched.password && errors.password) ? "border-red-500" : touched.password && "border-green-500"} border-black text-white`}
                                        placeholder="Enter Your Password"
                                    />
                                    {(touched.password && errors.password) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.password && <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-2">
                            <label className="font-light" htmlFor="confirmpassword">
                                <p className="text-white text-sm mb-2">Confirm-password</p>
                                <div className="relative">
                                    <PasswordInput
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmpassword}
                                        className={` ${(touched.confirmpassword && errors.confirmpassword) ? "border-red-500" : touched.confirmpassword && "border-green-500"} border-black text-white`}
                                        placeholder="Confirm Your Password"
                                    />
                                    {(touched.confirmpassword && errors.confirmpassword) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.confirmpassword && <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <p onClickCapture={() => setOptional(prev => !prev)} className="my-2 text-white cursor-pointer flex items-center gap-2 font-semibold text-sm">
                            Optional Information {optional ? <FaChevronUp /> : <FaChevronDown size={10} />}
                        </p>
                        <AnimatePresence>
                            {optional &&
                                <motion.div variants={optionalVariant} animate={optional ? "animate" : "initial"} exit="exit" className="origin-top overflow-hidden">
                                    <motion.div variants={optionalInputs} className="">
                                        <label className="font-light" htmlFor="first_name">
                                            <p className="text-white">First Name</p>
                                            <Input
                                                name="firstname"
                                                type="text"
                                                id="firstname"
                                                value={values.firstname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </label>
                                    </motion.div>
                                    <motion.div variants={optionalInputs} className="my-2">
                                        <label className="font-light" htmlFor="last-name">
                                            <p className="text-white">Last Name</p>
                                            <Input
                                                name="lastname"
                                                type="text"
                                                id="lastname"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.lastname}
                                            />
                                        </label>
                                    </motion.div>
                                </motion.div>}
                        </AnimatePresence>
                        <Button type={"submit"} className="w-full">
                            Create Account
                        </Button>
                        <p className='text-sm text-center font-extralight py-1 text-white'>or</p>
                    </form>
                    <div className="w-full flex">
                        <div id="signinDiv" className="flex-1 login-options"></div>
                    </div>
                    <p className="text-xs mt-4 font-medium text-white jost">
                        Already have an account?{" "}
                        <Link className="underline underline-offset-2 text-blue-400" to="/login">
                            Log In
                        </Link>
                    </p>
                </div>
            </motion.section>
        </>
    )
}

export default Register