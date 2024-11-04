import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { Button } from '../components/ui/button'
import { IconMenu } from '@tabler/icons-react'
import PropTypes from 'prop-types';


export function TopNav({ className, links, ...props }) {
  return (
    <>
      <div className='md:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='outline'>
              <IconMenu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start'>
            {links.map(({ title, href }) => (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <NavLink
                  to={href}
                  className={({isActive})=> !isActive ? 'text-muted-foreground' : ''}
                >
                  {title}
                </NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          'hidden items-center space-x-4 md:flex lg:space-x-6',
          className
        )}
        {...props}>
        {links.map(({ title, href}) => (
          <NavLink
            key={`${title}-${href}`}
            to={href}
            className={({isActive})=> isActive ? 'text-sm font-medium transition-colors hover:text-primary' : 'text-sm font-medium transition-colors hover:text-primary text-muted-foreground'}
            >
            {title}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

TopNav.propTypes = {
  className: PropTypes.any,
  links: PropTypes.any,
}