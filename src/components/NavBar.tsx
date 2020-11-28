import Link from 'next/link'
import CategoriesDropdown from './CategoriesDropdown'

export default function NavBar() {
  return (
    <nav>
      <div className="mx-auto max-w-6xl flex flex-row items-center py-4 justify-between">
        <div className="ml-3 md:ml-8">
          <Link href="/">
            <a className="text-indigo-500 font-medium text-xl">
              remote
              <span className="bg-indigo-500 rounded-md font-bold p-1 ml-0.5 text-white">
                Ja
              </span>
            </a>
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <CategoriesDropdown />
          {/* <div className="mx-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md py-1 px-2 font-semibold shadow-lg">
            Post a Job
          </div> */}
        </div>
      </div>
    </nav>
  )
}
