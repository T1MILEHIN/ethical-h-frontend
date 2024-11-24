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
import Loader from '../../components/loader';
import { AuthContext } from '../../context/authContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';

const AllPackages = () => {
  const location = useLocation()
  const { user } = useContext(AuthContext);
  const { data, isLoading } = fetchAllPackages()
  if (isLoading) return <Loader />
  return (
    <div>
      <TabsContent value='overview' className='space-y-4'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {data?.data.map((pkg) => (
            <Card key={pkg.id}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <div className='space-y-2'>
                  <img src={pkg.image} className='w-full rounded-md' alt="" />
                  <CardTitle>
                    {pkg.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{pkg.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link to={`/${pkg?.name?.toLowerCase()}/${user?.user_id}`}>
                  <Button>preview</Button>
                </Link>
                <CopyToClipboard onCopy={() => toast.success(`${pkg.name} Link Copied`)} text={`${window.location.origin}/${pkg?.name?.toLowerCase()}/${user?.user_id}`}>
                  <Button>Copy Link</Button>
                </CopyToClipboard>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </div>
  )
}

export default AllPackages