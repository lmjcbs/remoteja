import { FC, useState } from 'react'
import Link from 'next/link'
import { Box, Text } from '@chakra-ui/react'

type Props = {
  name: string
  options: string[]
}

const NavDropdown: FC<Props> = ({ name, options }) => {
  // const [isShown, setIsShown] = useState(false)
  const [leftHeader, setLeftHeader] = useState(true)
  const [leftDropdown, setLeftDropdown] = useState(true)

  return (
    <Box
      textTransform="capitalize"
      position="relative"
      mx={2}
      p={4}
      onMouseEnter={() => setLeftHeader(false)}
      onMouseLeave={() => setLeftHeader(true)}
    >
      <Text
        fontSize="lg"
        fontWeight="semibold"
        _hover={{ textDecoration: 'underline' }}
      >
        {name}
      </Text>

      {!leftHeader || !leftDropdown ? (
        <Box
          mt={1}
          ml={-2}
          position="absolute"
          rounded="lg"
          boxShadow="lg"
          borderWidth={1}
          cursor="pointer"
          onMouseEnter={() => setLeftDropdown(false)}
          onMouseLeave={() => setLeftDropdown(true)}
        >
          {options.map((option) => (
            <Link href={`/${name}/${option.replace(' ', '-')}`}>
              <Text
                as="a"
                display="block"
                px={3}
                py={1}
                fontWeight="medium"
                color="gray.700"
                _hover={{ bg: '#6366F1', color: 'white' }}
              >
                {option}
              </Text>
            </Link>
          ))}
        </Box>
      ) : null}
    </Box>
  )
}
export default NavDropdown
