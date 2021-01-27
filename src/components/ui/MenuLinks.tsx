import { FC } from 'react'
import Link from 'next/link'
import {
  Box,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import NavDropdown from '../ui/NavDropdown'
import { categories, locations } from '../../lib/constants'

type Props = {
  isOpen: boolean
  toggle: () => void
}

const MenuLinks: FC<Props> = ({ isOpen, toggle }) => {
  return (
    <>
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
        flexBasis={{ base: '100%', md: 'auto' }}
        pt={[4, 4, 0, 0]}
      >
        <Accordion
          allowToggle
          w="100%"
          justify="center"
          textTransform="capitalize"
        >
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" w="100%" mx="auto">
                Categories
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Flex direction="column">
                {categories.map((category) => {
                  return (
                    <Link href={`/categories/${category}`}>
                      <Text
                        as="a"
                        w="100%"
                        mx="auto"
                        align="left"
                        py={1}
                        cursor="pointer"
                        _hover={{ textDecoration: 'underline' }}
                        onClick={toggle}
                      >
                        {category}
                      </Text>
                    </Link>
                  )
                })}
              </Flex>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Locations
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Flex direction="column">
                {locations.map((location) => {
                  return (
                    <Link href={`/locations/${location.replace(' ', '-')}`}>
                      <Text
                        as="a"
                        w="100%"
                        mx="auto"
                        align="left"
                        py={1}
                        cursor="pointer"
                        _hover={{ textDecoration: 'underline' }}
                        onClick={toggle}
                      >
                        {location}
                      </Text>
                    </Link>
                  )
                })}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box
        display={{ base: 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
        pt={[4, 4, 0, 0]}
      >
        <Flex>
          <NavDropdown name="categories" options={categories} />
          <NavDropdown name="locations" options={locations} />
        </Flex>
      </Box>
    </>
  )
}

export default MenuLinks
