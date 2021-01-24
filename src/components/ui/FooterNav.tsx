import { FC } from 'react'
import { Box, Flex, IconButton, Heading, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { FaArrowCircleUp } from 'react-icons/fa'

const categories: string[] = ['developer', 'sales']

const locations: string[] = ['worldwide', 'north america', 'europe', 'asia']

const FooterNav: FC = () => {
  return (
    <div className="flex-grow w-full mx-auto justify-center max-w-5xl">
      <Flex as="nav" justify="space-between" p={8}>
        <VStack spacing={1} align="stretch" fontWeight="">
          <Heading as="h4" fontSize="lg">
            Categories
          </Heading>
          {categories.map((category) => (
            <Link href={`/categories/${category.replace(' ', '-')}`}>
              <Text as="a" _hover={{ textDecoration: 'underline' }}>
                {category}
              </Text>
            </Link>
          ))}
        </VStack>
        <VStack spacing={1} align="stretch">
          <Heading as="h4" fontSize="lg">
            Locations
          </Heading>
          {locations.map((location) => (
            <Link href={`/locations/${location.replace(' ', '-')}`}>
              <Text as="a" _hover={{ textDecoration: 'underline' }}>
                {location}
              </Text>
            </Link>
          ))}
        </VStack>
        <Box>
          <Flex
            align="center"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Text mr={1}>Back to top</Text>
            <IconButton
              aria-label="scroll up"
              icon={<FaArrowCircleUp />}
              alignContent="center"
              fontSize="xl"
              bg="white"
            />
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}

export default FooterNav
