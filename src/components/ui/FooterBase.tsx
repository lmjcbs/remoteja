import { FC } from 'react'
import Link from 'next/link'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { TwitterIcon, RedditIcon } from '../../lib/svg'

const FooterBase: FC = () => {
  return (
    <div className="flex-grow w-full mx-auto justify-center max-w-5xl">
      <Flex px={4} pb={8} align="center" justify="space-between">
        <Heading as="h4" fontSize="md">
          Remoteja <Text as="span">2021</Text>
        </Heading>
        <Flex align="center" color="gray.700">
          <Link href="https://twitter.com/remoteja">
            <a target="_blank" rel="noopener">
              <TwitterIcon size={6} />
            </a>
          </Link>
          <Link href="https://reddit.com/r/remoteja">
            <a target="_blank" rel="noopener">
              <RedditIcon size={6} />
            </a>
          </Link>
        </Flex>
      </Flex>
    </div>
  )
}

export default FooterBase
