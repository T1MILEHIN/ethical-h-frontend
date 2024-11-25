import axios from "axios";
import { Helmet } from "react-helmet";
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik'
import { toast } from 'sonner';
import * as Yup from 'yup';
import * as Babel from '@babel/standalone';
import Loader from '../../components/loader';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from "../../context/authContext";
import { jwtDecode } from 'jwt-decode';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { IconPlanet } from '@tabler/icons-react'


const universalAccess = import.meta.env.VITE_universal_access;
const paymentConfirmationUrl = import.meta.env.VITE_payment_confirmation;
const fetchComponent = import.meta.env.VITE_GET_COMPONENT;

const PackageDisplay = () => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate()
    const { packageName, user_id } = useParams();
    const [Component, setComponent] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function loadComponent() {
            setLoading(true)
            try {
                const response = await axios.get(`${fetchComponent}${packageName}/${user?.user_id || user_id}/`);
                const componentCode = await response.data;

                console.log(`${packageName.charAt(0).toUpperCase()}${packageName.slice(1)}`)
                const output = Babel.transform(componentCode, { presets: ["react", "env"] }).code;

                const WrappedComponent = new Function("React", "Helmet", "useState", "useContext", "Link", "useParams", "useNavigate", "axios", "useMutation", "useFormik", "toast", "Yup", "user", "token", "AuthContext", "jwtDecode", "Loader", "FaCheck", "FaXmark", "FcGoogle", "GrApple", "IconPlanet", "universalAccess", "paymentConfirmationUrl", `
                    ${output}
                    return ${packageName.charAt(0).toUpperCase()}${packageName.slice(1)};
                `)(React, Helmet, useState, useContext, Link, useParams, useNavigate, axios, useMutation, useFormik, toast, Yup, user, token, AuthContext, jwtDecode, Loader, FaCheck, FaXmark, FcGoogle, GrApple, IconPlanet, universalAccess, paymentConfirmationUrl);

                setLoading(false)
                setComponent(() => WrappedComponent);
            } catch (error) {
                setLoading(false)
                console.error("Error loading component:", error);
            }
        }
        loadComponent();
    }, [packageName]);

    if (!Component) return <Loader component={true} />

    return (
        (loading ? 
            <Loader component={true} /> 
            :
            <div>
                {Component ?
                    <div>
                        <Component />
                    </div>
                    :
                    <Loader component={true} />
                }
            </div>
        )

    );
};

export default PackageDisplay;
