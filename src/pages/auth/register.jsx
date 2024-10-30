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
import Loader from "../../components/loader";

const api_register = import.meta.env.VITE_BACKEND_REGISTER;

const url_access = import.meta.env.VITE_universal_access

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
    const [loading, setLoading] = useState(false)
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
            setLoading(true)
            try {
                const response = await axios.post(api_register, data)
                if (response.status === 201) {
                    toast.success("Welcome fellow hacker");
                    setLoading(false)
                    navigate("/login");
                }
            } catch (error) {
                setLoading(false)
                toast.error(error?.response?.data?.detail)
            }
        }
    })
    const { handleSubmit, handleChange, handleBlur, values, touched, errors, resetForm } = useFormik({
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

    useEffect(() => {
        Object.keys(errors).forEach((field) => {
            if (errors[field]) {
                toast.error(errors[field]);
            }
        });
    }, [errors, touched])

    return (
        <>
            {(loading) && 
                <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
                    <Loader />
                </div>
            }
            <motion.section className="overflow-hidden min-h-screen flex items-end md:items-center justify-center">
                <div className="bg-white overflow-hidden w-full md:w-[500px] md:py-4 md:px-4 p-4 bg-transparent rounded-tl-[60px] rounded-tr-[60px] md:rounded-md">
                    <div className="flex items-center justify-between">
                        <div className="font-bold text-xl">ETHICAL-H</div>
                    </div>
                    <p className="font-normal">Please fill in your details to get started</p>
                    <form onSubmit={handleSubmit}>
                        <div className="my-4">
                            <label className="font-light" htmlFor="username">
                                Username
                                <div className="relative">
                                    <input
                                        name="username"
                                        type="text"
                                        id="username"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        className={`text-base pl-2 h-10 rounded-md w-full border ${(touched.username && errors.username) ? "border-red-500" : touched.username && "border-green-500"} border-black`}
                                        placeholder="Enter Your Username"
                                    />
                                    {(touched.username && errors.username) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.username &&  <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-4">
                            <label className="font-light" htmlFor="email">
                                Email Address
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={`text-base pl-2 h-10 rounded-md w-full border ${(touched.email && errors.email) ? "border-red-500" : touched.email && "border-green-500"} border-black`}
                                        placeholder="Enter Your Email"
                                    />
                                    {(touched.email && errors.email) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.email &&  <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-4">
                            <label className="font-light" htmlFor="password">
                                Password
                                <div className="relative">
                                    <input
                                        name="password"
                                        type="password"
                                        id="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        className={`text-base pl-2 h-10 rounded-md w-full border ${(touched.password && errors.password) ? "border-red-500" : touched.password && "border-green-500"} border-black`}
                                        placeholder="Enter Your Password"
                                    />
                                    {(touched.password && errors.password) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.password &&  <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <div className="my-4">
                            <label className="font-light" htmlFor="confirmpassword">
                                Confirm-password
                                <div className="relative">
                                    <input
                                        name="confirmpassword"
                                        type="password"
                                        id="confirmpassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmpassword}
                                        className={`text-base pl-2 h-10 rounded-md w-full border ${(touched.confirmpassword && errors.confirmpassword) ? "border-red-500" : touched.confirmpassword && "border-green-500"} border-black `}
                                        placeholder="Confirm Your Password"
                                    />
                                    {(touched.confirmpassword && errors.confirmpassword) ? <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" /> : touched.confirmpassword &&  <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </label>
                        </div>
                        <p onClickCapture={() => setOptional(prev => !prev)} className="cursor-pointer flex items-center gap-2 font-semibold md:text-base text-sm md:my-4">
                            Optional Information {optional ? <FaChevronUp /> : <FaChevronDown size={10} />}
                        </p>
                        <AnimatePresence>
                            {optional &&
                                <motion.div variants={optionalVariant} animate={optional ? "animate" : "initial"} exit="exit" className="origin-top overflow-hidden">
                                    <motion.div variants={optionalInputs} className="my-4">
                                        <label className="font-light" htmlFor="first_name">
                                            First Name
                                            <input
                                                name="firstname"
                                                type="text"
                                                id="firstname"
                                                value={values.firstname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`text-base pl-2 h-10 rounded-md w-full border border-black`}
                                            />
                                        </label>
                                    </motion.div>
                                    <motion.div variants={optionalInputs} className="my-4">
                                        <label className="font-light" htmlFor="last-name">
                                            Last Name
                                            <input
                                                name="lastname"
                                                type="text"
                                                id="lastname"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.lastname}
                                                className={`text-base pl-2 h-10 rounded-md w-full border border-black`}
                                            />
                                        </label>
                                    </motion.div>
                                </motion.div>}
                        </AnimatePresence>
                        <button
                            type={"submit"}
                            className="w-full flex items-center justify-center rounded-xl hover:text-black border-2 hover:bg-transparent border-black duration-300 bg-black py-2 font-semibold text-white text-base md:text-2xl mb-2"
                        >
                            Create Account
                            {/* {isSubmitting ? <span className="loading loading-dots loading-lg"></span> : "Create Account"} */}
                        </button>
                    </form>
                    <div className="login-options flex flex-col gap-3 font-medium">
                        <button className="flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl py-2 hover:bg-black hover:text-white duration-300">
                            <FaGoogle />
                            Continue with Google
                        </button>
                    </div>
                    <p className="text-sm md:text-base mt-4 font-semibold ">
                        Already have an account?{" "}
                        <Link
                            className="underline underline-offset-2 text-black"
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