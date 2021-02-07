import Link from 'next/link'
import theme from '../../styles/theme'
import { useMedia } from 'react-media'
import { IS_MOBILE_QUERY } from '../../lib/constants'

type HeaderProps = {
  h1: string
  h2: string
}

const Header = ({ h1, h2 }: HeaderProps) => {
  const isMobile = useMedia({ query: IS_MOBILE_QUERY })

  return (
    <section>
      <div className="wrapper">
        <Link href="/">
          <a>
            <h1 className="heading">{h1}</h1>
          </a>
        </Link>
        <h2 className="sub-heading">{h2}</h2>
      </div>
      <div className="svg-wrapper">
        <svg viewBox="0 0 100 25" preserveAspectRatio="none">
          <path
            fill={theme.colors.primary}
            d="M0 30 V12 Q30 17 55 12 T100 11 V30z"
          />
        </svg>
      </div>
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background-color: ${theme.colors.primary};
          color: white;
        }
        .wrapper {
          width: 100%;
          max-width: 800px;

          margin: 0 auto;
          .heading {
            margin-bottom: 1rem;
            font-size: 3rem;
            font-weight: bold;
          }
          .sub-heading {
            padding: 0 1.5rem;
            font-size: 1.35rem;
            font-weight: 600;
          }
        }
        .svg-wrapper {
          display: block;
          position: relative;
          transform: rotate(180deg);
          width: 100%;
          height: 80px;
          background: white;
          svg {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
          }
        }
      `}</style>
      <style jsx>
        {`
          .wrapper {
            padding: ${isMobile ? '1rem' : '1.5rem'};
            .heading {
              font-size: ${isMobile ? '2.25rem' : '3rem'};
            }
            .sub-heading {
              font-size: ${isMobile ? '1rem' : '1.35rem'};
            }
          }
        `}
      </style>
    </section>
  )
}

export default Header
