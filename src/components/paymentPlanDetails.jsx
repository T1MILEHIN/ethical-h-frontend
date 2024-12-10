import FetchPaymentCheck from "../hooks/fetchPaymentCheck";
import Loader from "./loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';

const PaymentPlanDetails = ({userId}) => {
    const {data, error, isError} = FetchPaymentCheck(userId);
  
    if (error) {
      return <div className="error-message">You have not paid for any plan</div>
    }

    console.log(error)
  
    return (
      <div>
        <Popover>
          <PopoverTrigger>
            <Button>Show Details</Button>
          </PopoverTrigger>
          < PopoverContent>
            <div className="relative bg-opacity-70 p-3 rounded-tl-lg">
              <h2 className="text-lg font-bold">Payment Plan Details</h2>
              <p><strong>User:</strong> {data?.data?.user}</p>
              <p><strong>Plan Type:</strong> {data?.data?.plan_type}</p>
              <p><strong>Start Date:</strong> {new Date(data?.data?.start_date).toLocaleString()}</p>
              <p><strong>End Date:</strong> {data?.data?.end_date ? new Date(data?.data?.end_date).toLocaleString() : "No end date"}</p>
              <p><strong>Remaining Duration:</strong> {data?.data?.duration_remaining}</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
    );
}

export default PaymentPlanDetails