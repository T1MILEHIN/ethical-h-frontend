import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { Recents } from './recent'
import { Packages } from './packages'

const Landing = () => {
    return (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-12'>
            <Card className='col-span-1 lg:col-span-7'>
                <CardHeader className='p-3 pt-4'>
                    <CardTitle>Paid Packages</CardTitle>
                </CardHeader>
                <CardContent className='p-2'>
                    <Packages />
                </CardContent>
            </Card>
            <Card className='col-span-1 lg:col-span-5'>
                <CardHeader className='p-3'>
                    <CardTitle>Recent Link Usage</CardTitle>
                </CardHeader>
                <CardContent>
                    <Recents />
                </CardContent>
            </Card>
        </div>
    )
}

export default Landing