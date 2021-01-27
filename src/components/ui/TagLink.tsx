import { FC } from 'react'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'

type Props = {
  id: string
  tag: string
  slug: string
}

const TagLink: FC<Props> = ({ id, tag, slug }) => {
  return (
    <Link key={id} href={`/tags/${slug}`}>
      <Text
        as="a"
        mr={1}
        color="gray.700 "
        bg="#C7D2FD"
        rounded="md"
        px={2}
        py={0}
        boxShadow="lg"
        cursor="pointer"
        fontWeight={['medium', 'medium', 'semibold', 'semibold']}
        _hover={{ bg: '#A5B4FB' }}
      >
        #{tag}
      </Text>
    </Link>
  )
}

export default TagLink
