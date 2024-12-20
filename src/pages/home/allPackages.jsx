import { Link, useLocation } from 'react-router-dom';
import React, { useContext } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '../../components/ui/card';
import { TabsContent } from "../../components/ui/tabs";
import { Button } from '../../components/ui/button';
import fetchAllPackages from '../../hooks/fetchAllPackages';
import fetchPaymentStatus from '../../hooks/fetchPaymentStatus';
import Loader from '../../components/loader';
import { AuthContext } from '../../context/authContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const AllPackages = ({flex}) => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = fetchAllPackages()
  const { data: status } = fetchPaymentStatus()

  console.log(data)
  console.log(status)
  
  if (isLoading) return <Loader />
  
  return (
    <div>
      <TabsContent value='overview' className='space-y-4'>
        <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2`}>
          {data?.data.map((pkg) => (
            <Card key={pkg.id} className="border-none">
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 p-2'>
                <div className='space-y-2'>
                  <LazyLoadImage width={'100%'} effect="blur" src={pkg.image} className='w-full rounded-sm z-10' alt="" />
                  <CardTitle className='py-1'>
                    {pkg.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className='font-bold flex items-center gap-2'>
                  <p>Weekly:</p>
                  <CardDescription>{(+pkg.weekly_price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0})}</CardDescription>
                </div>
                <div className='font-bold flex items-center gap-2'>
                  <p>Monthly:</p>
                  <CardDescription>{(+pkg.monthly_price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0})}</CardDescription>
                </div>
              </CardContent>
              {status?.data?.find((u) => u.user === user?.user_id && u?.package_paid_for.includes(pkg.id)) ? (
                <CardFooter className="flex gap-2 p-2">
                  <Link to={`/${pkg?.name?.toLowerCase()}/${user?.user_id}`}>
                    <Button>preview</Button>
                  </Link>
                  <CopyToClipboard onCopy={() => toast.success(`${pkg.name} Link Copied`)} text={`${window.location.origin}/${pkg?.name?.toLowerCase()}/${user?.user_id}`}>
                    <Button>Copy Link</Button>
                  </CopyToClipboard>
                </CardFooter>
              ) :
                (
                  <CardFooter className="flex p-2">
                    <Link className='w-full' to="/payments">
                    <Button className="w-full">Pay</Button>
                    </Link>
                  </CardFooter>
                )}
            </Card>
          ))}
        </div>
      </TabsContent>
    </div>
  )
}

export default AllPackages