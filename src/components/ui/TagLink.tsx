import { FC } from 'react'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'

type Props = {
  id: string
  tag: string
}

const TagLink: FC<Props> = ({ id, tag }) => {
  return (
    <Link key={id} href={`/tags/${tag}`}>
      <Text
        as="a"
        mr={1}
        color="gray.700 "
        bg="#C7D2FD"
        rounded="md"
        px={2}
        py={[0, 0, 1, 1]}
        boxShadow="lg"
        cursor="pointer"
        fontWeight="semibold"
        textTransform="capitalize"
        _hover={{ bg: '#A5B4FB' }}
      >
        {tag}
      </Text>
    </Link>
  )
}

export default TagLink
