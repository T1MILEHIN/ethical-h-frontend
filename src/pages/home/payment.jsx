import React, { useState } from 'react'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Payment = () => {
  const [paymentPlan, setPaymentPlan] = useState("");

  const handleSelectChange = (value) => {
    setPaymentPlan(value);
    console.log("Selected Payment Plan:", value);
  }
  
  return (
    <div className='py-10'>
      <div className="md:w-[600px] w-[80%] mx-auto">
        <h1 className='text-xl md:text-3xl my-4'>Select your Plan</h1>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full mx-auto">
            <SelectValue placeholder="Select a your Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Plans</SelectLabel>
              <SelectItem value="Weekly -- N10,000">Weekly -- N10,000</SelectItem>
              <SelectItem value="Monthly -- N50,000">Monthly -- N50,000</SelectItem>
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
                  <p>758246584789</p>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <p>Payment Plan</p>
                  <p>{paymentPlan || 'Select a plan'}</p>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <p>Telegram Link</p>
                  <p>url goes here</p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default Payment