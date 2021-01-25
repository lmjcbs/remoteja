import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

type MenuToggleProps = {
  isOpen: boolean
  toggle: () => void
}

const MenuToggle: FC<MenuToggleProps> = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  )
}

export default MenuToggle
