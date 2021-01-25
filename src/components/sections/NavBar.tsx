import { FC, useState } from 'react'
import Link from 'next/link'
import MenuToggle from '../ui/MenuToggle'
import MenuLinks from '../ui/MenuLinks'
import { Flex } from '@chakra-ui/react'

const NavBar: FC = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      color="gray.700"
      {...props}
    >
      <Link href="/">
        <a className="text-indigo-500 font-medium text-xl">
          remote
          <span className="bg-indigo-500 rounded-md font-bold p-1 ml-0.5 text-white">
            Ja
          </span>
        </a>
      </Link>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </Flex>
  )
}

export default NavBar
