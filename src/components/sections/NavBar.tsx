import React from 'react'
import theme from '../../styles/theme'
import Link from 'next/link'
import Image from 'next/image'
import { useMedia } from 'react-media'
import NavDropdown from '../ui/NavDropdown'
import { FaBars, FaTimes } from 'react-icons/fa'
import MobileDropdown from '../MobileDropdown'
import { categories, locations } from '../../lib/constants'

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const isMobile = useMedia({ query: '(max-width: 767px)' })

  const toggle = (): void => setIsOpen(!isOpen)

  return (
    <header>
      <div className="main-navigation">
        <div className="main-navigation__logo">
          <Link href="/">
            <Image src="/remoteja-white.svg" alt="me" width="150" height="50" />
          </Link>
        </div>
        {isMobile ? (
          <div className="main-navigation__items" onClick={toggle}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        ) : (
          <nav className="main-navigation__items">
            <NavDropdown name="categories" options={categories} />
            <NavDropdown name="locations" options={locations} />
          </nav>
        )}
      </div>
      {isMobile && <MobileDropdown isOpen={isOpen} />}
      <style jsx>{`
        .main-navigation {
          left: 0;
          top: 0;
          width: 100%;
          height: 6rem;
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .main-navigation__logo {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .main-navigation__items {
          margin: 0 0 0 1.5rem;
          padding: 0;
          margin-right: 40px;
          list-style: none;
          display: flex;
          cursor: default;
        }

        .main-navigation__item {
          position: relative;
          margin-left: 40px;
          display: flex;
          align-items: center;

          i {
            -webkit-transition: 0.3s ease-out;
            -moz-transition: 0.3s ease-out;
            transition: 0.3s ease-out;
          }
          a {
            margin-right: 5px;
          }
          &:hover {
            i {
              -webkit-transition: 0.3s ease-out;
              -moz-transition: 0.3s ease-out;
              transition: 0.3s ease-out;
              -webkit-transform: rotateZ(180deg);
              -moz-transform: rotateZ(180deg);
              transform: rotateZ(180deg);
            }
          }
        }
      `}</style>
    </header>
  )
}

export default NavBar
