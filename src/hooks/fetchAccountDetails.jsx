import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
const fetch_account_details = import.meta.env.VITE_ACCOUNT_DETAILS;

function fetchAccountDetails() {
    return useQuery({
        queryKey: ['account-details'],
        queryFn: ()=> axios.get(`${fetch_account_details}`)
    })
}

export default fetchAccountDetails;