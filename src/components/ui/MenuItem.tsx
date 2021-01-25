import { FC } from 'react'
import Link from 'next/link'

type MenuItemProps = {
  to: string
}

export const MenuItem: FC<MenuItemProps> = ({ children, to = '/' }) => {
  return (
    <Link href={to}>
      <a>{children}</a>
    </Link>
  )
}

export default MenuItem
