import { FC } from 'react'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'
import theme from '../../styles/theme'

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
        color="whitesmoke"
        bg={theme.colors.primary}
        rounded="md"
        px={2}
        py={0}
        boxShadow="lg"
        cursor="pointer"
        fontSize={17}
        fontWeight={['semibold', 'semibold', 'semibold', 'semibold']}
        _hover={{ color: theme.colors.secondary }}
      >
        {tag}
      </Text>
    </Link>
  )
}

export default TagLink
