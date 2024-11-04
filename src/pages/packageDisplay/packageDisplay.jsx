import axios from "axios";
import helmet from "helmet";
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import fetchComponent from '../../hooks/fetchComponent';
import { useFormik } from 'formik'
import { toast } from 'sonner';
import * as Yup from 'yup';
import * as Babel from '@babel/standalone';
import Loader from '../../components/loader';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from "../../context/authContext";
import { jwtDecode } from 'jwt-decode';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const universalAccess = import.meta.env.VITE_universal_access;
const paymentConfirmationUrl = import.meta.env.VITE_payment_confirmation;

const PackageDisplay = () => {
    const { user, token } = useContext(AuthContext);
    const { packageName } = useParams();
    // const { data } = fetchComponent(packageName)
    // console.log(data)
    const [Component, setComponent] = useState(null); 
    
    useEffect(() => {
        async function loadComponent() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/get-component/${packageName}`);
                const componentCode = await response.data;
                console.log(response)

                const output = Babel.transform(componentCode, { presets: ["react", "env"] }).code;

                const WrappedComponent = new Function("React", "useState", "useContext", "useNavigate", "axios", "useMutation", "useFormik", "toast", "Yup", "user", "token", "AuthContext", "jwtDecode", "Loader", "FaCheck", "FaXmark", `
                    ${output}
                    return FacebookLogin;
                `)(React, useState, useContext, useNavigate, axios, useMutation, useFormik, toast, Yup, user, token, AuthContext, jwtDecode, Loader, FaCheck, FaXmark, universalAccess, paymentConfirmationUrl);


                setComponent(() => WrappedComponent);
            } catch (error) {
                console.error("Error loading component:", error);
            }
        }

        loadComponent();
    }, [packageName]);

    return (
        <div>
            {Component ? <Component /> : <Loader />}
        </div>
    );
};

export default PackageDisplay;
