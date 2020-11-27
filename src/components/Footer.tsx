import Link from 'next/link'
import { TwitterIcon } from '../lib/svg'

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto max-w-6xl flex flex-row items-center mt-16 p-6 justify-between">
        <p className="px-6 text-sm font-semibold text-gray-800">
          2020 Remoteja
        </p>
        <p className="px-6 text-sm">
          <Link href="https://twitter.com/remoteja">
            <a target="_blank" rel="noopener">
              <TwitterIcon />
            </a>
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
