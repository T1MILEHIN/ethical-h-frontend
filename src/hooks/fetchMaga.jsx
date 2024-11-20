import React, { useContext } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/authContext';
const fetch_data = import.meta.env.VITE_FETCH_MMM;

const FetchMaga = () => {
    const { user } = useContext(AuthContext)
    return useQuery({
        queryKey: ['maga'],
        queryFn: () => axios.get(`${fetch_data}?user_id=${user?.user_id}`)
    })
}

export default FetchMaga