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


export function Recents() {
  return (
    <div className='space-y-8'>
      <Table>
        <TableCaption>People that have used your Link.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Password</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <Avatar className='h-9 w-9'>
                <AvatarImage src='/avatars/01.png' alt='Avatar' />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>Olivia Martin</TableCell>
            <TableCell>olivia.martin@email.com</TableCell>
            <TableCell className="text-right">***************</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Avatar className='h-9 w-9'>
                <AvatarImage src='/avatars/01.png' alt='Avatar' />
                <AvatarFallback>TB</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>Timilehin Babade</TableCell>
            <TableCell>tunmisebabade@gmail.com</TableCell>
            <TableCell className="text-right">***************</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}