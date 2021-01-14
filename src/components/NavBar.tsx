import { FC, useState } from 'react'
import Link from 'next/link'
import CategoriesDropdown from './CategoriesDropdown'

const NavBar: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuClick = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <header>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="">
          <Link href="/">
            <a className="text-indigo-500 font-medium text-xl">
              remote
              <span className="bg-indigo-500 rounded-md font-bold p-1 ml-0.5 text-white">
                Ja
              </span>
            </a>
          </Link>
        </div>
        <button
          type="button"
          className="text-gray-800 hover:text-indigo-600  focus:outline-none"
        >
          <svg
            onClick={handleMenuClick}
            className="h-8 w-8 fill-current block"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              // Open menu state
              <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
            ) : (
              // Closed menu state
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            )}
          </svg>
          {/* <CategoriesDropdown /> */}
        </button>
      </div>
      <div className={`px-4 pt-2 pb-4 ${isOpen ? 'block' : 'hidden'}`}>
        {/* <button className="block text-gray-900 font font-semibold">
          Categories
        </button> */}
      </div>
    </header>
  )
}

export default NavBar
