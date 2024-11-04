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
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                    <CardTitle>Paid Packages</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                    <Packages />
                </CardContent>
            </Card>
            <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
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