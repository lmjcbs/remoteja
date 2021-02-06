import React from 'react'
import theme from '../styles/theme'
import { categories, locations } from '../lib/constants'
import { FaChevronDown } from 'react-icons/fa'
import Link from 'next/link'

type MobileDropdownProps = {
  isOpen: boolean
}

const MobileDropdown = ({ isOpen }: MobileDropdownProps) => {
  const [categoriesActive, setCategoriesActive] = React.useState(false)
  const [locationsActive, setLocationsActive] = React.useState(false)

  const toggle = (type: string): void => {
    if (type === 'categories') {
      setLocationsActive(false)
      setCategoriesActive(!categoriesActive)
    } else {
      setCategoriesActive(false)
      setLocationsActive(!locationsActive)
    }
  }

  React.useEffect(() => {
    if (!isOpen) {
      setLocationsActive(false)
      setCategoriesActive(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="wrapper">
      <div onClick={() => toggle('categories')} className="menu-item">
        <div>
          <a>Categories</a>
          <i className={categoriesActive ? 'active' : 'notactive'}>
            <FaChevronDown size={12} />
          </i>
        </div>
      </div>
      {categoriesActive ? (
        <div className="submenu-item">
          {categories.map((category) => {
            return (
              <Link href={`/categories/${category}`}>
                <a>{category}</a>
              </Link>
            )
          })}
        </div>
      ) : null}

      <div onClick={() => toggle('locations')} className="menu-item">
        <div>
          <a>Locations</a>
          <i className={locationsActive ? 'active' : 'notactive'}>
            <FaChevronDown size={12} />
          </i>
        </div>
      </div>
      {locationsActive ? (
        <div className="submenu-item">
          {locations.map((location) => {
            return (
              <Link href={`/locations/${location.replace(' ', '-')}`}>
                <a>{location}</a>
              </Link>
            )
          })}
        </div>
      ) : null}
      <style jsx>
        {`
          .wrapper {
            width: 100%;
            background-color: ${theme.colors.primary};
            color: ${theme.colors.white};
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          .menu-item {
            position: relative;
            display: flex;
            padding: 0.5rem 0;
            width: 100%;
            align-items: center;
            border-top: lightskyblue;
            cursor: pointer;
            font-weight: bold;

            border-top: 0.25px solid rgba(197, 239, 255, 0.1);
            div {
              margin: 0 auto;
              display: flex;
              align-items: center;
              a {
                margin-right: 10px;
              }
            }
            &:hover {
              color: ${theme.colors.secondary};
            }
          }
          .submenu-item {
            display: flex;
            flex-direction: column;
            text-align: center;
            text-transform: capitalize;
            width: 100%;
            a {
              padding: 0.5rem 0;
              border-top: 0.25px solid rgba(197, 239, 255, 0.1);
              &:hover {
                color: ${theme.colors.secondary};
              }
            }
          }
          .active {
            -webkit-transition: 0.3s ease-out;
            -moz-transition: 0.3s ease-out;
            transition: 0.3s ease-out;
            -webkit-transform: rotateZ(180deg);
            -moz-transform: rotateZ(180deg);
            transform: rotateZ(180deg);
          }
          .notactive {
            -webkit-transition: 0.3s ease-out;
            -moz-transition: 0.3s ease-out;
            transition: 0.3s ease-out;
          }
        `}
      </style>
    </div>
  )
}

export default MobileDropdown
