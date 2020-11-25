import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleEscape = ({ key }) => {
    if (key === 'Esc' || key === 'Escape') {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscape)

    return function cleanup() {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className="relative z-10 block mx-4 border-none outline-none font-semibold text-gray-700 hover:underline"
      >
        Categories
      </div>

      {isOpen ? (
        <button
          onClick={handleClick}
          tabIndex={-1}
          className={`fixed inset-0 h-full w-full outline-none cursor-default`}
        ></button>
      ) : null}

      <div
        className={`${
          isOpen ? 'absolute' : 'hidden'
        } mt-1 bg-white border shadow-xl rounded-lg py-1`}
      >
        <Link href="/categories/developer">
          <a className="block px-3 py-1 text-sm text-gray-800 hover:bg-indigo-600 hover:text-white">
            Developer
          </a>
        </Link>
        <Link href="/categories/marketing">
          <a className="block px-3 py-1 text-sm text-gray-800 hover:bg-indigo-600 hover:text-white">
            Marketing
          </a>
        </Link>
        <Link href="/categories/developer">
          <a className="block px-3 py-1 text-sm text-gray-800 hover:bg-indigo-600 hover:text-white">
            Customer Support
          </a>
        </Link>
        <Link href="/categories/developer">
          <a className="block px-3 py-1 text-sm text-gray-800 hover:bg-indigo-600 hover:text-white">
            Sales
          </a>
        </Link>
        <Link href="/categories/developer">
          <a className="block px-3 py-1 text-sm text-gray-800 hover:bg-indigo-600 hover:text-white">
            Design
          </a>
        </Link>
        <Link href="/categories/developer">
          <a className="block px-3 py-1 text-sm text-gray-800 hover:bg-indigo-600 hover:text-white">
            Product
          </a>
        </Link>
      </div>
    </div>
  )
}
