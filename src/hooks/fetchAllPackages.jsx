import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
const fetch_all_packages = import.meta.env.VITE_FETCH_ALL_PACKAGES;

function fetchAllPackages() {
    return useQuery({
        queryKey: ['all-packages'],
        queryFn: ()=> axios.get(`${fetch_all_packages}`)
    })
}

export default fetchAllPackages;