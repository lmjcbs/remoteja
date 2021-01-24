import { FC } from 'react'
import Link from 'next/link'
import { Flex, Heading } from '@chakra-ui/react'

type HeaderProps = {
  h1: string
  h2: string
}

const Header: FC<HeaderProps> = ({ h1, h2 }) => {
  return (
    <Flex
      as="header"
      wrap="wrap"
      direction="column"
      align="center"
      textAlign="center"
      mx="auto"
      px={2}
      maxW={'50em'}
      mb={16}
      color="gray.700"
    >
      <Heading as="h1" fontSize={['3xl', '3xl', '4xl', '4xl']} py={8}>
        <Link href="/">
          <a>{h1}</a>
        </Link>
      </Heading>
      <Heading as="h2" fontSize={['md', 'md', 'lg', 'lg']}>
        {h2}
      </Heading>
    </Flex>
  )
}

export default Header
