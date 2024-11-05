import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const api_register = import.meta.env.VITE_BACKEND_REGISTER;; // Your signup API endpoint

const FacebookSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Enter your full name'),
    email: Yup.string().email('Invalid email').required('Enter your email'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Enter your password'),
    birthday: Yup.string().required('Enter your birthday'),
    gender: Yup.string().required('Select your gender'),
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      birthday: '',
      gender: '',
    },
    validationSchema,
    onSubmit: async (value) => {
      setLoading(true);
      try {
        const response = await axios.post(api_register, value);
        if (response.status === 201) {
          toast.success("Account created successfully!");
          navigate("/facebook"); // Redirect to home page
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error(error?.response?.data?.detail || "Signup failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-[#e9eff6]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        {/* Facebook Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/Facebook-Logo-2019.png" // Full Facebook logo PNG URL
            alt="Facebook Logo"
            className="h-10"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {touched.name && errors.name && <div className="text-red-500">{errors.name}</div>}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}

          <div className="flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="birthday" className="text-gray-700">Birthday</label>
              <input
                type="date"
                className="p-3 border border-gray-300 rounded-lg"
                name="birthday"
                value={values.birthday}
                onChange={handleChange}
              />
              {touched.birthday && errors.birthday && <div className="text-red-500">{errors.birthday}</div>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="gender" className="text-gray-700">Gender</label>
              <select
                name="gender"
                className="p-3 border border-gray-300 rounded-lg"
                value={values.gender}
                onChange={handleChange}
              >
                <option value="" label="Select gender" />
                <option value="female" label="Female" />
                <option value="male" label="Male" />
                <option value="other" label="Other" />
              </select>
              {touched.gender && errors.gender && <div className="text-red-500">{errors.gender}</div>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          By clicking Sign Up, you agree to our 
          <a href="#" className="text-blue-600"> Terms, Data Policy</a> 
          and 
          <a href="#" className="text-blue-600"> Cookie Policy</a>.
        </p>

        <p className="text-center text-gray-600 mt-2">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600">Log in</a>
        </p>

        {/* Footer text */}
        <footer className="text-center text-gray-500 mt-4">
          <p>&copy; {new Date().getFullYear()} Facebook</p>
        </footer>
      </div>
    </div>
  );
};

export default FacebookSignup;
