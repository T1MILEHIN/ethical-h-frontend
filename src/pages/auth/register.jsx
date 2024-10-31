import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { FaGoogle } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import { useMutation } from '@tanstack/react-query';
import ThemeSwitch from "../../components/theme-switch";
import Loader from "../../components/loader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { PasswordInput } from "../../components/custom/password-input";

const api_register = import.meta.env.VITE_BACKEND_REGISTER;

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
    const [optional, setOptional] = useState(false)
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
                toast.error(error?.response?.data?.detail)
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
        onSubmit: values => {
            console.log(values)
            registerMutaton.mutate(values)
            resetForm();
        },
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const errors = await validateForm();
        if (errors) {
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
    return (
        <>
            {(registerMutaton.isPending) && 
                <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
                    <Loader />
                </div>
            }
            <motion.section className="register overflow-hidden min-h-screen flex items-end md:items-center justify-center">
                <div className="bg-red-500 overflow-hidden w-full md:w-[500px] md:py-4 md:px-4 p-4 bg-transparent rounded-tl-[60px] rounded-tr-[60px] md:rounded-md">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold tracking-tight text-white">ETHICAL-H</div>
                        <ThemeSwitch  />
                    </div>
                    <p className="text-sm font-normal text-white my-1 jost">Please fill in your details to get started</p>
                    <form onSubmit={handleFormSubmit}>
                        <div className="">
                            <label className="font-light" htmlFor="username">
                                <p className="text-white">Username</p>
                                <div className="relative">
                                    <Input
                                        name="username"
                                        type="text"
                                        id="username"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        className={` ${(touched.username && errors.username) ? "border-red-500" : touched.username && "border-green-500"} border-black`}
                                        placeholder="Enter Your Username"
                                    />
                                    {(touched.username && errors.username) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.username &&  <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-2">
                            <label className="font-light" htmlFor="email">
                                <p className="text-white">Email Address</p>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={` ${(touched.email && errors.email) ? "border-red-500" : touched.email && "border-green-500"} border-black`}
                                        placeholder="Enter Your Email"
                                    />
                                    {(touched.email && errors.email) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.email &&  <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-2">
                            <label className="font-light" htmlFor="password">
                                <p className="text-white">Password</p>
                                <div className="relative">
                                    <PasswordInput
                                        name="password"
                                        type="password"
                                        id="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        className={` ${(touched.password && errors.password) ? "border-red-500" : touched.password && "border-green-500"} border-black`}
                                        placeholder="Enter Your Password"
                                    />
                                    {(touched.password && errors.password) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.password &&  <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-2">
                            <label className="font-light" htmlFor="confirmpassword">
                                <p className="text-white">Confirm-password</p>
                                <div className="relative">
                                    <PasswordInput
                                        name="confirmpassword"
                                        type="password"
                                        id="confirmpassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmpassword}
                                        className={` ${(touched.confirmpassword && errors.confirmpassword) ? "border-red-500" : touched.confirmpassword && "border-green-500"} border-black `}
                                        placeholder="Confirm Your Password"
                                    />
                                    {(touched.confirmpassword && errors.confirmpassword) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.confirmpassword &&  <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>-0
                        <p onClickCapture={() => setOptional(prev => !prev)} className="text-white cursor-pointer flex items-center gap-2 font-semibold md:text-base text-sm md:my-2">
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
                        <Button type={"submit"} className="w-full mb-2">
                            Create Account
                            {/* {isSubmitting ? <span className="loading loading-dots loading-lg"></span> : "Create Account"} */}
                        </Button>
                    </form>
                    <div className="login-options flex flex-col gap-3 font-medium">
                        <button className="flex items-center justify-center gap-2 border-[1px] border-black rounded-md py-2 hover:bg-black hover:text-white text-white duration-300">
                            <FaGoogle />
                            Continue with Google
                        </button>
                    </div>
                    <p className="text-sm md:text-base mt-4 font-medium text-white jost">
                        Already have an account?{" "}
                        <Link
                            className="underline underline-offset-2 text-blue-400"
                            to="/login"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </motion.section>
        </>
    )
}

export default Register