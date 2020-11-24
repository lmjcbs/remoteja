import Link from 'next/link'

export default function NavBar() {
  return (
    <nav>
      <div className="w-screen flex flex-row items-center p-4 justify-between bg-gray-100">
        <div className="ml-8">
          <Link href="/">
            <a className="text-indigo-600 text-xl">
              remote
              <span className="bg-indigo-600 rounded-md p-1 text-white font-semibold">
                Ja
              </span>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
