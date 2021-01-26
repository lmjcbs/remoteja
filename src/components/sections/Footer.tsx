import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import FooterNav from '../ui/FooterNav'
import FooterBase from '../ui/FooterBase'

const Footer: FC = () => {
  return (
    <Flex
      as="footer"
      wrap="wrap"
      direction="column"
      w="100%"
      mt={8}
      color="gray.700"
    >
      <FooterNav />
      <FooterBase />
    </Flex>
  )
}
export default Footer
