import { FC } from 'react'
import { Box, Icon } from '@chakra-ui/react'

type MenuToggleProps = {
  isOpen: boolean
  toggle: () => void
}

const MenuToggle: FC<MenuToggleProps> = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      <Icon color="gray.700" h={7} w={7} viewBox="0 0 24 24">
        {isOpen ? (
          <path
            fill="currentColor"
            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
          />
        )}
      </Icon>
    </Box>
  )
}

export default MenuToggle
