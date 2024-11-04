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
    </>
  )
}