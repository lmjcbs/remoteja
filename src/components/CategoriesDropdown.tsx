import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  // TODO: Customer Support, Administration, 'marketing', 'product', 'design',
  const categories = ['developer', 'sales', 'analyst']

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
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className="relative z-10 block mx-4 font-semibold cursor-pointer text-gray-700 hover:underline"
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
        {categories.map((category) => (
          <Link href={`/categories/${category}`}>
            <a
              onClick={handleClick}
              className="block px-3 py-1 text-sm text-gray-800 hover:bg-indigo-500 hover:text-white capitalize"
            >
              {category}
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
