import { FC, useState } from 'react'
import Link from 'next/link'
import MenuToggle from '../ui/MenuToggle'
import MenuLinks from '../ui/MenuLinks'
import { Flex, Text } from '@chakra-ui/react'

const NavBar: FC = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w={['90%', '95%', '85%', '85%']}
      mx="auto"
      mb={4}
      py={8}
      color="gray.700"
      {...props}
    >
      <Link href="/">
        <Text
          as="a"
          fontWeight="medium"
          fontSize="2xl"
          color="#6366F1"
          cursor="pointer"
        >
          remote
          <Text
            as="span"
            bg="#6366F1"
            rounded="md"
            fontWeight="bold"
            p={1}
            color="white"
            ml="2px"
          >
            Ja
          </Text>
        </Text>
      </Link>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks toggle={toggle} isOpen={isOpen} />
    </Flex>
  )
}

export default NavBar
