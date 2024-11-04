import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
const fetch_packages = import.meta.env.VITE_GET_COMPONENT;

function fetchComponent(packageName) {
    return useQuery({
        queryKey: ["package-name", packageName],
        queryFn: async({queryKey})=> {
            const response = await axios.get(`${fetch_packages}${queryKey[1]}`);
            console.log(response)
            if (response.status !== 200) {
                throw new Error("Component not found");
            }
            const componentCode = await response?.data.text();
            return componentCode;
        }
    })  
}

export default fetchComponent;
