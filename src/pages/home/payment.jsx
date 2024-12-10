import React, { useState, useContext } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FetchAccountDetails from '../../hooks/fetchAccountDetails';
import FetchPaymentStatus from '../../hooks/fetchPaymentStatus';
import { AuthContext } from '../../context/authContext';

const Payment = () => {
  const { user } = useContext(AuthContext);
  const { data } = FetchAccountDetails()
  const { data: status } = FetchPaymentStatus()
  const [paymentPlan, setPaymentPlan] = useState("");

  const handleSelectChange = (value) => {
    setPaymentPlan(value);
  }

  return (
    <div className='py-10'>
      {status?.data.find((u) => u.user === user?.user_id) ? (
        <h1 className='text-center'>You already have an active plan</h1>
      )
        :
        (
          <div className="md:w-[600px] w-[80%] mx-auto">
            <h1 className='text-xl md:text-3xl my-4'>Select your Plan</h1>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full mx-auto">
                <SelectValue placeholder="Select a your Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Plans</SelectLabel>
                  <SelectItem value={`Weekly -- N${(data?.data?.weekly_plan)}`}>Weekly -- N{(data?.data?.weekly_plan)}</SelectItem>
                  <SelectItem value={`Monthly -- N${(data?.data?.monthly_plan)}`}>Monthly -- N{(data?.data?.monthly_plan)}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full my-4">Pay</Button>
              </PopoverTrigger>
              <PopoverContent className="w-96">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Payment Details</h4>
                    <p className="text-sm text-muted-foreground">
                      Make your payment to the account below and forward your receipt to the Telegram Account.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <p>Account Number</p>
                      <p>{data?.data?.account_number}</p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <p>Account Name</p>
                      <p>{data?.data?.account_name}</p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <p>Payment Plan</p>
                      <p>{paymentPlan || 'Select a plan'}</p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <p>Telegram Link</p>
                      <p className='text-blue-500 underline'><Link target='_blank' to={data?.data?.telegram_link}>{data?.data?.telegram_link}</Link></p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

    </div>
  )
}

export default Payment