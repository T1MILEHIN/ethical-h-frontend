import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FetchTemplate = ({templateName}) => {
    const { token } = useContext(AuthContext);
    const [Component, setComponent] = useState(null);
    const { data, error, isLoading } = useQuery(
        {
            queryKey: ["fetchTemplate", templateName, token],
            queryFn: async ({queryKey}) => {
                const response = await axios.get(`http://127.0.0.1:8000/api/get-template/${queryKey[1]}/`, {
                    headers: {
                        Authorization: `Bearer ${queryKey[1].access}`,
                    },
                });
                return response.data.template;
            },
            enabled: !!templateName,
        }
    )

    useEffect(() => {
        if (data && !error) {
            const DynamicComponent = new Function(`return ${data}`)();
            setComponent(() => DynamicComponent);
        }
    }, [data, error]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading template.</div>;

    return Component ? <Component /> : <div>Template not found or inaccessible.</div>;
};

export default FetchTemplate;
