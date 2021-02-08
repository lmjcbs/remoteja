import Link from 'next/link'
import theme from '../../styles/theme'
import { device } from '../../lib/mediaQueries'

type HeaderProps = {
  h1?: string
  h2?: string
}

const Header = ({ h1, h2 }: HeaderProps) => {
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
            font-weight: bold;
            font-size: 1.75rem;

            @media ${device.sm} {
              font-size: 2.5rem;
            }

            @media ${device.md} {
              font-size: 3rem;
            }
          }
          .sub-heading {
            padding: 0 1.5rem;
            font-size: 1rem;
            font-weight: bold;
            max-width: 40rem;
            margin: 0 auto;

            @media ${device.sm} {
              font-size: 1.25rem;
              max-width: 45rem;
            }

            @media ${device.md} {
              font-size: 1.5rem;
              max-width: 50rem;
            }
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
    </section>
  )
}

export default Header
