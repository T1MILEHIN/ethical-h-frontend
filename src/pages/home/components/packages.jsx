import { useContext } from 'react';
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '../../../components/ui/card'
import { Button } from '../../../components/ui/button';
import { AuthContext } from '../../../context/authContext';
import AllPackages from '../allPackages';
import fetchPaymentStatus from '../../../hooks/fetchPaymentStatus';
import Loader from '../../../components/loader';

export function Packages() {
  const { data, isLoading } = fetchPaymentStatus()
  const { user } = useContext(AuthContext);
  if (isLoading) return <Loader />
  return (
    <>
      {data?.data.find((u) => u.user === user?.user_id) ? (
        <div>
          <AllPackages />
        </div>
      ) : (
        <div>
          <Card className='mb-2'>
            <CardHeader>
              <CardDescription>
                All your paid packages will be displayed here
              </CardDescription>
            </CardHeader>
            <CardContent>
              You have not Paid for any Package
            </CardContent>
          </Card>
          <Link to='/packages'>
            <Button>View All Packages Available</Button>
          </Link>
        </div>
      )}
    </>
  )
}