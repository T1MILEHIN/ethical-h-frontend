import { Link } from 'react-router-dom';
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

const AllPackages = () => {
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
                <CardTitle>
                  {pkg.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{pkg.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link to={`/${pkg.name.toLowerCase()}/${user?.user_id}`}>
                  <Button>preview</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </div>
  )
}

export default AllPackages