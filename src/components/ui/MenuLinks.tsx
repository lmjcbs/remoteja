import { FC } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import MenuItem from './MenuItem'

type MenuLinksProps = {
  isOpen: boolean
}

const MenuLinks: FC<MenuLinksProps> = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/categories/developer">Devloper Jobs</MenuItem>
      </Stack>
    </Box>
  )
}

export default MenuLinks
