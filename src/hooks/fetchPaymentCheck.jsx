import axios from 'axios'
import { useQuery } from '@tanstack/react-query';

const paymentStatusCheck = import.meta.env.VITE_PAYMENT_CHECK;

const fetchPaymentCheck = (id) => {
    return useQuery({
        queryKey: ['payment-status-check'],
        queryFn: () => axios.get(`${paymentStatusCheck}${id}`)
    })
}

export default fetchPaymentCheck