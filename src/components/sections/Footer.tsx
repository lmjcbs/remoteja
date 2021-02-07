import { FC } from 'react'
import theme from '../../styles/theme'
import Link from 'next/link'
import Image from 'next/image'
import { categories, locations } from '../../lib/constants'
import { TwitterIcon } from '../../lib/svg'

const Footer: FC = () => {
  return (
    <footer className="footer-main">
      <div className="logo">
        <Link href="/">
          <Image
            src="/remoteja-primary.svg"
            alt="Remoteja logo"
            width="150"
            height="50"
          />
        </Link>
      </div>
      <div>
        <nav className="footer-nav">
          <div>
            <h3 className="nav-header">Categories</h3>
            <ul>
              {categories.map((category) => (
                <li className="nav-item">
                  <Link href={`/categories/${category}`}>
                    <a className="custom-underline">{category}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="nav-header">Locations</h3>
            <ul>
              {locations.map((location) => (
                <li className="nav-item">
                  <Link href={`/locations/${location.replace(' ', '-')}`}>
                    <a className="custom-underline">{location}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div id="external-links">
          <Link href="http://twitter.com/remoteja">
            <a>
              <TwitterIcon size={6} />
            </a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .logo {
          cursor: pointer;
        }
        #external-links {
          display: flex;
          width: 100%;
          padding: 1rem 0.5rem;
        }
        .footer-main {
          display: flex;
          background-color: ${theme.colors.tertiary};
          padding: 2rem 1rem;
          div {
            margin: 0 auto;
          }
        }
        .footer-nav {
          display: flex;
          div {
            display: flex;
            flex-direction: column;
            font-size: 1rem;
            margin: 0 0.5rem;
          }
        }
        .nav-item {
          list-style-type: none;
          text-transform: capitalize;
          &:hover .custom-underline:before {
            visibility: visible;
            width: 100%;
          }
        }
        .nav-header {
          font-size: 1.125rem;
          font-weight: 700;
        }
        .custom-underline {
          position: relative;
          &:before {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 0;
            background-color: ${theme.colors.primary};
            visibility: hidden;
            transition: all 0.3s ease-in-out;
          }
        }
      `}</style>
    </footer>
  )
}
export default Footer
