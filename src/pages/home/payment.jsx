import React, { useState, useContext } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FetchAllPackages from '../../hooks/fetchAllPackages';
import FetchAccountDetails from '../../hooks/fetchAccountDetails';
import FetchPaymentStatus from '../../hooks/fetchPaymentStatus';
import { AuthContext } from '../../context/authContext';
import Loader from '../../components/loader';

const Payment = () => {
  const { user } = useContext(AuthContext);
  const { data } = FetchAccountDetails()
  const { data: status } = FetchPaymentStatus();
  const { data: packages } = FetchAllPackages();
  const [packageDetails, setPackageDetails] = useState({
    selectedPackage: "",
    selectedPlan: "",
  })

  const handlePackageChange = (value) => {
    const selectedPackage = packages?.data?.find((pkg) => pkg.name === value);
    if (selectedPackage) {
      setPackageDetails((prevState) => ({
        ...prevState,
        selectedPackage: selectedPackage.name,
      }));
    }
  };

  const handlePlanChange = (value) => {
    setPackageDetails((prevState) => ({
      ...prevState,
      selectedPlan: value,
    }));
  };

  return (
    <div className="py-10">
      {packages?.data && status?.data ? (
        (() => {
          const paidPackages = status?.data.filter(
            (u) => u.user === user?.user_id
          )?.flatMap((u) => u?.package_paid_for);

          const totalPackages = packages.data.length;
          const uniquePaidPackages = new Set(paidPackages).size;

          if (uniquePaidPackages === totalPackages) {
            return (
              <h1 className="text-center text-green-500">
                🎉 You have paid for all available packages!
              </h1>
            );
          }

          if (uniquePaidPackages > 0) {
            return (
              <>
                <h1 className="text-center text-green-500">
                  ✅ You have paid for {uniquePaidPackages} out of {totalPackages} packages.
                </h1>
                <h1 className="text-center text-blue-500 my-4">
                  Would you like to pay for more?👇🏽
                </h1>
              </>
            );
          }

          return (
            <h1 className="text-center text-red-500">
              ⚠️ You have not paid for any packages yet.
            </h1>
          );
        })()
      ) : (
        <Loader />
      )}

      {packages?.data?.map((pkg) => {
        const hasPaid = status?.data.some(
          (u) => u.user === user?.user_id && u?.package_paid_for?.includes(pkg.id)
        );

        return (
          <h1 key={pkg.id} className="my-2">
            {hasPaid ? (
              <span className="text-green-500">✅ {pkg.name}</span>
            ) : (
              <span className="text-red-500">❌ {pkg.name} (Not Paid)</span>
            )}
          </h1>
        );
      })}
      {status?.data.find((u) => u.user === user?.user_id)?.package_paid_for?.length !==
        packages?.data?.length && (
          <div className="md:w-[600px] w-[95%] mx-auto">
            <h1 className="text-xl md:text-3xl my-4">Select your package & Plan</h1>
            <div className="mb-2">
              <Select className="" onValueChange={handlePackageChange}>
                <SelectTrigger className="w-full mx-auto">
                  <SelectValue placeholder="Select a package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Package</SelectLabel>
                    {packages?.data
                      ?.filter(
                        (pkg) =>
                          !status?.data?.some(
                            (u) => u.user === user?.user_id && u?.package_paid_for?.includes(pkg.id)
                          )
                      )
                      ?.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.name}>
                          {pkg.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Select onValueChange={handlePlanChange}>
              <SelectTrigger className="w-full mx-auto">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Plan</SelectLabel>
                  {(() => {
                    const selectedPackage = packages?.data.find(
                      (pkg) => pkg.name.toLowerCase() === packageDetails.selectedPackage.toLowerCase()
                    );
                    if (selectedPackage) {
                      return (
                        <>
                          <SelectItem value={`Weekly -- N${selectedPackage.weekly_price}`}>
                            Weekly -- N{selectedPackage.weekly_price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 })}
                          </SelectItem>

                          <SelectItem value={`Monthly -- N${selectedPackage.monthly_price}`}>
                            Monthly -- N{selectedPackage.monthly_price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 })}
                          </SelectItem>
                        </>
                      );
                    } else {
                      return <div>Please select a package.</div>;
                    }
                  })()}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="w-full my-4"
                  disabled={!packageDetails.selectedPackage || !packageDetails.selectedPlan}>
                  Pay
                </Button>
              </PopoverTrigger>
              <PopoverContent className="md:w-[500px] w-96">
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
                      <p>Package</p>
                      <p>{packageDetails.selectedPackage || "Select a package"}</p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <p>Payment Plan</p>
                      <p>{packageDetails.selectedPlan || "Select a plan"}</p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <p>Telegram Link</p>
                      <p className="text-blue-500 underline">
                        <Link target="_blank" to={data?.data?.telegram_link}>
                          {data?.data?.telegram_link}
                        </Link>
                      </p>
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