import { FaGoogle } from "react-icons/fa"
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
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import ThemeSwitch from "../../components/theme-switch";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { PasswordInput } from "../../components/custom/password-input";

const api_login = import.meta.env.VITE_BACKEND_LOGIN;


const Login = () => {
    const navigate = useNavigate()
    const {user, setUser, setToken} = useContext(AuthContext)
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Enter Your Email Address'),
        password: Yup.string().required("Enter Your Password")
    })
    const loginMutation = useMutation({
        mutationFn: async (data) => {
            try {
                const response = await axios.post(api_login, data);
                if (response.status === 200) {
                    const decoded = jwtDecode(response?.data?.access);
                    setUser(decoded);
                    setToken(response?.data);
                    localStorage.setItem("tokens", JSON.stringify(response.data));
                    localStorage.setItem("user", JSON.stringify(decoded));
                    navigate("/")
                    toast.success("Welcome to ETHICAL-H")
                }
            } catch (error) {
                toast.error(error?.response?.data?.detail)
            }
        }
    })

    const { handleSubmit, handleChange, values, touched, errors, is } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: value => {
            loginMutation.mutate(value)
        }
    })
    
    if (user) return <Navigate to="/" />

    return (
        <>
            {(loginMutation.isPending) &&
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
                <div className={`w-full sm:max-w-[400px] md:flex-[2] md:p-6 p-3 bg-transparent md:rounded-md`}>
                    <div className="flex items-center md:justify-between">
                        <div className='font-bold text-xl text-white'>
                            ETHICAL-H
                        </div>
                        <ThemeSwitch />
                    </div>
                    <p className="font-normal text-blue-500 my-1">Welcome Back!</p>
                    <p className="text-sm text-white font-normal jost">Enter Your details to continue</p>
                    <form onSubmit={handleSubmit}>
                        <div className="my-2">
                            <label className="font-" htmlFor="email">
                                <p className="text-white">Email</p>
                                <div className="relative">
                                    <Input name="email" id="email" value={values.email} onChange={handleChange} type="text" placeholder='1234567@gmail.com' />
                                    {(touched.email && errors.email) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.email && <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-2">
                            <label className="font-" htmlFor="password">
                                <p className="text-white">Password</p>
                                <div className="relative">
                                    <PasswordInput name="password" id="password" value={values.password} onChange={handleChange} placeholder='Password' />
                                    {(touched.password && errors.password) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.password && <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <p className="text-right my-1 font-medium text-white"><Link to="/auth/forgotPassword">Forgot Password?</Link></p>
                        <Button type="submit" className="w-full">{"Login"}</Button>
                        <p className='text-center font-extralight py-1'>or</p>
                    </form>
                    <div className='login-options flex flex-col gap-3 font-medium'>
                        <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl py-2 bg-black text-white hover:bg-black hover:text-white duration-300'><FaGoogle />Continue with Google</button>
                    </div>
                    <p className="text-sm md:text-base mt-4 font-medium text-white jost">Don&apos;t have an account? <Link className="underline underline-offset-2 text-blue-500" to="/register">Create Account</Link></p>
                </div>
            </motion.section>
        </>
    )
}

export default Login