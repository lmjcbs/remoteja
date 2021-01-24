import { FC } from 'react'
import Link from 'next/link'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { TwitterIcon } from '../../lib/svg'

const FooterBase: FC = () => {
  return (
    <div className="flex-grow w-full mx-auto justify-center max-w-5xl">
      <Flex px={8} pb={8} align="center" justify="space-between">
        <Heading as="h4" fontSize="md">
          Remoteja <Text as="span">2021</Text>
        </Heading>
        <Link href="https://twitter.com/remoteja">
          <a target="_blank" rel="noopener">
            <TwitterIcon size={20} />
          </a>
        </Link>
      </Flex>
    </div>
  )
}

export default FooterBase
