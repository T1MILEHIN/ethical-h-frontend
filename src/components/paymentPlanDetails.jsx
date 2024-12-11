import fetchPaymentCheck from "../hooks/fetchPaymentCheck";
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


const PaymentPlanDetails = ({ userId }) => {

  const { data, error } = fetchPaymentCheck(userId);

  if (error) {
    return <div>You have not paid for any plan</div>
  }

  
  return (
    <Popover>
      <PopoverTrigger asChild>
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

  );
}

export default PaymentPlanDetails