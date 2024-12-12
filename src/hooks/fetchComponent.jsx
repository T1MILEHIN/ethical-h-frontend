import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik'
import { toast } from 'sonner';
import * as Yup from 'yup';
import * as Babel from '@babel/standalone';
import Loader from '../components/loader';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";

const FetchComponent = (templateName) => {
    const { user, token } = useContext(AuthContext);
    return useQuery(
        {
            queryKey: ["fetchTemplate", templateName, token],
            queryFn: async ({queryKey}) => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/get-component/${queryKey[1]}`);
                    const componentCode = await response.data;
    
                    const output = Babel.transform(componentCode, { presets: ["react", "env"] }).code;
    
                    const WrappedComponent = new Function("React", "Helmet", "useState", "useContext", "Link", "useNavigate", "axios", "useMutation", "useFormik", "toast", "Yup", "user", "token", "AuthContext", "jwtDecode", "Loader", "FaCheck", "FaXmark", "FcGoogle", "GrApple", "universalAccess", "paymentConfirmationUrl",`
                        ${output}
                        return ${queryKey[1].charAt(0).toUpperCase()}${queryKey[1].slice(1)};
                    `)(React, Helmet, useState, useContext, Link, useNavigate, axios, useMutation, useFormik, toast, Yup, user, token, AuthContext, jwtDecode, Loader, FaCheck, FaXmark, FcGoogle, GrApple, universalAccess, paymentConfirmationUrl);

                    return WrappedComponent;
                } catch (error) {
                    console.error("Error loading component:", error);
                }
            },
            enabled: !!templateName,
        }
    )
};

export default FetchComponent;
