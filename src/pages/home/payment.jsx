import React from 'react'
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

const Payment = () => {
  return (
    <div className='py-10'>
      <div className="md:w-[600px] w-[80%] mx-auto">
        <h1 className='text-xl md:text-3xl my-4'>Select your Plan</h1>
        <Select>
          <SelectTrigger className="w-full mx-auto">
            <SelectValue placeholder="Select a your Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Plans</SelectLabel>
              <SelectItem value="W">Weekly -- N10,000</SelectItem>
              <SelectItem value="M">Monthly -- N50,000</SelectItem>
              <SelectItem value="Y">Yearly -- N120,000</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="w-full my-4">Pay</Button>
      </div>
    </div>
  )
}

export default Payment