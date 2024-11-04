import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Babel from '@babel/standalone';
import fetchComponent from '../../hooks/fetchComponent';
import Loader from '../../components/loader';

const PackageDisplay = () => {
    const { packageName } = useParams();
    // const { data } = fetchComponent(packageName)
    // console.log(data)
    const [Component, setComponent] = useState(null); 
    
    // useEffect(() => {
    //     const fetchAndRenderComponent = async () => {
    //         try {
    //             const response = await fetch(`http://127.0.0.1:8000/api/get-component/${packageName}`);
    //             if (!response.ok) throw new Error("Component not found");
    //             const code = await response.text();
    //             console.log(code)
    //             var output = Babel.transform(code, { presets: ["react"] }).code;
    //             console.log(output)
    //             const wrappedCode = `
    //                 ${output}
    //                 return FacebookLogin;
    //             `;
    //             const DynamicComponent = new Function('React', wrappedCode)(React);

    //             setComponent(() => DynamicComponent);

    //             console.log(Component)
    //         } catch (error) {
    //             console.error("Error loading component:", error);
    //         }
    //     };

    //     fetchAndRenderComponent();
    // }, [packageName]);

    useEffect(() => {
        async function loadComponent() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/static/${packageName}.jsx`);
                const componentCode = await response.data;
                console.log(response)

                const output = Babel.transform(componentCode, { presets: ["react", "env"] }).code;

                const WrappedComponent = new Function("React", "useState", "useContext", "useNavigate", "axios", "useMutation", "AuthContext", "jwtDecode", "Loader", "FaCheck", "FaXmark", `
                    ${output}
                    return FacebookLogin;
                `)(React, useState, useContext, useNavigate, axios, useMutation, AuthContext, jwtDecode, Loader, FaCheck, FaXmark);

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
