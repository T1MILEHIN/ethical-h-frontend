import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { Layout } from '../../components/custom/layout'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Search } from '../../components/search';
import { Tabs, TabsContent } from '../../components/ui/tabs';
import ThemeSwitch from '../../components/theme-switch';
import { TopNav } from '../../components/dashboardNav';
import { UserNav } from '../../components/userNav';

import fetchData from "../../hooks/fetchMaga"
import fetchAllPackages from '../../hooks/fetchAllPackages';
import PaymentPlanDetails from '../../components/paymentPlanDetails'

const Home = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation()
  const { data } = fetchData()
  const { data:packages } = fetchAllPackages()

  if (!user) return <Navigate to="/login" />

  return (
    <Layout>
      <div className='z-[999999999999] fixed right-2 bottom-2'>
        <PaymentPlanDetails userId={user?.user_id}/>
      </div>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {pathname === "/" && "Dashboard"}
            {pathname === "/packages" && "Packages"}
            {pathname === "/payments" && "Payments"}
            {pathname === "/settings" && "Settings"}
          </h1>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    WALLET
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>N{user?.wallet?.toLocaleString() || "0"}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Users No
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{data?.data.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    Number of people that have used your link
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Packages
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{packages?.data.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    Packages Available
                  </p>
                </CardContent>
              </Card>
              
            </div>
            <Outlet />
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: '/',
  },
  {
    title: 'packages',
    href: '/packages',
  },
  {
    title: 'Payments',
    href: '/payments',
  },
  // {
  //   title: 'Settings',
  //   href: '/settings',
  // },
]

export default Home;