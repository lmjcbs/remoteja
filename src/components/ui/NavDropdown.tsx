import React from 'react'
import Link from 'next/link'
import { FaChevronDown } from 'react-icons/fa'
import theme from '../../styles/theme'

type NavDropdownProps = {
  name: string
  options: string[]
}

const NavDropdown = ({ name, options }: NavDropdownProps) => {
  const [leftHeader, setLeftHeader] = React.useState(true)
  const [leftDropdown, setLeftDropdown] = React.useState(true)

  return (
    <ul
      onMouseEnter={() => setLeftHeader(false)}
      onMouseLeave={() => setLeftHeader(true)}
    >
      <li className="navlink-wrapper">
        <a>{name}</a>
        <i className={!leftHeader || !leftDropdown ? 'active' : 'notactive'}>
          <FaChevronDown size={12} />
        </i>
      </li>

      {!leftHeader || !leftDropdown ? (
        <div
          className="dropdown"
          onMouseEnter={() => setLeftDropdown(false)}
          onMouseLeave={() => setLeftDropdown(true)}
        >
          {options.map((option) => (
            <Link href={`/${name}/${option.replace(' ', '-')}`}>
              <a>{option}</a>
            </Link>
          ))}
        </div>
      ) : null}

      <style jsx>{`
        a {
          text-transform: capitalize;
        }
        .navlink-wrapper {
          position: relative;
          margin-left: 40px;
          display: flex;
          align-items: center;
          a {
            margin-right: 5px;
            font-weight: bold;
          }
        }
        .dropdown {
          position: absolute;
          margin-left: 30px;
          z-index: 100;
          max-width: 7.5rem;

          a {
            display: block;
            background-color: white;
            color: gray;
            padding: 0.2rem 1rem;
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
      `}</style>
    </ul>
  )
}

export default NavDropdown
