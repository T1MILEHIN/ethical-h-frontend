import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { RecentSales } from './recent'
import { Overview } from './overview'

const Landing = () => {
    return (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                    <CardTitle>Clients Usage</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                    <Overview />
                </CardContent>
            </Card>
            <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                    <CardTitle>Recent Link Usage</CardTitle>
                    <CardDescription>
                        Up to 10 clients have viewed used your Link.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentSales />
                </CardContent>
            </Card>
        </div>
    )
}

export default Landing