import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'

export function Packages() {
  return (
    <>
      <Card className='mb-2'>
        <CardHeader>
          <CardDescription><h2>All your paid packages will be displayed here</h2></CardDescription>
        </CardHeader>
        <CardContent>
          <p>You have not Paid for any Package</p>
        </CardContent>
      </Card>
      <Link to='/packages'>
        <Button>View All Packages Available</Button>
      </Link>
    </>
  )
}