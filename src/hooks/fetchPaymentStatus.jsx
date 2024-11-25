import axios from 'axios'
import { useQuery } from '@tanstack/react-query';

const paymentStatus = import.meta.env.VITE_PAYMENT_STATUS;

const FetchPaymentStatus = () => {
    return useQuery({
        queryKey: ['payment-status'],
        queryFn: () => axios.get(paymentStatus)
    })
}

export default FetchPaymentStatus